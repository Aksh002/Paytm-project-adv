import { AddMoneyCard } from "@/components/AddMoneyCard";
import { BalanceCard } from "@/components/BalanceCard";
import { OnRampTransaction } from "@/components/OnRampTransaxion";
import { authOptions } from "@/lib/auth"
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth"
import { getBalance } from "@/lib/data/getBalance";
import { getOnRampTransactions } from "@/lib/data/getOnRampTransaction";



export default async function Transfer(){
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();
    return <div>
        <div>
            Transfer
        </div>
        <div>
            <div>
                <AddMoneyCard></AddMoneyCard>
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked}></BalanceCard>
                <div>
                    <OnRampTransaction transactions={transactions}></OnRampTransaction>
                </div>
            </div>
        </div>
    </div>
}