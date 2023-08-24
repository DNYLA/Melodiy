import axios from 'axios';
import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'username' },
        password: { label: 'Password', type: 'text' },
      },
      async authorize(credentials) {
        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}auth/login`,
            { username: credentials?.username, password: credentials?.password }
          );
          const user = data.data;
          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            return user;
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null;

            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    // async session({ session, token, user }) {
    async session({ session, token }) {
      /* eslint-disable @typescript-eslint/no-explicit-any */
      session.user = token as any;
      return session;
    },
  },
  // pages: {
  //   // signIn: '/login',
  //   // error: '/login',
  // },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
