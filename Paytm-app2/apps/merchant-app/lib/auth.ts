import prisma  from "@repo/db/client"
import bcrypt from "bcryptjs"
import CredentialsProvider  from "next-auth/providers/credentials"
import GoogleProvider  from "next-auth/providers/google"

export const authOptions = {
    providers:[
        CredentialsProvider({
            name:'Credentials',
            credentials:{
                number: { label : "Phone number" , type : "text" , placeholder : "1234567890"},
                email: { label : "Email" , type : "email" , placeholder : "example@gmail.com"},
                password: { label : "Password" , type : "password" , placeholder : "******"}
            },
            async authorize(credentials:any){
                // ZOD VALIDATION logic 
                // OTP VALIDATION Logic 
                console.log("👉 Received credentials:", credentials);
                const hashedpswd = await bcrypt.hash(credentials.password,10);
                const existingMerchant = await prisma.merchant.findFirst({
                    where : {
                        number : credentials.number
                    }
                })
                if (existingMerchant){
                    const pswdValidation = await bcrypt.compare(credentials.password,existingMerchant.password)
                    if (pswdValidation){
                        return {
                            id : existingMerchant.id.toString(),
                            name : existingMerchant.name,
                            email : existingMerchant.number
                        }
                    }
                    else
                        return null                                                          
                }
                try{
                    const merchant = await prisma.merchant.create({
                        data:{
                            number : credentials.number,
                            password : hashedpswd,
                            email: credentials.email,
                            auth_type: "Google" // or the appropriate value for your use case
                        }
                    })
                    return {
                        id :  merchant.id.toString(),
                        name : merchant.name || "Merchant", // idk where this name is coming from so far
                        email : merchant.email
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
        })
    ],
    secret : process.env.NEXTAUTH_SECRET || "secret",
    callbacks : {
        async session({ token,session }:any){
            session.merchant.id=token.sub

            return session;
        }
    }
}