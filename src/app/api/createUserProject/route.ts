import { ProjectConfigType } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
import { XataClient } from "@/xata";

export async function POST(req: NextRequest){
    const projectConfig: ProjectConfigType = await req.json()
    const xata = new XataClient();

    console.log(projectConfig)

    try {
        const newUserProject = await xata.db.user_projects.create({
            project_name: projectConfig.name,
            deployed_from: projectConfig.url,
            runtime: projectConfig.lang,
            region: projectConfig.region,
            commands: projectConfig.commands,
            env_variables: projectConfig.env,
            instance_metadata:projectConfig.compute,
            user: {
                id: projectConfig.userId
            },
            status: "under_deployment"
        })
        return NextResponse.json({projectId: newUserProject.id}, {status:200})
    } 
    catch (error) {
        console.log("Error while creating `user_project` !!",error)
        return NextResponse.json(error, { status: 500 })
    }
}