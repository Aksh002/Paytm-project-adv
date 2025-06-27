"use server";       // SERVER ACTION

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRampTransaction(provider:string,amount:number){
    const session = await getServerSession(authOptions);
    const userId = session.user.id;

    const token = Math.random().toString();             //TEMP FIX 
    // Here is where BANK APIs are needed 
    // Token usually looks like this:-
    // const token = await axios.get("https://api.hdfcbank.com/getToken",{
    //     amount:amount
    // })   // THis token should be fetched from the banking api(which is not avialable , isliye bc mock api banane padegi), 


    if (!userId){
        console.log("User not found");
        return {
            message : "User not authenticated"
        }
    }
    try{
        await prisma.onRampTransactions.create({
            data:{
                userId:Number(userId),
                amount:amount,
                status:"Processing",
                startTime: new Date(),
                provider:provider,
                token:token
            }
        })
        return {
            message:"On Ramp Transaction added"
        }
    }catch(error){
        return{
            message:`Error while onRam:- ${error}`
        }
    }
}