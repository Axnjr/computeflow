"use client";
import UserGitRepos from '@/components/gitRepos';
import useGitRepos from '@/hooks/useGitRepos';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useRef, useState } from 'react';
import ProjectConfig from '@/components/projectConfig';
import SelectCompute from '@/components/selectCompute';
import EnvVariable from '@/components/envVariable';
import { ProjectConfigType, dummyProjectConfig } from '@/types/types';
import { deployInstance } from '@/lib/utils';
import { useSession } from 'next-auth/react';

export default function DeployViaGithub() {

    const session = useSession();
    const { repos, repos2, loading, setRepos, setLoading } = useGitRepos()
    const pro = useRef<ProjectConfigType>(dummyProjectConfig)

    pro.current.userId = session.data?.user.id as string

    const [projectName, setProjectName] = useState(pro.current.name)
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
        <main className="h-fit w-full dark:bg-black bg-white dark:text-white text-black pb-12">
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
                {
                    !loading 
                        ? 
                    <div className='flex items-center gap-2'>
                        <Button variant="ghost">{repos.length} Repositories</Button>
                        <Button>
                            <a className='flex items-center' href={"https://github.com/" + name}>{name} <ExternalLinkIcon /></a>
                        </Button>
                    </div>
                        :
                    null
                }
            </div>
            <section className='flex items-top pt-12 justify-center w-full h-fit pb-8 gap-4'>
                <div className='w-[40%] h-[42rem] rounded-lg border-2 border-neutral-200 dark:border-neutral-800 relative text-center'>
                    {
                        !loading 
                            ?  
                        <UserGitRepos setProjectName={setProjectName} repos={repos} loading={loading} showSearchedProject={showSearchedProject} projectConfig={pro.current}/>
                            :
                        <svg className="animate-spin size-6 text-black dark:text-white inline-block mt-28" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    }
                </div>
                <ProjectConfig projectName={projectName} projectConfig={pro.current} />
            </section>
            <SelectCompute projectConfig={pro.current} />
            <br/>
            <EnvVariable/>
            <br/>
            <Button onClick={() => {
                // @ts-ignore
                pro.current.name = document.getElementById("projectnameinputfeild").value
                // @ts-ignore
                pro.current.commands.rootDir = document.getElementById("rootdirinputfeild").value; 
                // @ts-ignore
                pro.current.commands.buildCommands = document.getElementById("buildcommandinputfeild").value
                // @ts-ignore
                pro.current.commands.startCommand = document.getElementById("startcommandinputfeild").value
                // @ts-ignore
                pro.current.env = document.getElementById("envvariblesinputfeild").value
                console.log(pro.current)
                deployInstance(pro.current)
                .then(res => router.push(`/${res}?create=true`))
            }}
            className='m-auto w-[36%] flex items-center justify-center'>
                Deploy your app
            </Button>
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