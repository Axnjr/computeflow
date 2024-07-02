import { ProjectConfigType } from "@/types/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

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

export async function runCommandOnInstance(instanceId: string, commands: string[]) {
	let res = await fetch("/api/commands", {
		method: "POST",
		body: JSON.stringify({
			instanceId: instanceId,
			commands: commands
		}),
	})
	if (!res.ok) {
		console.log("Error occured in creating user project: ", await res.json())
		return `Unexpected error occured !`
	}
	res = await res.json()
	// @ts-ignore
	return res?.commandId
}

export async function getCommandStatus(commandId: string, instanceId: string) {
	// @ts-ignor
	// return res?.commandStatus
	let s;
	while (true) {
		let res = await fetch(`/api/commands?commandId=${commandId}&instanceId=${instanceId}`, {cache:"no-cache"})
		if (!res.ok) {
			console.log("Error occured in creating user project: ", await res.json())
			return `Unexpected error occured !`
		}
		res = await res.json()
		// @ts-ignore
		if (['Success', 'Failed', 'Cancelled'].includes(res?.status)) {
			// console.log(res?.status)
			s = res.status;
			break;
		}

		console.log(`Command status: ${res?.status}. Waiting for completion...`);
		await sleep(15000); // Wait for 5 seconds before checking again
	}
	return s;
}


