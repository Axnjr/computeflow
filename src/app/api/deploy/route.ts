/**
 * PROJECT DEPLOYMENT FLOW:
    * Will deploy an base machine with user's runtime & git installed
    * Will return the instanceId back to the client / user device
    * Client will fetch instance details using the instanceId
    * Client will get the public ip address of the machine
    * So client would
/*/









import { NextRequest, NextResponse } from "next/server";
import { EC2Client, RunInstancesCommand, DescribeInstancesCommand } from "@aws-sdk/client-ec2";
import { ProjectConfigType } from "@/types/types";

const credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
};

const ec2 = new EC2Client({
    region: "ap-south-1",
    credentials: credentials,
});

export async function POST(req: NextRequest){
    const projectConfig: ProjectConfigType = await req.json()
    console.log(projectConfig)

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
/bin/echo "Hello World" >> /tmp/testfile.txt

#!/bin/bash
yum install -y awslogs
instance_id=$(curl -s http://169.254.169.254/latest/meta-data/instance-id)
sudo mkdir -p /opt/aws/amazon-cloudwatch-agent/etc
sudo tee /opt/aws/amazon-cloudwatch-agent/etc/amazon-cloudwatch-agent.json > /dev/null <<'EOF'
{
    "agent": {
        "metrics_collection_interval": 60,
        "run_as_user": "root"
    },
    "logs": {
        "logs_collected": {
            "files": {
                "collect_list": [
                    {
                        "file_path": "/var/log/messages",
                        "log_group_class": "STANDARD",
                        "log_group_name": "computeflowuserlogs",
                        "log_stream_name": "{instance_id}",
                        "retention_in_days": 7
                    }
                ]
            }
        }
    },
    "metrics": {
        "aggregation_dimensions": [
            [
                "InstanceId"
            ]
        ],
        "metrics_collected": {
            "cpu": {
                "measurement": [
                    "cpu_usage_idle",
                    "cpu_usage_iowait",
                    "cpu_usage_user",
                    "cpu_usage_system"
                ],
                "metrics_collection_interval": 60,
                "resources": [
                    "*"
                ],
                "totalcpu": false
            },
            "disk": {
                "measurement": [
                    "used_percent",
                    "inodes_free"
                ],
                "metrics_collection_interval": 60,
                "resources": [
                    "*"
                ]
            },
            "diskio": {
                "measurement": [
                    "io_time"
                ],
                "metrics_collection_interval": 60,
                "resources": [
                    "*"
                ]
            },
            "mem": {
                "measurement": [
                    "mem_used_percent"
                ],
                "metrics_collection_interval": 60
            },
            "statsd": {
                "metrics_aggregation_interval": 60,
                "metrics_collection_interval": 60,
                "service_address": ":8125"
            },
            "swap": {
                "measurement": [
                    "swap_used_percent"
                ],
                "metrics_collection_interval": 60
            }
        }
    }
}
EOF

sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -c file:/opt/aws/amazon-cloudwatch-agent/etc/amazon-cloudwatch-agent.json -s
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -s -c ssm:AmazonCloudWatch-linux



sudo yum install git -y
mkdir yakshit
sudo yum install -y nodejs npm 
mkdir radhakrishn
git clone ${projectConfig.url} /home/ec2-user/${projectConfig.name}
cd /home/ec2-user/${projectConfig.name}//${projectConfig.commands.rootDir}
sudo ${projectConfig.commands.buildCommands}
sudo ${projectConfig.commands.startCommand}
--//--
`;

// sudo yum install git -y
// git —version

// git clone ${projectConfig.url} /home/ec2-user/${projectConfig.name}
// cd /home/ec2-user/${projectConfig.name}//${projectConfig.commands.rootDir}
// ${projectConfig.commands.buildCommands}
// ${projectConfig.commands.startCommand}

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
        // IamInstanceProfile:{
        //     Name:"CloudWatchAgentServerRole"
        // }
    });

    try {
        const data = await ec2.send(command);
        // console.log(data)
        if(data.Instances) {
            return new NextResponse(JSON.stringify({
                instanceId: data?.Instances[0].InstanceId,
                instanceMetadata: data.Instances[0]
            }))
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