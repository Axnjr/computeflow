import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function monthsPassed(dateString: string) {
  const givenDate = new Date(dateString);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - givenDate.getTime();
  const yearsDifference = currentDate.getFullYear() - givenDate.getFullYear();
  const monthsDifference = currentDate.getMonth() - givenDate.getMonth();
  const totalMonthsPassed = yearsDifference * 12 + monthsDifference;
  return totalMonthsPassed == 0 ? "in this month" : `${totalMonthsPassed} month ago`;
}