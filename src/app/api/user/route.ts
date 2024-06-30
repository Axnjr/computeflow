import { ProjectConfigType } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
import { XataClient } from "@/xata";

export async function POST(req: NextRequest){

    const projectConfig: ProjectConfigType = await req.json()
    const xata = new XataClient();

    console.log(projectConfig)

    // return new NextResponse("200")

    // const newUser = await xata.db.user_projects.create({
    //     project_name: projectConfig.name,
    //     deployed_from: projectConfig.url,
    //     runtime: projectConfig.lang,
    //     region: projectConfig.region,
    //     commands: projectConfig.commands,
    //     env_variables: projectConfig.env,
    //     instance_metadata: projectConfig.compute,
    //     user: {
    //         id: projectConfig.userId
    //     },
    //     status: "under_deployment"
    // })

    return NextResponse.json({projectID: "rec_cq01s2virl3eurs0u46g"}, {status:200})
}