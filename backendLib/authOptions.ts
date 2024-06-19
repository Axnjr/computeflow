import { prismaDB } from './prismaDb'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NextAuthOptions, getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import { User } from '@prisma/client'
import db from './db2'

export const authOptions: NextAuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
  	adapter: PrismaAdapter(prismaDB),
	session: { strategy: 'jwt' },

    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
	  GithubProvider({
		clientId: process.env.GITHUB_CLIENT_ID!,
		clientSecret: process.env.GITHUB_CLIENT_SECRET!,
	  })
    ],

	callbacks:{
		redirect() {
			return "/overview"
		},

		async session({ session, token: user }) {
			// session.user!.id = user.id
			// session.user!.name = user.name
			// session.user!.email = user.email
			// session.user!.image = user.picture
			return {...session, dbPayload: user, type: (user as User).planType};
		},

		async signIn(props) {
			try {
				const u = await db.query("SELECT * FROM userdetails WHERE email = $1 LIMIT 1", [props.user.email as string])

				if(u.rows.length > 0){
					return true;
				}

				else {
					await db.query(`
						INSERT INTO userdetails (plantype, apikey, expiryon, hits, email) 
						VALUES ('Hobby', $1, NULL, 0, $2) ;
					`,
					[props.user.id as string, props.user.email as string])
				}

			} catch (error) {
				console.log("ERROR AT `signIn` Callback : ", error)
			}
			return true;
		}

	}
}

export const getAuthSession = () => getServerSession(authOptions) // to get data all around the app .