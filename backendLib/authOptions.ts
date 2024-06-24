import NextAuth, { type DefaultSession } from "next-auth"
import GithubProvider from 'next-auth/providers/github'
import GitLab from "next-auth/providers/gitlab"
import { XataAdapter } from "@auth/xata-adapter"
import { XataClient } from "@/xata"

const xata = new XataClient()

export const authConfig = {
	adapter: XataAdapter(xata),
	providers: [
		GitLab,
		GithubProvider
		// ({
		// 	clientId: process.env.GITHUB_CLIENT_ID!,
		// 	clientSecret: process.env.GITHUB_CLIENT_SECRET!,
		// })
	],
	callbacks: {
		// @ts-ignore
		async session({ session, user }) {
			const account = await xata.db.nextauth_accounts.filter({ 
				"user.id": user.id, 
				"provider": "github" 
			}).getFirst();
			return {...session, user: {
				"accessToken": account?.access_token,
				...user
			}}
		}
	}
}

declare module "next-auth" {
	interface Session {
	  user: {
		accessToken: string
	  } & DefaultSession["user"]
	}
  }

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)