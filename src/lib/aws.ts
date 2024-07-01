import { EC2Client, DescribeInstancesCommand } from "@aws-sdk/client-ec2";

const credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
};

const ec2 = new EC2Client({
    region: "ap-south-1",
    credentials: credentials,
});

export async function getIpAddress(instanceId: string | undefined){
    if(instanceId){
        const command = new DescribeInstancesCommand({
            InstanceIds:[instanceId]
        });
        const response = await ec2.send(command);
        // @ts-ignore
        const instance = response.Reservations[0].Instances[0];
        console.log(instance)
        return instance.PublicIpAddress
    }
    return "InstanceId was undefined !!"
}