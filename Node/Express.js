const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT;
const APIKey = process.env.APIKEY;
app.use(express.json());
app.use(cors());

app.post("/", (req, resp) =>{
   const message = req.body.message;
   resp.send({"Name":message+"hi"});
})

app.post("/AI", async(req, resp)=>{
   // console.log(req.body.message);
    try{
        const message = req.body.message;
        console.log(message);
        const genAI = new GoogleGenerativeAI(APIKey);
        // const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro"});
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview"});
        const result = await model.generateContent(message);
       // resp.send(result.response.text());
       console.log("Working");
       resp.send(result);
       
    //console.log(result.response.text());
    }
    catch(err){
        console.log("Error", err);
        resp.send("Error : " +err);
    }
})


app.listen(PORT, ()=>{
    console.log("Server is Running in Port " + PORT);
})