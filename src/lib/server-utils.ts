// import { XataClient } from "@/xata";
import { EC2Client, DescribeInstancesCommand } from "@aws-sdk/client-ec2";
import { redirect } from "next/navigation";
import { cache } from "react";

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

// export const initDash = cache(async (params: { project: string }) => {
//     const xata = new XataClient();
//     let res: unknown = await xata.db.user_projects.filter({ id: params.project }).getFirst()

//     if (res == null) { redirect("/overview") } // @ts-ignore
//     let project: ProjectSpecificDataType = {...res};

//     if (project.ip == null || project.ip == undefined) {
//         console.log("Project under deployemnt ! fetching IpAddress | Connecting to remote compute")
//         let ip = await getIpAddress(project.instance_metadata?.instanceId)
//         console.log(ip)
//         if (ip != "error") {
//             await xata.db.user_projects.update(project.id, { "ip": ip })
//             project.ip = ip as string;
//         }
//     }
//     // console.log("DB FETCHED !")
//     return project
// })