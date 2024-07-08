import AllProvider from '@/providers/AuthProvider'
import type { Metadata } from 'next'
import "./globals.css"
import Nav from '../components/nav'

export const metadata: Metadata = {
	title: 'computeflow',
	description: 'Generated by create next app',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<AllProvider>
					<Nav />
					{children}
				</AllProvider>
			</body>
		</html>
	)
}