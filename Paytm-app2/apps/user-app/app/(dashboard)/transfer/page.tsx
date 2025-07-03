import { AddMoneyCard } from "@/components/AddMoneyCard";
import { BalanceCard } from "@/components/BalanceCard";
import { OnRampTransaction } from "@/components/OnRampTransaxion";
import { authOptions } from "@/lib/auth"
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth"
import { getBalance } from "@/lib/data/getBalance";
import { getOnRampTransactions } from "@/lib/data/getOnRampTransaction";
import type { OnRampTransactionType } from "@/lib/data/getOnRampTransaction"; 



export default async function Transfer(){
    const balance = await getBalance();
    const transactions : OnRampTransactionType[] | [{msg:string}] = await getOnRampTransactions();
    return <div>
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold ">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <AddMoneyCard></AddMoneyCard>
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked}></BalanceCard>
                <div className="pt-4">
                    {('msg' in transactions[0]) ? <div>{transactions[0].msg}</div> : <OnRampTransaction transactions={transactions as { time: Date; amount: number; status: string; provider: string; }[]}></OnRampTransaction>}
                </div>
            </div>
        </div>
    </div>
}