import { XataClient } from "@/xata";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const uid = req?.nextUrl?.searchParams?.get("uid")?.replace(/["\\/]/g, '');
    const xata = new XataClient();
    // console.log(uid)
    const page = await xata.db.user_projects.select([
        "project_name",
        "ip",
        "status",
        "region",
        "runtime",
    ]).filter({ 
        "user.email": uid 
    }).getAll();
       
    console.log(page);
    return new NextResponse(JSON.stringify(page), {status:200});
}