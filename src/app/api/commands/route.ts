// import { SSMClient, SendCommandCommand, DescribeInstanceInformationCommand, GetCommandInvocationCommand } from "@aws-sdk/client-ssm";
import { credentials, getIpAddress } from "@/lib/server-utils";
import { NextRequest, NextResponse } from "next/server";
import { SSHCommandConfig } from "@/types/types";

// const SSM = new SSMClient({
//     region: "ap-south-1",
//     credentials: credentials
// })

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


//     const sshConnection = new SSH({
//         host:commandConfig.instanceIp,
//         user:"ec2-user",
//         key: ``
//     })

// console.log("Connection succesfull:", sshConnection)

// const commandResult: { com: string; }[] = [];

// commandConfig.commands.map(com => {
//     sshConnection.exec(com, {
//         err: function(stderr) { console.log(stderr); commandResult.push({com: stderr}) },
//         out: function(stdout) { console.log(stdout); commandResult.push({com: stdout}) }
//     }).start()
// })

// console.log(commandResult)
// return NextResponse.json(commandResult, {status:200})


// export async function POST(req: NextRequest){

//     const commandConfig: SSMCommandConfig = await req.json()
//     console.log("Waiting for instance to catch-up !")

//     // await sleep(3000);
//     // const ip = await getIpAddress(commandConfig.instanceId)
//     // console.log("IP ADDRESS RECIVED: ", ip)

//     while (true) {
//         const command = new DescribeInstanceInformationCommand({
//             InstanceInformationFilterList:[{
//                 key:"InstanceIds",
//                 valueSet:[commandConfig.instanceId]
//             }]
//         });

//         const ssmResponse = await SSM.send(command);

//         if (ssmResponse.InstanceInformationList) {
//             const instanceInfo = ssmResponse.InstanceInformationList[0];
//             if(instanceInfo){
//                 console.log(`SSM status: ${instanceInfo.PingStatus}`);
//                 if (instanceInfo.PingStatus === 'Online') break;
//                 else {
//                     console.log('Instance not registered with SSM yet.');
//                 }
//             }
//         }

//         await sleep(5000); // Wait for 10 seconds before checking again
//     }

//     console.log("Instance connected and configured !")

//     const command = new SendCommandCommand({
//         InstanceIds:[commandConfig.instanceId],
//         DocumentName:"AWS-RunShellScript",
//         Parameters: {
//             commands: [
//                 ...commandConfig.commands
//             ]
//         }
//     });

//     console.log("EXECUTING COMMANDS ON EC2 !!")
//     const response = await SSM.send(command);
//     console.log(response.Command?.Status)
//     return NextResponse.json({commandId: response.Command?.CommandId}, {status:200})
// }

// export async function GET(req: NextRequest){
//     // console.log("")
//     const commandId = req.nextUrl?.searchParams?.get("commandId")?.replace(/["\\/]/g, '')
//     const instanceId = req.nextUrl?.searchParams?.get("instanceId")?.replace(/["\\/]/g, '')
//     const command = new GetCommandInvocationCommand({
//         CommandId:commandId,
//         InstanceId: instanceId
//     })
//     const response = await SSM.send(command);
//     return NextResponse.json({logs:response, status: response.Status}, {status:200})
// }