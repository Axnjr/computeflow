"use client";
import { Button } from "@/components/ui/button";
import { runCommandOnInstance } from "@/lib/utils";
import { useProjectData } from "@/providers/projectDataProvider";

export default function ProjectPage({ params, searchParams }: { params: { project: string }, searchParams: { [key: string]: string | string[] | undefined }} ){

    const project = useProjectData()

    

    return (
        <main className="h-screen w-full dark:bg-black bg-white dark:text-white text-black">
            <h1>{params.project}</h1>
            <h1>{JSON.stringify(project)}</h1>
            <Button onClick={() => {
                runCommandOnInstance(project.instance_metadata?.instanceId, [
                    `git clone ${project.deployed_from} /RADHA-RADHA/ec2-user`,
                    'cd /RADHA-RADHA/ec2-user',
                    
                ])
                .then(res => console.log(res))
            }}>Execute command on VM</Button>
        </main>
    )
}