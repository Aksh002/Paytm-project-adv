"use client"

import { Button } from "@repo/ui/components/Button"
import { Card } from "@repo/ui/components/Card"
import { Select } from "@repo/ui/components/Selelct"
import { TextInput } from "@repo/ui/components/TextInput"
import { useState } from "react"


const SUPPORTED_BANKS = [{
        name: "HDFC Bank",
        redirectUrl: "https://netbanking.hdfcbank.com"
    }, {
        name: "Axis Bank",
        redirectUrl: "https://www.axisbank.com/"
    }];


export const AddMoneyCard = () =>{
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider , setProvider] = useState(SUPPORTED_BANKS[0]?.name);
    const [amount,setAmount] = useState("");

    function onRampTransaction(provider:string,amount:number){                          // This fxn purpose is to trigger this hook
        //useOnRampTransaction(provider ?? "", amount);                                   
    }
    
    return <div>
        <Card title="Add Money">
            <div className="w-full">
                <div>
                    <TextInput placeholder={"Amount"} label={"Amount"} onChange={setAmount}></TextInput>
                </div>
                <div>
                    <div className="py-4 text-left">Bank</div>
                    <div>
                        <Select onSelect={(value) =>{
                            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "");
                            setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name);
                        }} options={SUPPORTED_BANKS.map(x => ({
                            key: x.name,
                            value: x.name
                            })
                        )}></Select>
                    </div>
                </div>
                <div>
                    <Button onClick={async() =>{
                        onRampTransaction(provider ?? "", Number(amount) * 100);
                        //await createOnRampTransaction(provider ?? "", Number(amount) * 100);              // Never call a server action in a client component;    // Its will possibly work, but not a good practice
                        window.location.href = redirectUrl || "";
                    }}>
                        Add Money
                    </Button>
                </div>
            </div>
        </Card>
    </div>
}