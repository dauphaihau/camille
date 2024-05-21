import { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { createTransport } from 'nodemailer';

import { db } from 'lib/db';

const configEmail = {
  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
  secure: true,
  port: 465,
  normalizeHeaderKey: (key: string) => key.toUpperCase(),
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db as never),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    EmailProvider({
      from: process.env.SMTP_FROM,
      sendVerificationRequest: async ({
        identifier: email,
        url,
        provider: { from },
        // provider: { server, from },
        theme,
      }) => {
        const user = await db.user.findUnique({
          where: { email },
          select: { emailVerified: true },
        });

        // const { identifier, url, provider, theme } = params
        const { host } = new URL(url);

        // NOTE: You are not required to use `nodemailer`, use whatever you want.
        const transport = createTransport(configEmail);
        const result = await transport.sendMail({
          to: email,
          from,
          subject: `Sign in to ${host}`,
          text: text({ url, host }),
          html:
                user?.emailVerified ?
                  htmlSignIn({ url, host, theme }) :
                  htmlActivation({ url, host, theme })
          ,
        });
        const failed = result.rejected.concat(result.pending).filter(Boolean);
        if (failed.length) {
          throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`);
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.image;
        // session.user.avatar = token.avatar
        session.user.workspaceLastVisited = token.workspaceLastVisited;
      }
      return session;
    },
    async jwt({ token, user }) {

      const dbUser = await db.user.findFirst({
        where: { email: token.email },
      });

      if (!dbUser && user) {
        token.id = user.id;
        return token;
      }

      if (dbUser) {
        let workspaceLastVisited;
        // if (dbUser?.lastAccessWorkspaceId) {
        //   workspaceLastVisited = await db.workspace.findFirst({
        //     where: { id: dbUser.lastAccessWorkspaceId as string },
        //     select: {
        //       id: true,
        //       name: true,
        //       domain: true,
        //     },
        //   });
        // }

        return {
          id: dbUser.id,
          email: dbUser.email,
          name: dbUser?.name ?? '',
          workspaceLastVisited,
          image: dbUser.image as string,
          // image: dbUser.avatar,
          // avatar: dbUser.avatar,
        };
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};

function htmlSignIn(params: { url: string; host: string; theme }) {
  const { url, theme } = params;
  // const escapedHost = host.replace(/\./g, '&#8203;.');

  const brandColor = theme.brandColor || '#111111';
  const color = {
    background: '#f9f9f9',
    text: '#52545d',
    mainBackground: '#fff',
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: theme.buttonText || '#fff',
  };

  return `
      <h1
       style="margin: 10px 0; color: rgba(51, 51, 51, 1);
        font-size: 22px; font-weight: bold; text-align: left"
      >Hey 👋,</h1>
      <p
      style="margin-bottom: 10px; font-size: 16px; line-height: 1.625; color: ${color.text}"
      >Click the link below to sign in to your account.</p>
            <a 
            target="_" 
            href="${url}"
            style="
            text-decoration: none;
            color: white;
              border-radius: 0.375rem;
              background-color: black;
              border: 0 solid #e5e7eb;
              padding: 8px 1rem;
              font-size: 0.875rem;
              text-align: center;
              cursor:pointer;
              display: flex;
              flex-direction: column;
              align-items: center;
              margin: 12px 0;
              justify-content: center;
              font-weight: 600;
              width: fit-content;
            "
              onmouseover="this.style.color='white'"
              onmouseout="this.style.opacity='0.8'"
            >Sign in</a>
      
      <p
      style="margin-bottom: 10px; font-size: 16px; line-height: 1.625; color: ${color.text}"
      >This link expires in 24 hours and can only be used once.</p>
      <p
      style="margin-bottom: 10px; font-size: 16px; line-height: 1.625; color: ${color.text}"
      >If you did not try to log into your account, you can safely ignore it.</p>
`;
}

function htmlActivation(params: { url: string; host: string; theme }) {
  const { url, theme } = params;
  const redirectToWorkspace = url.replace('notebooks', 'workspace');

  // const escapedHost = host.replace(/\./g, '&#8203;.');

  const brandColor = theme.brandColor || '#111111';
  const color = {
    background: '#f9f9f9',
    text: '#52545d',
    mainBackground: '#fff',
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: theme.buttonText || '#fff',
  };

  return `
      <h1 
      style="margin: 10px 0; color: rgba(51, 51, 51, 1); font-size: 22px; font-weight: bold; text-align: left"
      >Welcome to Meepo,</h1>
      <p
      style="margin-bottom: 10px; font-size: 16px; line-height: 1.625; color: ${color.text}"
      >Click the link below to activate your account.</p>
            <a 
            target="_" 
            href="${redirectToWorkspace}"
            style="
            text-decoration: none;
            color: white;
              border-radius: 0.375rem;
              background-color: black;
              border: 0 solid #e5e7eb;
              padding: 8px 1rem;
              font-size: 0.875rem;
              text-align: center;
              cursor:pointer;
              display: flex;
              flex-direction: column;
              align-items: center;
              margin: 12px 0;
              justify-content: center;
              font-weight: 600;
              width: fit-content;
            "
              onmouseover="this.style.color='white'"
              onmouseout="this.style.opacity='0.8'"
            >Activation Account</a>
      <p
      style="margin-bottom: 10px; font-size: 16px; line-height: 1.625; color: ${color.text}"
      >This link expires in 24 hours and can only be used once.</p>
`;
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}
