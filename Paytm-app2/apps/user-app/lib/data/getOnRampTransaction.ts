import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";


export type OnRampTransactionType ={
    time: Date;
    amount: number;
    status: string;             // TODO:- Need to think of a correct type fpr this 
    provider: string;
} | {
    msg :string
}
export async function getOnRampTransactions(): Promise<OnRampTransactionType[]> {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id){
        return [{
            msg : "You are not logged in"
        }]
    }
    const txns = await prisma.onRampTransactions.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    console.log(txns);
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}