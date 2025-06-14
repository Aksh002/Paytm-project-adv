import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async () =>{
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({
            message: "Not authenticated"
        }, {
            status: 401
        });
    }
    if (session.merchant){
        return NextResponse.json({
            merchant : session.merchant
        })
    }
    return NextResponse.json({
        message : "You are not logged in "
    },{
        status: 403
    })
}