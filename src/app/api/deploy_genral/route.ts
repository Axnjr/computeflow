import { NextRequest, NextResponse } from "next/server";
import { EC2Client, RunInstancesCommand } from "@aws-sdk/client-ec2";

export async function GET(req: NextRequest) {

    const password = req?.nextUrl?.searchParams?.get("password")?.replace(/["\\/]/g, '');
    const key = req?.nextUrl?.searchParams?.get("key")?.replace(/["\\/]/g, '');

    if(password != process.env.PASSWORD) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

const userDataScript = `Content-Type: multipart/mixed; boundary="//"
MIME-Version: 1.0

--//
Content-Type: text/cloud-config; charset="us-ascii"
MIME-Version: 1.0
Content-Transfer-Encoding: 7bit
Content-Disposition: attachment; filename="cloud-config.txt"

#cloud-config
cloud_final_modules:
- [scripts-user, always]

--//
Content-Type: text/x-shellscript; charset="us-ascii"
MIME-Version: 1.0
Content-Transfer-Encoding: 7bit
Content-Disposition: attachment; filename="userdata.txt"

#!/bin/bash
sudo yum update -y
sudo yum install docker
sudo service docker start 
sudo docker pull axnjr/ignition_wssd:1
sudo docker run -e VALIDATION_TOKEN=${key as string} -p 3000:3000 axnjr/ignition_wssd:1
--//--`;

    const credentials = {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    };

    const ec2 = new EC2Client({
        region: "ap-south-1",
        credentials: credentials,
    });

    const command = new RunInstancesCommand({
        ImageId:"ami-0e1d06225679bc1c5",//"ami-06041499d7ab7c387", 
        InstanceType:"t4g.micro",
        MinCount:1,
        MaxCount:1,
        KeyName:"WSSSharedClusterECS",
        SecurityGroupIds:["sg-0ff0a8d2ad83577c5"],
        SubnetId:"subnet-07d9a1a6ce4f3d551",
        Monitoring:{
            Enabled:true
        },
        UserData:Buffer.from(userDataScript).toString('base64'),
    });

    try {
        const data = await ec2.send(command);
        // console.log(data)
        if(data.Instances) {

            return new NextResponse(JSON.stringify({
                success: true,
                data: data.Instances[0]
            }))
        }
    } catch (error) {
        console.log(error)
        return new NextResponse("ERROR OCCURED !!")
    }
    
}


/**
 * sudo rm -rf /var/lib/cloud/*
sudo cloud-init init
sudo cloud-init modules -m final
 */
/**
 * const instanceParams = {
        ImageId: 'ami-05295b6e6c790593e', // Replace with the AMI ID you want to use
        InstanceType: 't2.micro',
        KeyName: 'WSSSharedClusterECS',
        MinCount: 1,
        MaxCount: 1,
        UserData: Buffer.from(userDataScript).toString('base64'), // Encode your user data script
    };

    const ec2 = new AWS.EC2({
        region: "ap-south-1",
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });

    try {
        // @ts-ignore
        const data = await ec2.runInstances({
            ...instanceParams,
            SecurityGroupIds:["sg-0ff0a8d2ad83577c5"],
            SubnetId:"subnet-07d9a1a6ce4f3d551",
            BlockDeviceMappings:{
                SnapShotId:"snap-0be91b48311219ca8",
                VirtualName:"ignitionwssdfromtemplate"
            }
        }).promise();
        if(data.Instances) {
            console.log(data.Instances[0].InstanceId)
            return new NextResponse(JSON.stringify({
                success: true,
                data: data.Instances[0].InstanceId
            }))
        }
    } catch (error) {
        console.log(error)
        return new NextResponse("ERROR OCCURED !!")
    }

 */