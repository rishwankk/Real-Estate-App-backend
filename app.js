import express from "express"
import authRoute from "./router/auth.router.js"
import cookieParser from "cookie-parser"

const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use("/api/auth",authRoute)




app.listen(3000,()=>{
    console.log("running")
})

