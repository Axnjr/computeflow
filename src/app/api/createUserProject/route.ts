import { ProjectConfigType } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
import { XataClient } from "@/xata";

const xata = new XataClient();

export async function POST(req: NextRequest){

    const projectConfig: ProjectConfigType = await req.json()
    // console.log(projectConfig)

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

// export async function GET(req: NextRequest){
//     const status = req?.nextUrl?.searchParams?.get("status")?.replace(/["\\/]/g, '');
//     const message = req?.nextUrl?.searchParams?.get("message")?.replace(/["\\/]/g, '');
//     const pid = req?.nextUrl?.searchParams?.get("pid")?.replace(/["\\/]/g, '');
//     const commitId = req?.nextUrl?.searchParams?.get("cid")?.replace(/["\\/]/g, '');

//     const dc = await fetch(`https://api.github.com/repos//cheapcloud/git/commits/3dff2048d1f0be7c65c3c431059bdde4e160b0cc`)

//     if(pid && status){
//         await xata.db.project_deployments.create({
//             project:{id: pid },
//             status: "under_deployment",
//             message: "",
//             deployment_commit:{
    
//             }
//         })
//     }
// }