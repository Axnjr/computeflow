"use client";
import { SessionProvider } from "next-auth/react"
import * as Ably from 'ably';
import { AblyProvider, ChannelProvider } from 'ably/react';
const client = new Ably.Realtime({ key: "3gTXhQ.kWLQgA:-UDfXhkGWf_MH4kI89Z0h03bnXY6HGgKw2NouZVrCoc" });
export default function AllProvider({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<AblyProvider client={client}>
				<ChannelProvider channelName="project_ssh">
					{children}
				</ChannelProvider>
			</AblyProvider>
		</SessionProvider>
	)
}