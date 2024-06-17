// import { use, useState } from "react";

export default function Home() {

	async function intiateDeployement(formData: FormData) {
		'use server'
		const url = formData.get('url')
		return new Response(JSON.stringify({
			data: `Deployement initiated for ${url}`
		}), {
			status: 200
		})
	}

		return (
			<>
				<main className="h-screen w-full flex flex-col items-center justify-center gap-5">
					<h1 className="text-4xl font-black tracking-tight">Cheap Cloud Docker Deployement Service</h1>
					<form>
						<input className="h-12 text-left rounded-xl inline-block bg-zinc-100 px-6 outline-none" type="text" placeholder="Docker Container URL .." />
					</form>
				</main>
			</>
		);
	}
