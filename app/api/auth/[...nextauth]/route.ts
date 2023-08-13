import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'username' },
        password: { label: 'Password', type: 'text' },
      },
      async authorize(credentials, req) {
        //TODO: Move api url call to .env
        const res = await fetch('http://localhost:5062/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });

        const data = await res.json();
        const user = data.data;

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log(user);
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      console.log(session.user);
      return session;
    },
  },
  // pages: {
  //   // signIn: '/login',
  //   // error: '/login',
  // },
});

export { handler as GET, handler as POST };
