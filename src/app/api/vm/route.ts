import { NextRequest, NextResponse } from "next/server";
import { EC2Client, DescribeInstanceStatusCommand } from "@aws-sdk/client-ec2";
import { credentials } from "@/lib/server-utils";

const ec2 = new EC2Client({
    region: "ap-south-1",
    credentials: credentials,
});

export async function GET(req: NextRequest) {
    const vmid = req?.nextUrl?.searchParams?.get("id")?.replace(/["\\/]/g, '');
    console.log("VM ID: ",vmid)
    if(vmid){
        try {
            const command = new DescribeInstanceStatusCommand({
                InstanceIds:[vmid]
            });
            const response = await ec2.send(command);
            // @ts-ignore
            console.log(response.InstanceStatuses[0])
            // @ts-ignore
            return NextResponse.json(response.InstanceStatuses[0].InstanceState, { status: 200 })
        } catch (error) {
            return NextResponse.json({error:error, id: vmid}, { status:500 })
        }
    }
    else{
        return NextResponse.json({error: "InstanceId not found in query !!"}, { status: 403 })
    }
}