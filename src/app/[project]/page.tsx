"use client";
import { Button } from "@/components/ui/button";
import { runCommandOnInstance } from "@/lib/utils";
import { useProjectData } from "@/providers/projectDataProvider";
import { useEffect, useState } from "react";

export default function ProjectPage({ params, searchParams }: { params: { project: string }, searchParams: { [key: string]: string | undefined } }) {
	const project = useProjectData()
	const [logs, setLogs] = useState([])

	useEffect(() => {
		if(searchParams.ts){
			// @ts-ignore
			setLogs(searchParams.ts.split("!"))
		}
	}, [])

	return (
		<main className="h-screen w-full dark:bg-black bg-white dark:text-white text-black">
			<div className="w-[95%] m-auto rounded-lg h-2/3 border border-neutral-300 dark:border-neutral-800
			bg-black dark:bg-neutral-950 text-neutral-400 p-6">
				{
					logs.length > 0 
						? 
					logs.map((log: string, id) => { 
					let splitlog = log.split("◆")
					return <div key={id} className="flex items-center justify-start text-base">
						<p className="font-mono tracking-tighter">{splitlog[0].replace(",","")}</p>&nbsp; {"=>"} &nbsp;<p className="font-semibold">{splitlog[1]}</p>
					</div>
					})
						:
					<></>
				}
			</div>
		</main>
	)
}



	// runCommandOnInstance(project.ip, 
	// 	`sudo git clone ${project.deployed_from} ${project.id}/ec2
	// 	cd ${project.id}/ec2
	// 	sudo npm install
	// 	sudo npm install -g forever
	// 	sudo forever start ${project.commands?.startCommand}`
	// )
	// .then(res => {})
// let sc = ["npm", "cargo"].includes(project.commands?.startCommand as string) ? `sudo ${project.commands?.startCommand}` :
// 	const handleClick = async () => {
// 		try {
// 			let res = await fetch("/api/execute", {
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json",
// 					"Accept": "application/json",
// 					"Access-Control-Allow-Origin": "*"
// 				},
// 				body: JSON.stringify({
// 					instanceIp: project.ip,
// 					script:
// 						`sudo git clone ${project.deployed_from} ${project.id}/ec2
// cd ${project.id}/ec2
// sudo npm install
// sudo npm install -g forever
// sudo forever start ${project.commands?.startCommand}`
// 				}),
// 			});
// 			if (!res.ok) {
// 				const errorData = await res.json();
// 				console.log("Error occurred executing commands: ", errorData);
// 				// setError("Unexpected error occurred!");
// 				return;
// 			}
// 			const responseData = await res.json();
// 			console.log(responseData)
// 			//   setData(responseData);
// 		} catch (error) {
// 			console.log("Fetch error: ", error);
// 			//   setError("Failed to fetch");
// 		}
// 	};