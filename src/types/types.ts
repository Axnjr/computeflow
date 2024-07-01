export type Project = {
    id: string,
    project_name: string,
    ip: string,
    status: string,
    region: string,
    runtime: string,
    deployed_from: string,
    xata: xata,
    instance_metadata: Compute
}

type xata = {
    createdAt: string,
    updatedAt: string,
    version: number
}

export type UserRepo = {
    name: string,
    userId: string,
    url: string,
    pushed_at:string,
    lang: string,
}

export interface ProjectConfigType extends UserRepo {
    region?: string,
    commands: Commands,
    compute: Compute,
    env:string
}

type Commands = {
    rootDir: string,
    buildCommands: string[],
    startCommand: string
}

type Compute = {
    instanceType: string,
    instanceId?: string
}

export const dummyProjectConfig: ProjectConfigType = {
    name: '',
    userId: '',
    url: '',
    pushed_at: '',
    lang: '',
    region: '',
    commands: {
        rootDir: '',
        buildCommands: [],
        startCommand: ''
    },
    compute:{
        instanceType:'',
        // instanceId:''
    },
    env:""
}