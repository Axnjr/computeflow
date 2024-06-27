import { ProjectConfigType } from "@/types/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

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

export async function deployInstance(projectConfig: ProjectConfigType){
	const res = await fetch("/api/deploy", {
		method:"POST",
		body: JSON.stringify(projectConfig),
	})
	console.log("RESPINSE: ",res)
	return await res.json()
}