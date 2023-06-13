import express from "express";
import auth from "./auth.js";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import cookies from "cookie-parser";
import User from "./models.js";
import {Post} from "./models.js";
import cors from "cors"

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cookies());
app.use(cors())

app.post("/login",async(req,res)=>{
   const {userId,password} = req.body;
   const user = await User.findOne({userId,password});
   if(user){
     const token = jwt.sign({userId},"samplekey");
     res.send({
        token,
        firstName:user.firstName,
        userId:user.userId
    });
   }else{
    res.send("invalid details")
   }
});
app.post("/register",async(req,res)=>{
  const {firstName,lastName,userId,password} = req.body;
  const user = await User.create({firstName,lastName,userId,password});
  const token = jwt.sign({userId:user.userId},"samplekey");
     res.send({token});
});
app.post("/logout",(req,res)=>{
    res.clearCookie("textMediaUserToken");
    res.end();
});
app.get("/posts",auth,async(req,res)=>{    
    const posts = await Post.find();
    res.send(posts);
});
app.get("/getposts/:userId",auth,async(req,res)=>{
    const {userId} = req.params;
    const userPosts = await Post.find({ userId });
    res.send(userPosts);
});
app.post("/addPost",auth,async(req,res)=>{
    const{firstName,lastName,userId} = req.user;
    const{content} = req.body;
    const post = await Post.create({firstName,lastName,userId,content});
    res.send(post);     
})
app.listen(8080,()=>{
    console.log("server running on:\nhttp://localhost:8080");
})