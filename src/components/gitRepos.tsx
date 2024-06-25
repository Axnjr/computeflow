import { monthsPassed } from '@/lib/utils'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import React, { Dispatch } from 'react'
import { Button } from './ui/button'

export default function UserGitRepos(
    {
        loading,
        repos,
        setPro,
        showSearchedProject
    }: {
        loading: string | boolean,
        repos: any,
        setPro: Dispatch<any>,
        showSearchedProject(e: React.ChangeEvent<HTMLInputElement>): void
    }
) {

    console.log("git repos component was rendered !! loading:", loading)

    return (
        <>
            <div className='w-full h-14 relative'>
                <svg className="size-5 absolute left-4 top-[1.1rem] text-neutral-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input onChange={(e) => showSearchedProject(e)} className="w-full h-full bg-transparent border-neutral-200 py-2 text-sm
                dark:border-neutral-800 border-b rounded-lg pl-12 focus:shadow-xl shadow-black dark:shadow-white" 
                type="email" placeholder="Search Repositories & projects" />
            </div>
            <div className='w-full h-[88%] overflow-y-scroll text-center relative'>
                {
                    loading == "nothing found"
                        ?
                    <h1 className='mt-12'>No Repository found</h1>
                        :
                    loading == "error"
                        ?
                    <h1 className='mt-12'>Something went wrong try reloding the page</h1>
                        :
                    repos.map((repo: any, id: number) => <div key={id}
                            className='w-full h-14 border border-neutral-200 dark:border-neutral-800 rounded-sm flex items-center
                                px-4 gap-2 justify-between'>
                            <a className='text-base hover:underline' href={repo?.url}>
                                <GitHubLogoIcon className='size-5 mr-2 inline-block' />
                                {repo?.name.slice(0, 26)} · <span className='text-[0.7rem] tracking-tight'>{monthsPassed(repo?.pushed_at)}</span>
                            </a>
                            <Button onClick={() => setPro(repo)} className='h-8'>Deploy</Button>
                    </div>)
                }
            </div>
        </>
    )
}


/**
 * 
 * !loading
                        ?
                        repos.map((repo: any, id: number) =>
                            <div key={id}
                                className='w-full h-14 border border-neutral-200 dark:border-neutral-800 rounded-sm flex items-center
                                    px-4 gap-2 justify-between'>
                                <a className='text-base hover:underline' href={repo?.url}>
                                    <GitHubLogoIcon className='size-5 mr-2 inline-block' />
                                    {repo?.name.slice(0, 26)} · <span className='text-[0.7rem] tracking-tight'>{monthsPassed(repo?.pushed_at)}</span>
                                </a>
                                <Button onClick={() => setPro(repo)} className='h-8'>Deploy</Button>
                            </div>)
                        :
                        loading == "nothing found"
                            ?
                            <h1 className='mt-12'>No Repository found</h1>
                            :
                            loading == "error"
                                ?
                                <h1 className='mt-12'>Something went wrong try reloding the page</h1>
                                :
                                <svg className="animate-spin size-6 text-black dark:text-white inline-block mt-28" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
 */