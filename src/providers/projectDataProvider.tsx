"use client";
import { ProjectSpecificDataType } from "@/types/types";
import { createContext, useContext } from "react";

export const ProjectConfigContext = createContext<ProjectSpecificDataType>({
    id: "",
    project_name: "",
    ip: "",
    runtime: "",
    deployed_from: "",
    status: "",
    region: ""
})

export const useProjectData = () => useContext(ProjectConfigContext)

export const ProjectConfigProvider = ({ children, value }: { children: React.ReactNode, value: string }) => (
    <ProjectConfigContext.Provider value={JSON.parse(value)}>
        {children}
    </ProjectConfigContext.Provider>
);