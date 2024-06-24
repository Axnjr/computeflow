"use client";
import { ExternalLinkIcon, GitHubLogoIcon } from '@radix-ui/react-icons';
import { monthsPassed } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import useGitRepos from '@/hooks/useGitRepos';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function DeployViaGithub() {

    const { repos, repos2, loading, setRepos, setLoading } = useGitRepos()
    const router = useRouter()

    function showSearchedProject(e: React.ChangeEvent<HTMLInputElement>) {
        router.push(`?q=${e.currentTarget.value}`)
        let temp = repos2.filter((pro: any) => {
            let ans = pro.name.toLowerCase().includes(e.currentTarget.value.toLowerCase())
            return ans;
        })
        if (temp.length < 1) {
            setLoading("nothing found")
        } else {
            setRepos([...temp])
            setLoading(false)
        }
    }

    let name = repos[0]?.url?.replace("https://github.com/", "").split("/")[0];

    return (
        <main className="h-fit w-full dark:bg-black bg-white dark:text-white text-black">
            <div className="w-full border-b p-8 border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950
            flex items-center justify-between">
                <h1 className="text-4xl tracking-tight font-semibold leading-[3.5rem] w-1/2">
                    Import a Git Repository
                    <br />
                    <div className='text-sm tracking-normal text-neutral-500'>
                        Connect your GitHub account we will auto-deploys your project with
                        every commit to your linked branch with zero-downtime & instant rollbacks.
                    </div>
                </h1>
                <div className='flex items-center gap-2'>
                    <Button variant="ghost">{repos.length} Repositories</Button>
                    <Button>
                        <a className='flex items-center' href={"https://github.com/" + name}>{name} <ExternalLinkIcon /></a>
                    </Button>
                </div>
            </div>
            <section className='flex items-top pt-12 justify-center w-full h-screen gap-4'>
                <div className='w-[40%] h-[90%] rounded-lg border-2 border-neutral-200 dark:border-neutral-800 relative'>
                    <div className='w-full h-[12%] relative'>
                        <svg className="size-5 absolute left-4 top-[1.1rem] text-neutral-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        <input onChange={(e) => showSearchedProject(e)} className="w-full h-full focus:outline-double bg-transparent border-neutral-200 py-2 text-sm
                        dark:border-neutral-800 border-b rounded-lg pl-12 placeholder-neutral-500 outline-neutral-300
                        outline-2 focus:shadow-xl shadow-black dark:shadow-white" type="email" placeholder="Search Repositories & projects" />
                    </div>
                    <div className='w-full h-[88%] overflow-y-scroll text-center relative'>
                        {
                            !loading
                                ?
                                repos.map((repo, id: number) => <a key={id} href={repo?.url}
                                    className='w-full h-14 border border-neutral-200 dark:border-neutral-800 rounded-sm flex items-center
                                px-4 gap-2 justify-between'>
                                    <h1 className='text-base'>
                                        <GitHubLogoIcon className='size-5 mr-2 inline-block' />
                                        {repo?.name.slice(0, 26)} · <span className='text-[0.7rem] tracking-tight'>{monthsPassed(repo?.pushed_at)}</span>
                                    </h1>
                                    <Button className='h-8'>Deploy</Button>
                                </a>)
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
                        }
                    </div>
                </div>
                <div className='w-[55%] h-[90%] rounded-lg border-2 border-neutral-200 dark:border-neutral-800
                p-[2%] flex flex-col gap-3'>
                    <h1 className='text-xl text-right font-semibold m-2'>Configure Project</h1>
                    <div>
                        <label className='ml-2 text-[0.8rem] text-neutral-400'>Project name</label>
                        <input className='pl-2 bg-transparent h-10 rounded-md mt-1 text-sm w-full border-2 border-neutral-200 dark:border-neutral-800'
                            type='text' placeholder='my money making project' />
                    </div>
                    <div className='w-full'>
                        <label className='ml-2 text-[0.8rem] text-neutral-400'>Language</label>
                        <DropdownMenu>
                            <DropdownMenuTrigger className='w-full h-10 mt-1 border-neutral-200 dark:border-neutral-800 text-left 
                            pl-2 text-sm outline-none' asChild>
                                <Button className='border-2 justify-start pl-2' variant="outline">node</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='w-96'>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Billing</DropdownMenuItem>
                                <DropdownMenuItem>Team</DropdownMenuItem>
                                <DropdownMenuItem>Subscription</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                   

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