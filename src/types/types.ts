export type Project = {
    id: string,
    project_name: string,
    ip: string,
    status: string,
    region: string,
    runtime: string,
    deployed_from: string,
    xata: xata
}

type xata = {
    createdAt: string,
    updatedAt: string,
    version: number
}