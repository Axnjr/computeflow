import { EC2Client, DescribeInstancesCommand } from "@aws-sdk/client-ec2";

export const credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
};

const ec2 = new EC2Client({
    region: "ap-south-1",
    credentials: credentials,
});

export async function getIpAddress(instanceId: string | undefined){
    console.log("Fetching ip address")
    if(instanceId){
        const command = new DescribeInstancesCommand({
            InstanceIds:[instanceId]
        });
        const response = await ec2.send(command);
        if(!response.Reservations){
            console.log("ERROR INSTANCE NOT FOUND FOR id:", instanceId)
            return "error"
        }
        const instance = response.Reservations?.[0]?.Instances?.[0];
        // console.log(instance)
        return instance ? instance.PublicIpAddress : "error"
    }
    console.log("InstanceId was undefined !!")
    return "456g7h8jk9l"
}

export function getUserDataScript(url: string, name: string, languageInstallationCommand: string){
    const projectType = url.includes("github") ? "git" : "docker"
    const runtimeComm = 
        projectType
            ? 
        `sudo yum install git -y` 
            : 
        `sudo yum install docker -y
        sudo systemctl start docker`
    ;

    return `
Content-Type: multipart/mixed; boundary="//"
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
${runtimeComm}
${languageInstallationCommand}
sudo mkdir radhakrishn
--//--`;
}
