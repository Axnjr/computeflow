import { Button } from "@/components/ui/button";
import { Project } from "@/types/types";
import { XataClient } from "@/xata";
import { redirect } from 'next/navigation'
import { GitHubLogoIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getIpAddress } from "@/lib/aws";


export default async function ProjectPage({ params, searchParams }: { params: { project: string }, searchParams: { [key: string]: string | string[] | undefined } }) {

    const xata = new XataClient();
    let res: unknown
    if (searchParams.name == "true") {
        res = await xata.db.user_projects.filter({ project_name: params.project }).getFirst()
        console.log("Project data with name: ", res)
    }
    else {
        res = await xata.db.user_projects.filter({ id: params.project }).getFirst()
    }

    // @ts-ignore
    if (res == null) {
        redirect("/overview")
    } // @ts-ignore
    const project: Project = res;

    let ip;
    if(project.ip == null || project.ip == undefined){
        ip = await getIpAddress(project.instance_metadata.instanceId)
        await xata.db.user_projects.update(project.id, { "ip": ip })
    }
    ip = project.ip;

    return (
        <main className="h-screen w-full dark:bg-black bg-white dark:text-white text-black">
            <div className="w-full border-b p-8 border-neutral-200 dark:border-neutral-800 bg-neutral-50 
            dark:bg-neutral-950 flex items-center justify-between">
                <a href={ip} className="text-4xl tracking-tighter capitalize hover:underline group inline-block">
                    {project?.project_name}
                    <ExternalLinkIcon className="hidden group-hover:inline-block size-7" />
                </a>
                <div className="flex space-x-2">
                    <Button variant="outline">{
                        project?.deployed_from.includes("github")
                            ?
                        <a className="flex items-center" href={"https://" + project?.deployed_from + ".cheapcloud.dev"}><GitHubLogoIcon className="mr-2 -ml-1" /> Repository</a>
                            :
                        <a className="flex items-center" href={"https://" + project?.deployed_from + ".cheapcloud.dev"}>
                            <svg className='mr-2 -ml-1 inline-block' xmlns="http://www.w3.org/2000/svg" width="19" height="15" viewBox="0 0 23 18" fill="none">
                                <path fill="#0DB7ED" d="M22.338 5.987c-.066-.044-.616-.473-1.804-.473-.308 0-.616.033-.924.088-.231-1.54-1.518-2.32-1.573-2.354l-.32-.187-.197.297a3.636 3.636 0 0 0-.561 1.31c-.22.88-.088 1.715.363 2.43-.54.308-1.42.385-1.606.385H1.229a.688.688 0 0 0-.682.693c0 1.265.198 2.53.638 3.718.495 1.31 1.243 2.277 2.2 2.871 1.078.66 2.849 1.034 4.862 1.034a14.7 14.7 0 0 0 2.662-.242c1.232-.22 2.42-.649 3.509-1.276a9.13 9.13 0 0 0 2.387-1.969c1.155-1.287 1.837-2.75 2.332-4.015h.209c1.254 0 2.035-.506 2.464-.935.286-.264.495-.583.649-.957l.088-.264-.21-.154ZM2.582 7.077h1.936a.18.18 0 0 0 .176-.177V5.162a.18.18 0 0 0-.176-.176H2.582a.174.174 0 0 0-.176.176V6.9c.01.1.077.176.176.176Zm2.673 0H7.19a.18.18 0 0 0 .176-.177V5.162a.18.18 0 0 0-.176-.176H5.255a.174.174 0 0 0-.176.176V6.9c.01.1.077.176.176.176Zm2.717 0h1.925c.11 0 .187-.078.187-.177V5.162c0-.088-.066-.176-.187-.176H7.972c-.088 0-.165.077-.165.176V6.9c0 .1.066.176.165.176Zm2.684 0h1.947c.088 0 .165-.078.165-.177V5.162c0-.088-.066-.176-.165-.176h-1.947c-.088 0-.165.077-.165.176V6.9c0 .1.077.176.165.176ZM5.255 4.611H7.19c.088 0 .176-.099.176-.198V2.687a.174.174 0 0 0-.176-.176H5.255c-.1 0-.176.066-.176.176v1.727c.01.1.077.198.176.198Zm2.717 0h1.925c.11 0 .187-.099.187-.198V2.687c0-.099-.066-.176-.187-.176H7.972c-.088 0-.165.066-.165.176v1.727c0 .1.066.198.165.198Zm2.684 0h1.947c.088 0 .165-.099.165-.198V2.687c0-.099-.077-.176-.165-.176h-1.947c-.088 0-.165.066-.165.176v1.727c0 .1.077.198.165.198Zm0-2.508h1.947c.088 0 .165-.077.165-.176V.212c0-.11-.077-.187-.165-.187h-1.947c-.088 0-.165.066-.165.187v1.716c0 .088.077.176.165.176Zm2.706 4.972h1.936a.174.174 0 0 0 .176-.176V5.162a.18.18 0 0 0-.176-.176h-1.936c-.088 0-.165.077-.165.176V6.9c0 .1.077.176.165.176Z"></path>
                            </svg>
                            Docker Hub
                        </a>
                    }</Button>
                    <Button>Upgrade Instance</Button>
                </div>
            </div>
            <Tabs defaultValue="account" className="w-full">
                <TabsList>
                    <TabsTrigger value="account">Overview</TabsTrigger>
                    <TabsTrigger value="account">Deployments</TabsTrigger>
                    <TabsTrigger value="">Scaling</TabsTrigger>
                    <TabsTrigger value="">Logs</TabsTrigger>
                    <TabsTrigger value="">SSH</TabsTrigger>
                    <TabsTrigger value="">Metrics</TabsTrigger>
                    <TabsTrigger value="">Env Variables</TabsTrigger>
                    <TabsTrigger value="">Settings</TabsTrigger>
                </TabsList>
            </Tabs>
        </main>
    )
}

/**
 * Project metadata:
    * status
    * deployed_from: github | docker
    * runtime: nodejs | python | rust | c++ ...
    * region
    * last_deployed
    * version_history
    * ip
    * instance_id
    * instance_count
    * instance_type
 * 
 */
