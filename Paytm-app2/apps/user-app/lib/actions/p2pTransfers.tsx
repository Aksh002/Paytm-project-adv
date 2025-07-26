"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";
import type { Balance } from "@repo/db/gen";

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

    try{
        await prisma.$transaction(async (tx)=>{

            // Normal way:-
            // const fromBalance = await tx.balance.findUnique({
            //     where: { userId: Number(from) },
            // }); 

            //Locking rows wala way:-
            const fromBalance: Balance[] = await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId"=${Number(from)} FOR UPDATE`;
            if (!fromBalance[0] || fromBalance[0].amount < amount) {
                throw new Error('Insufficient funds');
            }

            //await new Promise(r => setTimeout(r, 4000)); If u add this timeout and send 2 request at the same time, check notes for answer


            const fromBal = await tx.balance.update({
                where:{
                    userId: from
                },
                data:{
                    amount:{
                        decrement: amount
                    }
                }
            })

            const toBal = await tx.balance.update({
                where:{
                    userId: toUser.id
                },
                data:{
                    amount:{
                        increment: amount
                    }
                }
            })
        })

        return{
            message: "P2P transaction completed on server"
        }
    }catch(e){
        console.log(`Error doing p2p transaction on server level: ${e}`)
        return{
            message:`Error doing p2p transaction on server level: ${e}`
        }
    }
}