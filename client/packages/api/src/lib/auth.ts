import { AuthInfo, AuthResult, User } from '@melodiy/types';
import { AXIOS, setAccessToken } from '../axios';
import srp from 'secure-remote-password/client';
//@ts-ignore
import { pbkdf2 } from 'browser-crypto';

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
  const privateKey = srp.derivePrivateKey(salt, username, derivedKeyPassword);
  const verifier = srp.deriveVerifier(privateKey);

  //TODO: Generate new key + key salt

  //Encrypt key using PKDB derived from key salt + password

  const user = await callRegistration(username, salt, verifier, setup);
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

export async function login(username: string, password: string): Promise<User> {
  const { data: authInfo } = await AXIOS.post<AuthInfo>('/auth/info', {
    username,
  });

  const clientEphemeral = srp.generateEphemeral();
  const derivedKeyPassword = await pbkdf2Async(password, authInfo.salt);
  const privateKey = srp.derivePrivateKey(
    authInfo.salt,
    username,
    derivedKeyPassword
  );
  const clientSession = srp.deriveSession(
    clientEphemeral.secret,
    authInfo.serverEphemeral,
    authInfo.salt,
    username,
    privateKey
  );

  const { data: authResponse } = await AXIOS.post<AuthResult>('/auth/', {
    username,
    clientEphemeral: clientEphemeral.public,
    clientProof: clientSession.proof,
    srpSession: authInfo.srpSession,
  });

  setAccessToken(authResponse.accessToken);
  return authResponse.user;
}

// function generateSalt(length = 24) {
//   const array = new Uint8Array(length);
//   window.crypto.getRandomValues(array);
//   return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join(
//     ''
//   );
// }

// function generateSalt(length = 16) {
//   const array = new Uint8Array(length); // 24 random bytes
//   window.crypto.getRandomValues(array);

//   //Returns salt in HEX
//   // return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join(
//   //   ''
//   // );

//   return btoa(String.fromCharCode(...array));
// }

// async function generateSalt(rounds = 15) {
//   const salt = await bcrypt.genSalt(rounds);
//   return salt;
// }

// async function hashPassword(password: string) {
//   const salt = await generateSalt();
//   const result = await bcrypt.hash(password, salt);

//   // Encode results as Base64 for storage/transmission
//   //const saltBase64 = btoa(String.fromCharCode(...salt));
//   // const hashBase64 = btoa(result.hash);

//   return {
//     salt: salt,
//     derivedKey: result,
//   };
// }

function pbkdf2Async(password: string, salt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    pbkdf2(
      password,
      salt,
      PASSWORD_HASH_SETTINGS.iterations,
      PASSWORD_HASH_SETTINGS.keyLength,
      PASSWORD_HASH_SETTINGS.hashAlgorithm,
      (error: unknown, derivedKey: string) => {
        if (error) {
          reject(error);
        } else {
          resolve(derivedKey);
        }
      }
    );
  });
}
