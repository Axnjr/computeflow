// "use client";
// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button";
import { XataClient } from "@/xata";
import getServerSession from 'next-auth'
import { authConfig } from "../../../backendLib/authOptions";
import Projects from "@/components/projects";

export default async function Home() {

	const session = getServerSession(authConfig);
    const auth = await session.auth();
	const xata = new XataClient();
	const projects = await xata.db.user_projects.select([
		"project_name", 
		"ip",
		"region",
		"status",
		"id",
		"user.xata.updatedAt"
	]).filter({"user.email":auth?.user?.email}).getAll()

	return (
		<main className="h-screen w-full dark:bg-black bg-white dark:text-white text-black">
			<div className="w-full border-b p-8 border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
				<h1 className="text-4xl">Overview</h1>
			</div>
			<Projects userProjects={JSON.stringify(projects)}/>
			
		</main>
	);
}
