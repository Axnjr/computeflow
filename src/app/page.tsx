// "use client";
// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button";
import { XataClient } from "@/xata";
import getServerSession from 'next-auth'
import { authConfig } from "../../backendLib/authOptions";
import Projects from "@/components/projects";

export default async function Home() {

	const session = getServerSession(authConfig);
    const auth = await session.auth();
	const xata = new XataClient();
	const projects = await xata.db.user_projects.filter({"user.email":auth?.user?.email}).getAll()

	// const session = useSession()
	// const [userProjects, setUserProjects] = useState<any[]>([]);

	// useEffect(() => {
	// 	fetch(`/api/projects?uid=${session.data?.user?.email}`)
	// 	.then((res) => res.json())
	// 	.then((data) => {
	// 		console.log(data)
	// 		// setUserProjects([...data])
	// 	})
	// }, [])

	return (
		<main className="h-screen w-full dark:bg-black bg-white dark:text-white text-black">
			<div className="w-full border-b p-8 border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
				<h1 className="text-4xl tracking-tighter">Overview</h1>
			</div>
			<Projects userProjects={projects}/>
			
		</main>
	);
}
