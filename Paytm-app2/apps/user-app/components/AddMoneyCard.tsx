"use client"

import { useCreateOnRampTransaction } from "@/lib/hooks/useCreateOnRampTransaction"
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
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name);
    const [amount, setAmount] = useState("");
    
    // Call the hook at component level - this returns an object with create function and loading state
    const { create: createTransaction, loading } = useCreateOnRampTransaction();

    const handleAddMoney = async () => {
        if (!amount || !provider) {
            alert("Please enter amount and select a bank");
            return;
        }

        // Call the create function returned by the hook
        const result = await createTransaction(provider, Number(amount) * 100);
        
        if (result.message === "On Ramp Transaction added") {
            // Redirect to bank on success
            window.location.href = redirectUrl || "";
        } else {
            alert(result.message || "Error creating transaction");
        }
    };

    return <div>
        <Card title="Add Money">
            <div className="w-full">
                <div>
                    <TextInput placeholder={"Amount"} label={"Amount"} onChange={setAmount} />
                </div>
                <div>
                    <div className="py-4 text-left">Bank</div>
                    <div>
                        <Select onSelect={(value) => {
                            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "");
                            setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name);
                        }} options={SUPPORTED_BANKS.map(x => ({
                            key: x.name,
                            value: x.name
                        }))} />
                    </div>
                </div>
                <div>
                    <Button 
                        onClick={handleAddMoney}
                    >
                        {loading ? "Processing..." : "Add Money"}
                    </Button>
                </div>
            </div>
        </Card>
    </div>
}