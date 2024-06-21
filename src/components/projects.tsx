"use client";
import React, { useState } from 'react'
import { Button } from './ui/button'
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Project } from '@/types/types';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import NewProjectDrawer from './newProjectDrawer';

function monthsPassed(dateString: string) {
    const givenDate = new Date(dateString);
    const currentDate = new Date();
    const yearsDifference = currentDate.getFullYear() - givenDate.getFullYear();
    const monthsDifference = currentDate.getMonth() - givenDate.getMonth();
    const totalMonthsPassed = yearsDifference * 12 + monthsDifference;
    return totalMonthsPassed == 0 ? "in this month" : totalMonthsPassed;
}

export default function Projects({ userProjects }: { userProjects: string }) {

    const router = useRouter()
    const sp = useSearchParams()
    const [pros, setPros] = useState<Project[]>(JSON.parse(userProjects));

    function showSearchedProject(e: React.ChangeEvent<HTMLInputElement>) {
        router.push(`?q=${e.currentTarget.value}`)
        let temp = JSON.parse(userProjects).filter((pro: Project) => {
            return pro.project_name.includes(e.currentTarget.value)
        })
        setPros([...temp])
    }

    return (
        <>
            <div className="flex w-full items-center justify-center gap-2 mt-5 relative">
                <svg className="size-4 absolute left-8 text-neutral-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input onChange={(e) => showSearchedProject(e)} className="w-[80%] h-10 bg-transparent border-neutral-200 py-2 text-sm
                dark:border-neutral-800 border rounded-md pl-10 placeholder-neutral-500
                focus:shadow-xl shadow-black dark:shadow-white" type="email" placeholder="Search Repositories & projects" />
                <Button className="h-10" variant="outline" type="submit">Sort by</Button>
                <NewProjectDrawer/>
            </div>
            <div className="w-[98%] m-auto mt-4 h-[50vh] rounded-lg border border-neutral-200 
            dark:border-neutral-800 px-6 py-8 grid grid-cols-3 gap-4">
                {
                    pros.length > 0
                        ?
                        pros.map((project: Project, id: number) => <Link href={`/${project.id}`} className='h-36 border rounded-xl 
                    border-neutral-200 dark:border-neutral-800 p-5' key={id}>
                            <div className='flex items-top justify-between'>
                                <h1 className='text-xl font-medium tracking-tighter capitalize block leading-0'>
                                    {project.project_name}<br />
                                    <span className='text-[0.7rem] hover:underline text-neutral-500 flex items-center group gap-1'>
                                        {project.ip}
                                        <svg className="size-3 group-hover:block hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                        </svg>
                                    </span>
                                </h1>
                                <p className='bg-green-500/20 text-green-500 w-fit h-fit px-2 py-1 capitalize rounded-xl text-xs'>
                                    {project.status}
                                </p>
                            </div>
                            <br />
                            <div className='text-xs flex items-center justify-between'>
                                <p className='text-neutral-500'>Last deployed: {monthsPassed(project.xata.updatedAt.toString())}</p>
                                <p>{project?.region}</p>
                            </div>
                        </Link>)
                        :
                        <div className='text-center place-content-center place-items-center col-span-3'>
                            <h1>No result found!</h1>
                            <p><span className=' text-yellow-400 underline'>Create a project</span> named "{sp.get("q")}" ?</p>
                        </div>
                }
            </div>
        </>
    )
}
