import { ProjectConfigType } from "@/types/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const timeStamp = () => {
	return new Date().toLocaleString('en-US', {
		month: 'long',
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

export async function runCommandOnInstance(instanceIp: string | undefined, scripts: string[]) {
	if (!instanceIp) {
		alert("INSTANCE-ID NOT FOUND !")
		return "error"
	}
	// console.log("Currenly in utils", instanceIp, script)
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

	try {
		let res = await fetch("/api/execute", requestOptions)
		if (!res.ok) {
			console.log("Error occurred executing commands: ", await res.json());
			return `Unexpected error occurred!`;
		}
		return "Script excuted successfully check console for logs !"
	} 
	catch (error) {
		console.log("Fetch error: ", error);
		return `Failed to fetch`;
	}
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