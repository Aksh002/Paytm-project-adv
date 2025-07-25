"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";

export async function p2pTransfers({ to , amount }:{ to: string , amount:number}) {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    if (!from){
        return {
            message: "Error while sending"
        }
    }
    const toUser = await prisma.user.findFirst({
        where:{
            number:to
        }
    })
    if (!toUser){
        return {
            message: "No User found"
        }
    }

    await prisma.$transaction(async (tx)=>{
        const fromBal = await tx.balance
    })
}