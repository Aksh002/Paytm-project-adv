"use client"
import { useState } from "react";
import { TextInput } from "@repo/ui/components/TextInput"
import { Button } from "@repo/ui/components/Button";
import { useP2Ptransaction } from "@/lib/hooks/useP2Ptransaction";
import toast from "react-hot-toast";

export const SendCard = () =>{
    const [number , setNumber] = useState("");
    const [amount , setAmount] = useState("");
    const {loading,transaction:p2pTransaction} = useP2Ptransaction();

    async function onClickHandler(){
        if (!number) {
            toast.error("Please enter a number to send to.");
            return;
        }
        if (!amount || Number(amount) <= 0) {
            toast.error("Please enter a valid amount.");
            return;
        }

        const result = await p2pTransaction(number,parseInt(amount));

        if (result?.message === "P2P transaction completed on server"){
            toast.success("Transaction Processed");
        }else{
            toast.error(result.message || ". Transaction Failed.")
        }
    }

    return <div className="flex justify-center w-full h-full bg-transparent items-center">
        <div className="bg-blue-100 px-10 py-20 flex flex-col justify-center max-h-3/6 min-h-1/4 items-center rounded-2xl shadow-xl shadow-black">
            <div className="">
                <h2 className="text-2xl">SEND</h2>
                <div className="space-y-4 flex flex-col items-center">
                    <TextInput placeholder={"Number"} label="Number" onChange={(value)=>{
                        setNumber(value);
                    }}></TextInput>

                    <TextInput placeholder={"Amount"} label="Amount" onChange={(value)=>{
                        setAmount(value);
                    }}></TextInput>

                    <Button  onClick={onClickHandler} disabled={loading}>{loading? "Sending...":"Send"}</Button>
                </div>
            </div>
        </div>
    </div>
}