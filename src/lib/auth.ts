import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import EmailProvider from "next-auth/providers/email"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import { Client } from "postmark"
import { createTransport } from "nodemailer"

import { db } from "lib/db"
// import { siteConfig } from "config/site"

// const postmarkClient = new Client(process.env.POSTMARK_API_TOKEN)

// import { PrismaClient } from "@prisma/client";

const configEmail = {
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  },
  secure: true,
}

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(PrismaClient as any),
  adapter: PrismaAdapter(db as any),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  // secret: 'dauphaihau',
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    EmailProvider({
      from: process.env.SMTP_FROM,
      sendVerificationRequest: async ({
        identifier: email,
        url,
        provider: { server, from },
        theme
      }) => {

        console.log('dauphaihau debug: email', email)

        const user = await db.user.findUnique({
          where: {
            email,
          },
          select: {
            emailVerified: true,
          },
        })

        console.log('dauphaihau debug: user', user)

        // const { identifier, url, provider, theme } = params
        const { host } = new URL(url)

        // NOTE: You are not required to use `nodemailer`, use whatever you want.
        const transport = createTransport(configEmail)
        // const transport = createTransport(server)
        const result = await transport.sendMail({
          from,
          to: email,
          subject: `Sign in to ${host}`,
          text: text({ url, host }),
          html:
            user?.emailVerified ?
              htmlSignIn({ url, host, theme }) :
              htmlActivation({ url, host, theme })
          ,
        })
        console.log('dauphaihau debug: result', result)
        const failed = result.rejected.concat(result.pending).filter(Boolean)
        if (failed.length) {
          throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`)
        }
      },

      // sendVerificationRequest: async ({ identifier, url, provider }) => {
      //   const user = await db.user.findUnique({
      //     where: {
      //       email: identifier,
      //     },
      //     select: {
      //       emailVerified: true,
      //     },
      //   })
      //
      //   const templateId = user?.emailVerified
      //     ? process.env.POSTMARK_SIGN_IN_TEMPLATE
      //     : process.env.POSTMARK_ACTIVATION_TEMPLATE
      //   const result = await postmarkClient.sendEmailWithTemplate({
      //     TemplateId: parseInt(templateId),
      //     To: identifier,
      //     From: provider.from,
      //     TemplateModel: {
      //       action_url: url,
      //       product_name: siteConfig.name,
      //     },
      //     Headers: [
      //       {
      //         // Set this to prevent Gmail from threading emails.
      //         // See https://stackoverflow.com/questions/23434110/force-emails-not-to-be-grouped-into-conversations/25435722.
      //         Name: "X-Entity-Ref-ID",
      //         Value: new Date().getTime() + "",
      //       },
      //     ],
      //   })
      //
      //   if (result.ErrorCode) {
      //     throw new Error(result.Message)
      //   }
      // },

    }),
  ],
  callbacks: {
    async session({ token, session }) {
      // console.log('dauphaihau debug: token from callback session', token)
      // console.log('dauphaihau debug: session from callback session', session)

      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.image
        session.user.workspaces = token.workspaces
        session.user.lastAccessWorkspace = token.workspaces.find(ws => ws.id === token.lastAccessWorkspaceId)
      }
      return session

    },
    async jwt({ token , user }) {
      // console.log('dauphaihau debug: token from jwt', token)
      // console.log('dauphaihau debug: user from jwt', user)

      const dbUser = await db.user.findFirst({
        where: {
          email: token.email
        },
        include: {
          workspaces: {
            select: {
              id: true,
              name: true,
              domain: true,
            }
          },
        },
      })

      if (!dbUser) {
        token.id = user.id
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser?.name ?? '',
        email: dbUser.email,
        lastAccessWorkspaceId: dbUser.lastAccessWorkspaceId,
        image: dbUser.image,
        workspaces: dbUser.workspaces,
      }
    },
  },
  // events: {
  //   createUser: async (user) => {
  //     console.log('dauphaihau debug: create user')
  //     console.log('dauphaihau debug: user at auth', user)
  //     try {
  //       const count = await prisma.admin.count({
  //         where: {
  //           email: user.email,
  //         },
  //       });
  //
  //       if (count > 0) {
  //         await prisma.user.update({
  //           where: {
  //             id: user.id,
  //           },
  //           data: {
  //             role: "admin",
  //           },
  //         });
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   },
  // }
  secret: process.env.NEXTAUTH_SECRET,
  debug: true
}

function htmlSignIn(params: {url: string; host: string; theme}) {
  const { url, host, theme } = params
  // console.log('dauphaihau debug: url sign in', url)

  const escapedHost = host.replace(/\./g, "&#8203;.")

  const brandColor = theme.brandColor || "#111111"
  const color = {
    background: "#f9f9f9",
    text: "#52545d",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: theme.buttonText || "#fff",
  }

  return `
      <h1 style="margin: 10px 0; color: rgba(51, 51, 51, 1); font-size: 22px; font-weight: bold; text-align: left"
      >Hey 👋,</h1>
      <p
      style="margin-bottom: 10px; font-size: 16px; line-height: 1.625; color: ${color.text}"
      >Click the link below to sign in to your account.</p>
      <button style=" 
              border-radius: 0.2rem;
              background-color: black;
              color: white;
              border: 0 solid #e5e7eb;
              padding: 1rem;
              font-size: 0.875rem;
              text-align: center;
              cursor:pointer;
              display: flex;
              align-items: center;
              height: 40px;
              margin: 12px 0;
              justify-content: center;
      "
              onmouseover="this.style.color='white'"
              onmouseout="this.style.opacity='0.8'"
      >
            <a target="_" href="${url}">Sign in</a>
      </button>
      
      <p
      style="margin-bottom: 10px; font-size: 16px; line-height: 1.625; color: ${color.text}"
      >This link expires in 24 hours and can only be used once.</p>
      <p
      style="margin-bottom: 10px; font-size: 16px; line-height: 1.625; color: ${color.text}"
      >If you did not try to log into your account, you can safely ignore it.</p>
`
}

function htmlActivation(params: {url: string; host: string; theme}) {
  const { url, host, theme } = params
  const redirectToWorkspace = url.replace('notebooks', 'workspace')

  const escapedHost = host.replace(/\./g, "&#8203;.")

  const brandColor = theme.brandColor || "#111111"
  const color = {
    background: "#f9f9f9",
    text: "#52545d",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: theme.buttonText || "#fff",
  }

  return `
      <h1 style="margin: 10px 0; color: rgba(51, 51, 51, 1); font-size: 22px; font-weight: bold; text-align: left"
      >Welcome to Camille,</h1>
      <p
      style="margin-bottom: 10px; font-size: 16px; line-height: 1.625; color: ${color.text}"
      >Click the link below to activate your account.</p>
      <button style=" 
              border-radius: 0.2rem;
              background-color: black;
              color: white;
              border: 0 solid #e5e7eb;
              padding: 1rem;
              font-size: 0.875rem;
              text-align: center;
              cursor:pointer;
              display: flex;
              align-items: center;
              height: 40px;
              margin: 12px 0;
              justify-content: center;
      "
              onmouseover="this.style.color='white'"
              onmouseout="this.style.opacity='0.8'"
      >
            <a target="_" href="${redirectToWorkspace}">Activation Account</a>
      </button>
      <p
      style="margin-bottom: 10px; font-size: 16px; line-height: 1.625; color: ${color.text}"
      >This link expires in 24 hours and can only be used once.</p>
`
}

// function html(params: {url: string; host: string; theme}) {
//   const { url, host, theme } = params
//
//   const escapedHost = host.replace(/\./g, "&#8203;.")
//
//   const brandColor = theme.brandColor || "#346df1"
//   const color = {
//     background: "#f9f9f9",
//     text: "#444",
//     mainBackground: "#fff",
//     buttonBackground: brandColor,
//     buttonBorder: brandColor,
//     buttonText: theme.buttonText || "#fff",
//   }
//
//   return `
// <body style="background: ${color.background};">
//   <table width="100%" border="0" cellspacing="20" cellpadding="0"
//     style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
//     <tr>
//       <td align="center"
//         style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
//         Sign in to <strong>${escapedHost}</strong>
//       </td>
//     </tr>
//     <tr>
//       <td align="center" style="padding: 20px 0;">
//         <table border="0" cellspacing="0" cellpadding="0">
//           <tr>
//             <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}">
//             <a href="${url}"
//                 target="_blank"
//                 style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">
//                 Sign in</a></td>
//           </tr>
//         </table>
//       </td>
//     </tr>
//     <tr>
//       <td align="center"
//         style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
//         If you did not request this email you can safely ignore it.
//       </td>
//     </tr>
//   </table>
// </body>
// `
// }

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, host }: {url: string; host: string}) {
  return `Sign in to ${host}\n${url}\n\n`
}
