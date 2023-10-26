import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import { fileURLToPath } from "url";
const __dirname=dirname(fileURLToPath(import.meta.url));

const app=express();
const port=3000;

var IsUserAuthorized=false;

app.use(bodyParser.urlencoded({extended:true}));
function passwordCheck(req,res,next){
    const passsword=req.body["password"];
    if(passsword==="ILoveProgramming"){
        IsUserAuthorized=true;
    }
    next();
}
app.use(passwordCheck);
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html");
});
app.post("/check",(req,res)=>{
   if(IsUserAuthorized){
    res.sendFile(__dirname+"/public/secret.html");
   }
   else{
    res.redirect("/");
   }
});
app.listen(port,()=>{
    console.log(`Server started Running on port ${port}`);
});