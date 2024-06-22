// "use client"
import { SessionProvider } from "next-auth/react"
import { CookiesProvider } from 'next-client-cookies/server';
import { ApolloProvider } from '@apollo/client';
import client from "@/lib/apolloClient";

export default function AllProvider({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<CookiesProvider>
			<ApolloProvider client={client}>
				{children}
			</ApolloProvider>
			</CookiesProvider>
		</SessionProvider>
	)
}