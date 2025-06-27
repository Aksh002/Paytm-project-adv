import { Card } from "@repo/ui/components/Card"

export const OnRampTransaction = ({
    transactions
}:{
    transactions:{
        time:Date,
        amount:number,
        status:string,              // Can type of status be more specific
        provider:string
    }[]
})=>{
    if (!transactions.length){
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent Transactions
            </div>
        </Card>
    }
    return <div>
        <Card title="Recent Transactions">
            <div className="pt-2">
                {transactions.map((t) => (
                    <div key={t.time.toISOString() + t.amount + t.status + t.provider} className="flex justify-between">
                        <div>
                            <div className="text-sm">
                                Received INR
                            </div>
                            <div className="text-slate-600 text-xs">
                                {t.time.toDateString()}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            + Rs {t.amount / 100}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    </div>
}