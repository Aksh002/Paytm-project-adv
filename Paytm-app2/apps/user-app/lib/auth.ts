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
                email: { label : "Email" , type : "email" , placeholder : "example@gmail.com"},
                password: { label : "Password" , type : "password" , placeholder : "******"}
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
                if (existingUser){
                    const pswdValidation = await bcrypt.compare(credentials.password,existingUser.password)
                    if (pswdValidation){
                        return {
                            id : existingUser.id.toString(),
                            name : existingUser.name,
                            email : existingUser.number
                        }
                    }
                    else
                        return null
                }
                try{
                    const user = await db.user.create({
                        data:{
                            number : credentials.number,
                            password : hashedpswd
                        }
                    })
                    return {
                        id :  user.id.toString(),
                        name : user.name || "User", // idk where this name is coming from so far
                        email : user.email
                    }
                }catch(e){
                    console.error(e)
                }
                return null
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
    ],
    secret : process.env.NEXTAUTH_SECRET || "secret",
    callbacks : {
        async session({ token,session }:any){
            session.user.id=token.sub

            return session;
        }
    }
}