// VERSION: 29 with new KeyPair & debuging disabled & node-ssh with error handling
import { NodeSSH } from "node-ssh"
const ssh = new NodeSSH();
export async function handler(event) {
    const body = JSON.parse(event.body)
    const host = body.instanceIp;
    const privateKey = ``; // NOT WORKING PASSED THE REAL KEY AS IT IS IN LAMBDA
    const script = body.script;
    try {
        const { stdout, stderr } = await runSSHScript(host, script, privateKey);
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Script executed successfully',
                stdout: stdout,
                stderr: stderr
            }, 2, null)
        };
    } catch (error) {
        console.error('Error running SSH command:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error executing script',
                error: error.message
            })
        };
    }
}
async function runSSHScript(ip, script, privateKey) {
    // console.log(privateKey)
    try {
        await ssh.connect({
            host: ip,
            username: 'ec2-user',
            privateKey: privateKey
        });
        console.log('Client :: ready');
        const result = await ssh.execCommand(script, {
            cwd:"/"
        });
        console.log('STDOUT: ' + result.stdout);
        console.log('STDERR: ' + result.stderr);
        ssh.dispose();
        return { stdout: result.stdout, stderr: result.stderr };
    } catch (err) {
        console.error('SSH Connection Error:', err);
        throw err;
    }
}

// let t = await handler({
//     body:{
//         instanceIp:"13.235.24.46",
//         instanceId:"rec_3we45r6jk",
//         script:
// `sudo yum update -y
// sudo yum install git -y
// sudo yum install nodejs -y npm
// sudo git clone -v https://github.com/Axnjr/starter-express-api radha/ec2
// cd radha/ec2
// sudo npm install
// sudo npm install -g forever
// sudo forever start index.js`}
// })
// console.log(t)
// return new Promise((resolve, reject) => {
//     const conn = new Client();
//     let stdout = '';
//     let stderr = '';
//     conn.on('ready', () => {
//         console.log('Client :: ready');
//         stdout += "Connected with remote VM ! \n"
//         conn.exec(script, (err, stream) => {
//             if (err) {
//                 reject(err);
//                 return;
//             }
//             stream.on('close', (code, signal) => {
//                 console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
//                 conn.end();
//                 resolve({ stdout, stderr });
//             }).on('data', (data) => {
//                 console.log('STDOUT: ' + data);
//                 stdout += data;
//             }).stderr.on('data', (data) => {
//                 console.log('STDERR: ' + data);
//                 stderr += data;
//             }).on('banner', (message) => {
//                 console.log('SSH Banner:', message);
//             })
//             .on('greeting', (message) => {
//                 console.log('SSH Greeting:', message);
//             })
//             ;
//         });
//     }).connect({
//         host: ip,
//         port: 22,
//         username: "ec2-user",
//         privateKey: privateKey,
//         // debug: (info) => {
//         //     console.log("DEBUG:", info)
//         // }
//     });
// });