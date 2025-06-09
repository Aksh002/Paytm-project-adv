import db from "@repo/db/client"
import bcrypt from "bcryptjs"
import CredentialsProvider  from "next-auth/providers/credentials"
import GoogleProvider  from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
    providers:[
        CredentialsProvider({
            name:'Credentials',
            credentials:{
                phone: { label : "Phone number" , type : "text" , placeholder : "1234567890"},
                password: { label : "Password" , type : "password" , placeholder : "******"},
                email: { label : "Email" , type : "email" , placeholder : "example@gmail.com"}
            },
            async authorize(credentials:any){
                // ZOD VALIDATION logic 
                // OTP VALIDATION Logic 
                const hashedpswd = await bcrypt.hash(credentials.password,10);
                const existingUser = await db.user.findFirst({
                    where : {
                        number : credentials.number
                    }
                })
            }
        }),
        GoogleProvider({
            clientId : process.env.GOOGLE_ID || "",
            clientSecret : process.env.GOOGLE_CLIENT_SECRET || ""
        }),
        GithubProvider({
            clientId : process.env.GITHUB_ID || "",
            clientSecret : process.env.GITHUB_CLIENT_SECRET || ""
        })
    ]
}