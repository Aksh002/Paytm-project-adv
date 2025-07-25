import { Card } from "@repo/ui/components/Card"

export const OnRampTransaction = ({
    transactions
}:{
    transactions:
        | {
            time: Date;
            amount: number;
            status: string; // Can type of status be more specific
            provider: string;
        }[]
        | [{ msg: string }]
}) => {
    if (!transactions.length) {
        return (
            <Card title="Recent Transactions">
                <div className="text-center pb-8 pt-8">
                    No Recent Transactions
                </div>
            </Card>
        );
    } else if ("msg" in transactions[0]) {
        return (
            <Card title="Recent Transactions">
                <div className="text-center pb-8 pt-8">
                    {(transactions[0] as { msg: string }).msg}
                </div>
            </Card>
        );
    }
    // At this point, transactions is an array of transaction objects
    return (
        <div>
            <Card title="Recent Transactions">
                <div className="pt-2">
                    {(transactions as {
                        time: Date;
                        amount: number;
                        status: string;
                        provider: string;
                    }[]).map((t) => (
                        <div
                            key={
                                t.time.toISOString() +
                                t.amount +
                                t.status +
                                t.provider
                            }
                            className="flex justify-between"
                        >
                            <div>
                                <div className="text-sm">
                                    <span>{t.status == "Success" && 
                                        <span>Recieved </span>
                                    }</span>

                                    <span>{t.status == "Processing" && 
                                        <span>Processing OnRamp </span>
                                    }</span>
                                    <span>{t.status == "Failure" && 
                                        <span>Faiure OnRamp </span>
                                    }</span>

                                    <span>INR</span>
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
    );
}