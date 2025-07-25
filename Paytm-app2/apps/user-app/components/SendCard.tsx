"use client"
import { useState } from "react";
import { TextInput } from "@repo/ui/components/TextInput"
import { Button } from "@repo/ui/components/Button";

export const SendCard = () =>{
    const [number , setNumber] = useState("");
    const [amount , setAmount] = useState("");
    return <div className="flex justify-center w-full h-full bg-amber-300 items-center">
        <div className="bg-green-500 px-10 py-20 flex flex-col justify-center max-h-3/6 min-h-1/4 items-center rounded-2xl">
            <div className="">
                <h2 className="text-2xl">SEND</h2>
                <div className="space-y-4 flex flex-col items-center">
                    <TextInput placeholder={"Number"} label="Number" onChange={(value)=>{
                        setNumber(value);
                    }}></TextInput>

                    <TextInput placeholder={"Amount"} label="Amount" onChange={(value)=>{
                        setAmount(value);
                    }}></TextInput>

                    <Button onClick={()=>[
                        
                    ]}>Send</Button>
                </div>
            </div>
        </div>
    </div>
}