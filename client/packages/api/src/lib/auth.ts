import { AuthInfo, AuthResult, User, UserKey } from '@melodiy/types';
import { AXIOS, setAccessToken } from '../axios';
import srp from 'secure-remote-password/client';
//@ts-ignore
import { pbkdf2 } from 'browser-crypto';
import * as openpgp from 'openpgp';

const PASSWORD_HASH_SETTINGS = {
  iterations: 500000,
  hashAlgorithm: 'sha512',
  keyLength: 32,
};

export async function registerUser(
  username: string,
  password: string,
  setup: boolean
): Promise<User> {
  const salt = srp.generateSalt();

  const derivedKeyPassword = await pbkdf2Async(password, salt);
  //I think i can hash this all together inside derviedKeyPassword if i pass in password:username as one formatted string but im not too sure so will re-hash using built in derivePrivateKey as well
  const srpPrivateKey = srp.derivePrivateKey(
    salt,
    username.toLowerCase(),
    derivedKeyPassword
  );
  const verifier = srp.deriveVerifier(srpPrivateKey);
  const user = await callRegistration(username, salt, verifier, setup);

  const { privateKey, publicKey } = await openpgp.generateKey({
    type: 'rsa', // Type of the key
    rsaBits: 4096, // RSA key size (defaults to 4096 bits)
    userIDs: [{ name: user.username }], // you can pass multiple user IDs
    passphrase: derivedKeyPassword, // protects the private key
  });

  // I don't think this is needed at all but not sure if using the same derived key for everything is smart (doesn't take much to re-gen a key so might as well?)
  const aesPassword = await pbkdf2Async(derivedKeyPassword, salt);

  const encryptedPrivateKeyDetails = await encryptPrivateKey(
    privateKey,
    aesPassword
  );

  if (encryptedPrivateKeyDetails.encryptedKey == null)
    throw new Error(
      'Unable to create encryption key, please contact an administrator'
    );

  const createdKey = await callCreateKey(
    publicKey,
    encryptedPrivateKeyDetails.encryptedKey,
    encryptedPrivateKeyDetails.iv
  );

  if (!createdKey)
    throw new Error(
      'Unable to create encryption key, please contact an administrator'
    );

  return user;
}

async function callRegistration(
  username: string,
  salt: string,
  verifier: string,
  setup: boolean
): Promise<User> {
  const endpoint = setup ? '/setup/register' : '/auth/register';
  const { data } = await AXIOS.post<AuthResult>(endpoint, {
    username,
    salt,
    verifier,
  });

  setAccessToken(data.accessToken);
  return data.user;
}

async function callCreateKey(
  publicKey: string,
  privateKey: string,
  iv: string
): Promise<boolean> {
  const { status } = await AXIOS.post('/auth/key/', {
    publicKey,
    privateKey,
    salt: iv,
  });

  return status === 200;
}

export async function login(
  username: string,
  password: string
): Promise<{ user: User; keys: UserKey[] }> {
  const { data: authInfo } = await AXIOS.post<AuthInfo>('/auth/info', {
    username,
  });

  const clientEphemeral = srp.generateEphemeral();
  const derivedKeyPassword = await pbkdf2Async(password, authInfo.salt);
  const privateKey = srp.derivePrivateKey(
    authInfo.salt,
    username.toLowerCase(),
    derivedKeyPassword
  );
  const clientSession = srp.deriveSession(
    clientEphemeral.secret,
    authInfo.serverEphemeral,
    authInfo.salt,
    username.toLowerCase(),
    privateKey
  );

  const { data: authResponse } = await AXIOS.post<AuthResult>('/auth/', {
    username,
    clientEphemeral: clientEphemeral.public,
    clientProof: clientSession.proof,
    srpSession: authInfo.srpSession,
  });

  setAccessToken(authResponse.accessToken);
  const keys = await getKeys(derivedKeyPassword, authInfo.salt);

  return { user: authResponse.user, keys };
}

export async function getKeys(
  derivedKey: string,
  salt: string
): Promise<UserKey[]> {
  const { data: keys } = await AXIOS.get<UserKey[]>('/auth/keys');
  if (keys == null || keys.length == 0) return [];

  const aesPassword = await pbkdf2Async(derivedKey, salt);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const privateKeyEncrypted = await decryptPrivateKey(
      key.privateKey,
      key.salt,
      aesPassword
    );
    const privateKey = await openpgp.decryptKey({
      privateKey: await openpgp.readPrivateKey({
        armoredKey: privateKeyEncrypted,
      }),
      passphrase: derivedKey,
    });
    key.privateKey = '';
    key.salt = '';
    key.privateKeyDecoded = privateKey;
    keys[i] = key;
  }

  return keys;
}

async function encryptPrivateKey(privateKey: string, derivedKey: string) {
  try {
    const textEncoder = new TextEncoder();

    const iv = crypto.getRandomValues(new Uint8Array(16)); // AES-GCM IV
    const key = await crypto.subtle.importKey(
      'raw',
      decodeBase64ToArrayBuffer(derivedKey),
      { name: 'AES-GCM' },
      false, // Not extractable
      ['encrypt', 'decrypt'] // Usages
    );

    const encryptedPrivateKey = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      textEncoder.encode(privateKey)
    );

    const encryptedKeyBase64 = encodeArrayBufferToBase64(encryptedPrivateKey);
    const initialisationVectorBase64 = encodeArrayBufferToBase64(iv);

    return { encryptedKey: encryptedKeyBase64, iv: initialisationVectorBase64 };
  } catch (err) {
    console.log('err: ', err);
    return { privateKey: '', derivedKey: '' };
  }
}

async function decryptPrivateKey(
  privateKey: string,
  iv: string,
  derivedKey: string
) {
  try {
    const textDecoder = new TextDecoder();

    const key = await crypto.subtle.importKey(
      'raw',
      decodeBase64ToArrayBuffer(derivedKey),
      { name: 'AES-GCM' },
      false, // Not extractable
      ['encrypt', 'decrypt'] // Usages
    );

    const decryptedPrivateKey = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: decodeBase64ToArrayBuffer(iv) },
      key,
      decodeBase64ToArrayBuffer(privateKey)
    );

    return textDecoder.decode(decryptedPrivateKey);
  } catch (err) {
    console.log('err: ', err);
    return '';
  }
}

function pbkdf2Async(password: string, salt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    pbkdf2(
      password,
      salt,
      PASSWORD_HASH_SETTINGS.iterations,
      PASSWORD_HASH_SETTINGS.keyLength,
      PASSWORD_HASH_SETTINGS.hashAlgorithm,
      (error: unknown, derivedKey: ArrayBuffer) => {
        if (error) {
          reject(error);
        } else {
          resolve(encodeArrayBufferToBase64(derivedKey));
        }
      }
    );
  });
}

function encodeArrayBufferToBase64(input: ArrayBuffer) {
  return btoa(
    Array.from(new Uint8Array(input))
      .map((b) => String.fromCharCode(b))
      .join('')
  );
}

function decodeBase64ToArrayBuffer(input: string) {
  return Uint8Array.from(atob(input), (c) => c.charCodeAt(0));
}
