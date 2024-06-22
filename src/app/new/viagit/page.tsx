"use client";
import React, { useEffect, useState } from 'react'
import { Octokit } from "@octokit/rest";
import { useSession } from "next-auth/react"
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { monthsPassed } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useQuery, gql } from '@apollo/client';

const GET_REPOS = gql`
  query GetRepositories($login: String!) {
    user(login: $login) {
      repositories(first: 100) {
        nodes {
          name
          url
          updatedAt
        }
      }
    }
  }
`;

export default function DeployViaGithub() {

    const session = useSession()
    const router = useRouter()
    
    const { loading, error, data } = useQuery(GET_REPOS, {
        variables: { login: session.data?.user.email },
    });

    const [repos, setRepos] = useState<any[]>(data)

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const octokit = new Octokit({
    //                 auth: session.data?.user.accessToken
    //             });
    //             const res = await octokit.request('GET /user/repos', {
    //                 per_page:10,
    //                 sort:"pushed",
    //                 headers: {
    //                     'X-GitHub-Api-Version': '2022-11-28'
    //                 }
    //             });
    //             console.log(res.data);
    //             setRepos([...res.data]);
    //         } catch (error) {
    //             console.error('Error fetching repos:', error);
    //             setRepos([])
    //         }
    //     };
    //     if(session.status == "authenticated") fetchData();
    // }, [session.status])

    function showSearchedProject(e: React.ChangeEvent<HTMLInputElement>) {

    }


    return (
        <main className="h-fit w-full dark:bg-black bg-white dark:text-white text-black">
            <div className="w-full border-b p-8 border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
                <h1 className="text-4xl tracking-tighter font-medium leading-[3.5rem] w-1/2">
                    Import a Git Repository
                    <br />
                    <div className='text-sm tracking-normal text-neutral-500'>
                        Connect your GitHub account we will auto-deploys your project with
                        every commit to your linked branch with zero-downtime & instant rollbacks.
                    </div>
                </h1>
            </div>
            <section className='flex items-top pt-12 justify-center w-full h-screen gap-7'>
                <div className='w-[45%] h-[90%] rounded-lg border-2 border-neutral-200 dark:border-neutral-800 relative'>
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
                            repos.length > 0 ?
                                repos.map((repo, id: number) => <a key={id} href={repo?.html_url} target="_blank" rel="noopener noreferrer"
                                    className='w-full h-14 border border-neutral-200 dark:border-neutral-800 rounded-sm flex items-center
                            px-4 gap-2'>
                                    <GitHubLogoIcon className='size-5 mx-1 inline-block' />
                                    {repo?.name} · <span>{monthsPassed(repo?.pushed_at)}</span>
                                </a>)
                                :
                                <svg className="animate-spin size-6 text-black dark:text-white inline-block mt-28" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                        }
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