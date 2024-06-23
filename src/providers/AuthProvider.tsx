// "use client"
import { SessionProvider } from "next-auth/react"
// import { CookiesProvider } from 'next-client-cookies/server';


export default function AllProvider({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
				{children}
		</SessionProvider>
	)
}