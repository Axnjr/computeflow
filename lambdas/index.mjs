// VERSION: 17
import { Client } from 'ssh2';

export async function handler(event) {
    const body = JSON.parse(event.body)
    const host = body.instanceIp;
    const username = 'ec2-user';
    const privateKey = process.env.PRIVATE_KEY; // NOT WORKING PASSED THE REAL KEY AS IT IS IN LAMBDA
    const commands = body.commands;
    try {
        const output = await runSSHCommand(host, username, privateKey, commands);
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Commands executed successfully',
                output: output
            })
        };
    } catch (error) {
        console.error('Error running SSH command:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error executing commands',
                error: error.message
            })
        };
    }
}
function runSSHCommand(host, username, privateKey, commands) {
    return new Promise((resolve, reject) => {
        const conn = new Client();
        let result = [];
        conn.on('ready', () => {
            result.push("Connected with remote VM")
            commands.forEach(command => {
                conn.exec(command, (err, stream) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    stream.on('close', () => {
                        conn.end();
                        resolve(result);
                    })
                    .on('data', (data) => {
                        console.log('STDOUT: ' + data);
                        result.push(data)
                    })
                    .stderr.on('data', (data) => {
                        console.log('STDERR: ' + data);
                        result.push(data)
                    });
                });
            });
        })
        .connect({
            host: host,
            port: 22,
            username: username,
            privateKey: privateKey
        });
    });
}