"use client";
import { ProjectSpecificDataType } from "@/types/types";
import { createContext } from "react";

export const ProjectConfigContext = createContext<ProjectSpecificDataType>({
    id:"",
    project_name:"",
    ip:"",
    runtime:"",
    deployed_from:"",
    status: "",
    region:""
})