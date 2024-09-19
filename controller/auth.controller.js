
import bcrypt from "bcrypt"
import prisma from "../lib/prisma.js"
export const register=async(req,res)=>{
    const{username,email,password}=req.body
    
    


    try {
        
        const hashedPassword=await bcrypt.hash(password,10)
           console.log(hashedPassword)
     
           const newUser=await prisma.user.create({
             data:{
                 username,
                 email,
                 password:hashedPassword
             }
           })
     
           console.log(newUser)
           

  
    res.status(200).json({message:"user logged sucessfully"})
    
    
    
         
    } catch (error) {

        console.log(error.message)
        res.status(500).json({message:"something went wrong"})
        
    }
   
}
export const login=async (req,res)=>{
    const{username,password}=req.body

    try {
        

        const user=await prisma.user.findUnique({where:{username}}) 
        if(!user){
            return res.status(401).json({message:"user not found"})
        }
        
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).json({message:"invalid password"})
        }
        
        // res.setHeader("set-Cookie","test="+"myValue").json({message:"success"})
        res.cookie("test","myValue",{
            httpOnly:true,
            //secure:true,
            maxAge:1000*60*60*24*7

        }).status(200).json({message:"Login Succesfull"})
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:"something went wrong"})
        
    }


}

export const logout=(req,res)=>{
    console.log("fff")

}

