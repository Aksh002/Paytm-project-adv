import express from 'express';
import db from "@repo/db/client"
const app = express();

app.use(express.json());

app.post("/hdfcWebhook",async (req,res)=>{
    // Add ZOD VALIDATION here

    // CHeck if the request actually came from hdfc server, use a webhook secret here
    const paymentInfo:{
        token : string,
        userId : string,
        amount : string
    } = {
        token : req.body.token,
        userId : req.body.userId,
        amount : req.body.amount
    }
    // update balance in db and txn
    try {
        await db.$transaction(async (tx) => {
            const onRampTransaction = await tx.onRampTransactions.findUnique({
                where: {
                    token: paymentInfo.token
                }
            });

            if (onRampTransaction?.status !== 'Processing') {
                throw new Error("Transaction not in processing state or not found");
            }

            await tx.balance.update({
                where: {
                    userId: Number(paymentInfo.userId)
                },
                data: {
                    amount: {
                        increment: Number(paymentInfo.amount)
                    }
                }
            });

            await tx.onRampTransactions.update({
                where: {
                    token: paymentInfo.token,
                },
                data: {
                    status: "Success",
                }
            });
        });

        res.json({
            "message": "Captured"
        })
    } catch (error) {
        console.log(`Webhook Error in updating balance or OnRampTransaction tables :- ${error}`);
        res.status(411).json({
            message : "Error while processing webhook",
            error : error
        })
    }
})


app.listen(3003,()=>{
    console.log("Bank-webhook listening on");
})
