"use client"

import React from "react"


export const Card = ({
    title,
    children
}:{
    title:string;
    children?:React.ReactNode;
}) =>{

    return <div>
        <div className="border p-4">
            <h1 className="text-xl border-b pb-2">
                {title}
            </h1>
            <p>
                {children}
            </p>
        </div>
    </div>
}