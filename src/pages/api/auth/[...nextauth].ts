import chalk from 'chalk';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        code: { label: 'Code', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        try {
          // return `{accessToken, user}`
          return {};
        } catch (err) {
          console.error(chalk.redBright('Error with login request'));
          console.error(chalk.redBright(err));
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user: authorizeResponse, account, profile }) {
      if (account?.type === 'credentials') {
        authorizeResponse?.user && (token.user = authorizeResponse.user);
        authorizeResponse?.accessToken &&
          (token.accessToken = authorizeResponse.accessToken);
      }

      // // enable for oauth
      //   if (account?.type === 'oauth') {
      //     switch (account.provider) {
      //       case 'linkedin':
      //         break;

      //       default:
      //         break;
      //     }
      //   }

      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      session.accessToken = token.accessToken as any;
      return session;
    },
  },
});
