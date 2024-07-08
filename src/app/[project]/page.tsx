"use client";
// import { Button } from "@/components/ui/button";
import { runCommandOnInstance, getVMStatus, sleep, timeStamp } from "@/lib/utils";
import { useProjectData } from "@/providers/projectDataProvider";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { useChannel } from 'ably/react';

export default function ProjectPage({ params, searchParams }: { params: { project: string }, searchParams: { [key: string]: string | undefined } }) {

	const project = useProjectData()
	const [logs, setLogs] = useState<string[]>(searchParams?.ts?.split("!") ?? [])

	useEffect(() => {
		async function initDeployment() {
			let status = "under_deployment";
			console.log(project.instance_metadata?.instanceId)
			while(true){
				console.log(status)
				status = await getVMStatus(project.instance_metadata?.instanceId as string)
				if(status == "running") break;
				await sleep(3000);
			}
			setLogs(log => [...log, `,${timeStamp()} ◆ Connecting with VM !`])
			runCommandOnInstance(
				project.ip, 
[
`sudo yum update -y
sudo yum install git -y
sudo yum install nodejs -y npm`,  

`sudo git clone -v ${project.deployed_from} ${project.id}/ec2`, 

`cd ${project.id}/ec2
sudo npm install
sudo npm install -g forever`, 

`sudo forever start --minUptime 5000 --spinSleepTime 2000 index.js`                 
]
			)
			.then(res => {
				setLogs(log => [...log, `,${timeStamp()} ◆ 🎊 Build Complete App running on your specified port 🎉🥳`])
				console.log(logs)
			})
		}

		if(searchParams.ts && project.status == "under_deployment"){
			setLogs([...logs, `,${timeStamp()} ◆ Waiting for Remote VM to catch up !`])
			initDeployment()
		}
	}, [])

	const channel = useChannel('project_ssh', 'log', (message) => {
		console.log(message)
		setLogs(log => [...log, `,${timeStamp()} ◆ ${message.data} !`])
	});

	return (
		<main className="h-screen w-full dark:bg-black bg-white dark:text-white text-black">
			<div className="flex items-center px-6 gap-2 mb-3">
				<input className="bg-transparent outline-none h-10 w-[60%] border-2 border-neutral-300 dark:border-neutral-800
				pl-3 rounded-lg text-sm" placeholder="Search logs" type="text" />
				<Select>
					<SelectTrigger className="w-[35%] h-10 border-2 border-neutral-300 dark:border-neutral-800 rounded-lg text-sm">
						<SelectValue placeholder="Live" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="live">Live</SelectItem>
						<SelectItem value="24h">Last 24 hours</SelectItem>
						<SelectItem value="3d">Last 3 days</SelectItem>
						<SelectItem value="7d">Last 7 days</SelectItem>
						<SelectItem value="30d">Last 30 days</SelectItem>
					</SelectContent>
				</Select>
				<Button onClick={() => {
					// channel.publish("test", "aya kay ??")
					// getVMStatus("i-01772937d19798e69")
					// .then(res => console.log(res))
				}}>Execute</Button>
			</div>
			<div className="w-[95%] m-auto rounded-lg h-2/3 border border-neutral-300 dark:border-neutral-800
			bg-black dark:bg-neutral-950 text-neutral-400 p-5">
				{
					logs.length > 0
						?
						logs.map((log: string, id) => {
							let splitlog = log.split("◆")
							return <div key={id} className="flex items-center justify-start text-base">
								<p className="font-mono tracking-tighter">{splitlog[0].replace(",", "")}</p>&nbsp; {">>"} &nbsp;<p className="text-white font-bold">{splitlog[1]}</p>
							</div>
						})
						:
						<></>
				}
			</div>
		</main>
	)
}