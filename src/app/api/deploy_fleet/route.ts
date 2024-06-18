import { NextRequest, NextResponse } from "next/server";
import { EC2Client, RunInstancesCommand } from "@aws-sdk/client-ec2";

export async function GET(req: NextRequest) {

    // const password = req?.nextUrl?.searchParams?.get("password")?.replace(/["\\/]/g, '');
    const url = req?.nextUrl?.searchParams?.get("url")?.replace(/["\\/]/g, '');
    const runCommand = req?.nextUrl?.searchParams?.get("comm")?.replace(/["\\/]/g, '');



}