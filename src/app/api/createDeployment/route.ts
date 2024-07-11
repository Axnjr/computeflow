import { ProjectConfigType, DeploymentData } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
import { XataClient } from "@/xata";

const xata = new XataClient();

export async function POST(req: NextRequest){
    const deploymentData: DeploymentData = await req.json()
    console.log(deploymentData)

    if(!deploymentData.pid){
        return NextResponse.json({ error: "Project Id is a required property to be passed" }, { status: 400 })
    }

    try {
        // const deployment = await xata.db.project_deployments.create({
        //     project:{id: deploymentData.pid },
        //     status: deploymentData.status,
        //     message: deploymentData.message,
        //     deployment_commit:{
        //         ...deploymentData.deploymentsCommits
        //     }
        // })
        // return NextResponse.json({deployment}, {status:200})
    } 
    catch (error) {
        console.log("Error while creating `project_deployment` !!", error)
        return NextResponse.json(error, { status: 500 })
    }

    return NextResponse.json("1234567derftghyuj")
}