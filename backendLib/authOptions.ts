import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import { XataAdapter } from "@auth/xata-adapter"
import { XataClient } from "@/xata"

export const authConfig = {
	adapter: XataAdapter(new XataClient()),
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
}

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)