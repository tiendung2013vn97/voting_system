const express=require("express")
const http=require("http")
const cors=require("cors")
const bodyParser=require("body-parser")

const app=express()
app.use(cors())
app.use(bodyParser())
app.use(express.urlencoded())

app.use("/api/user",require("./modules/user/router"))
app.use("/api/vote",require("./modules/vote/router"))


const server=http.createServer(app)
server.listen(3001,err=>{
    if(err){
        console.log("ERROR when init app on PORT 3001")
    }else{
        console.log("Server is running on PORT 3001")
    }
})

