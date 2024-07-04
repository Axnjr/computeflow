import { NextRequest, NextResponse } from "next/server";
import { EC2Client, RunInstancesCommand, DescribeInstancesCommand, CreateSecurityGroupCommand, AuthorizeSecurityGroupIngressCommand } from "@aws-sdk/client-ec2";
import { ProjectConfigType } from "@/types/types";
import { credentials } from "@/lib/server-utils";

const ec2 = new EC2Client({
    region: "ap-south-1",
    credentials: credentials,
});

export async function POST(req: NextRequest){
    const projectConfig: ProjectConfigType = await req.json()
    // const userDataScript = getUserDataScript(projectConfig.url, projectConfig.name, "sudo yum install -y nodejs npm")
    // console.log(userDataScript)

    const userDataScript = 
`Content-Type: multipart/mixed; boundary="//"
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
sudo yum install git -y
sudo yum install -y nodejs npm
sudo mkdir radhakrishn
echo "RADHA RADHA KRISHN KRISHN"
--//--
`;

    const command = new RunInstancesCommand({
        ImageId:"ami-0e1d06225679bc1c5",//"ami-06041499d7ab7c387", 
        InstanceType:"t2.micro",
        MinCount:1,
        MaxCount:1,
        KeyName:"computeflowSSH",
        SecurityGroupIds:["sg-0344c5dc050696095"],
        SubnetId:"subnet-0717a6882188d6909",
        Monitoring:{
            Enabled:true,
        },
        UserData:Buffer.from(userDataScript).toString('base64'),
        IamInstanceProfile:{
            Name:"RoleToExecuteCommandsOnEC2"
        }
    });

    try {
        const data = await ec2.send(command);
        // console.log(data)
        if(data.Instances) {
            return NextResponse.json({ instanceId: data?.Instances[0].InstanceId }, {status: 200})
        }
    }
    catch(err) {
        console.log(err)
        return new NextResponse(JSON.stringify(err), {status:500})
    }
}

export async function GET(req: NextRequest) {

    // const password = req?.nextUrl?.searchParams?.get("password")?.replace(/["\\/]/g, '');
    const url = req?.nextUrl?.searchParams?.get("url")?.replace(/["\\/]/g, '');
    const runCommand = req?.nextUrl?.searchParams?.get("comm")?.replace(/["\\/]/g, '');

    // if(password != process.env.PASSWORD) {
        // return new NextResponse("Unauthorized", { status: 401 });
    // }

const userDataScript = `#!/bin/bash
sudo yum update -y
sudo yum install -y docker
sudo service docker start
sudo docker pull yeasy/simple-web
sudo docker run -p 80:80 yeasy/simple-web:latest
`;

    
    const command = new RunInstancesCommand({
        ImageId:"ami-0e1d06225679bc1c5",//"ami-06041499d7ab7c387", 
        InstanceType:"t2.micro",
        MinCount:1,
        MaxCount:1,
        KeyName:"WSSSharedClusterECS",
        SecurityGroupIds:["sg-057a4f9af73086457"],
        SubnetId:"subnet-0717a6882188d6909",
        Monitoring:{
            Enabled:true,
        },
        UserData:Buffer.from(userDataScript).toString('base64'),
    });

    try {
        const data = await ec2.send(command);
        // console.log(data)
        if(data.Instances) {
            let VMDetails;

            if(data.Instances[0].InstanceId){
                const command = new DescribeInstancesCommand({InstanceIds:[data.Instances[0].InstanceId]});
                VMDetails = await ec2.send(command);
                console.log(VMDetails)
            }

            return new NextResponse(JSON.stringify({
                success: true,
                latest:true,
                DETAILS:VMDetails,
                data: data.Instances[0],
            }))
        }
    } catch (error) {
        console.log(error)
        return new NextResponse("ERROR OCCURED !!")
    }
    
}

/**
 * PROJECT DEPLOYMENT FLOW:
    * Will deploy an base machine with user's runtime & git installed
    * Will return the instanceId back to the client / user device
    * Client will fetch instance details using the instanceId
    * Client will get the public ip address of the machine
    * So client would
/*/
// sudo yum install git -y
// git —version

// git clone ${projectConfig.url} /home/ec2-user/${projectConfig.name}
// cd /home/ec2-user/${projectConfig.name}//${projectConfig.commands.rootDir}
// ${projectConfig.commands.buildCommands}
// ${projectConfig.commands.startCommand}
