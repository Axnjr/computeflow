import { Button } from '@/components/ui/button'
import React from 'react'

export default function DeployViaGithub() {
    return (
        <main className="h-fit w-full dark:bg-black bg-white dark:text-white text-black">
            <div className="w-full border-b p-8 border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
                <h1 className="text-4xl tracking-tighter font-medium leading-[3.5rem] w-1/2">
                    Import a Git Repository
                    <br/>
                    <div className='text-sm tracking-normal text-neutral-500'>
                        Connect your GitHub account we will auto-deploys your project with 
                        every commit to your linked branch with zero-downtime & instant rollbacks.
                    </div>
                </h1>
            </div>
           <section className='flex items-top pt-12 justify-center w-full h-screen gap-7'>
                <div className='w-[45%] h-1/2 rounded-lg border-2 border-neutral-200 dark:border-neutral-800 relative'>
                    <div className='w-full h-fit relative'>
                        <svg className="size-5 absolute left-4 top-[0.8rem] text-neutral-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        <input className="w-full h-12 focus:outline-double bg-transparent border-neutral-200 py-2 text-sm
                        dark:border-neutral-800 border-b rounded-lg pl-12 placeholder-neutral-500 outline-neutral-300
                        outline-2 focus:shadow-xl shadow-black dark:shadow-white" type="email" placeholder="Search Repositories & projects" />
                    </div>
                </div>
                <div className='w-[45%] h-1/2 rounded-lg border-2 border-neutral-200 dark:border-neutral-800'>

                </div>
           </section>
        </main>
    )
}

/**
 * What we need to deploy:
    * Name
    * runtime
    * branch
    * git url (deployed_from)
    * region
    * root_dir
    * build_command
    * run_command
    * env_vars
    * instance_type
    * instance_id
 */