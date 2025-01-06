import { ProjectConfigType } from "@/types/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { plans } from "@/constants";

export const timeStamp = () => {
	return new Date().toLocaleString('en-US', {
		month: "short",
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		hour12: true
	});
};

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function monthsPassed(dateString: string) {
	const givenDate = new Date(dateString);
	const currentDate = new Date();
	const yearsDifference = currentDate.getFullYear() - givenDate.getFullYear();
	const monthsDifference = currentDate.getMonth() - givenDate.getMonth();
	let totalMonthsPassed = yearsDifference * 12 + monthsDifference;
	// if(totalMonthsPassed > 12){
	// 	let y = 0;
	// 	while(totalMonthsPassed > 12){
	// 		totalMonthsPassed = totalMonthsPassed - 12;
	// 		y += 1;
	// 	}
	// }
	return totalMonthsPassed == 0 ? "in this month" : `${totalMonthsPassed} month ago`;
}

export async function deployInstance(projectConfig: ProjectConfigType) {
	let res = await fetch("/api/deploy", {
		method: "POST",
		body: JSON.stringify(projectConfig),
	})
	if (!res.ok) {
		console.log("Error occured in deploying project: ", await res.json())
		return `Unexpected error occured !`
	}
	res = await res.json()
	// @ts-ignore
	return res?.instanceId
}

export async function addProjectConfigToDatabase(projectConfig: ProjectConfigType) {
	let res = await fetch("/api/createUserProject", {
		method: "POST",
		body: JSON.stringify(projectConfig),
	})
	if (!res.ok) {
		console.log("Error occured in creating user project: ", await res.json())
		return `Unexpected error occured !`
	}
	res = await res.json() // endpoint send an object with projectID
	// @ts-ignore
	return res?.projectId
}

export async function addProjectDeployments(){
	
}

export async function runCommandOnInstance(instanceIp: string | undefined, scripts: string[]) {
	// alert("EXECUTING COMMANDS !!")
	if (!instanceIp) {
		alert("INSTANCE-ID NOT FOUND !")
		return "error"
	}
	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	const requestOptions: RequestInit = {
		method: "POST",
		headers: myHeaders,
		body: JSON.stringify({
			"instanceIp": instanceIp,
			"scripts": scripts
		}),
		redirect: "follow"
	};

	let runCommandAttempts = 1, response = "";

	while(true){
		console.log("Trying to run commnads on VM, attempt number:", runCommandAttempts)
		try {
			let res = await fetch("/api/execute", requestOptions)
			// server side error / ssh error //
			if (!res.ok) { 
				console.log("Error occurred executing commands: ");
				if(runCommandAttempts > 6){
					response = `Some unexpected error occured, Tried ${runCommandAttempts} times !!`
					break;
				}
				runCommandAttempts += 1;
				await sleep(2000)
				continue;
			}
			const commandsResponse = await JSON.parse(await res.text())
			console.log("RES::::: ----------===========>> ",commandsResponse)
			if(JSON.stringify(commandsResponse?.resultArray) === JSON.stringify([0,0,0,0])){
				response = "Script excuted successfully check console for logs !"
				break;
			}
			// script error //
			else{ 
				response = `error`
				break;
			}
		} 
		// fetch error //
		catch (error) { 
			console.log("Fetch error: ", error);
			if(runCommandAttempts > 6){
				response = `Some unexpected error occured, Tried ${runCommandAttempts} times !!`
				break;
			}
			runCommandAttempts += 1;
			await sleep(2000)
			continue;
		}
	}
	return response
}

function logAnalyzer(logArr: number[]){
	const logs = ["Seting up VM", "Clonning / pulling project", "Running Build commands", "Running start cammand"]
	let ans ;
	for(let i = 0; i < logArr.length; i++){
		if(logArr[i] != 0){
			ans = i;
			break;
		}
	}
	return ans ? logs[ans] : "Something else";
}

export async function getVMStatus(instanceId: string) {
	const res = await fetch(`/api/vm?id=${instanceId}`)
	if(!res.ok){
		console.log("Error occured in getting VM status:", await res.json())
		return "error"
	}
	let r = await res.json()
	return r?.Name
}

export async function pollForVmStatus(instanceId: string){
	let status = "under_deployment";
	console.log(instanceId)
	while (true) {
		console.log(status)
		status = await getVMStatus(instanceId)
		if (status == "running") break;
		await sleep(3000);
	}
	return status
}