import mongoose from "mongoose";
mongoose.connect("mongodb+srv://vivek1_4:vivek9912@cluster0.0ymfu.mongodb.net/?retryWrites=true&w=majority")

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type:String,
        required:true
    }
});
const User = mongoose.model("textMediaUser", userSchema);
export default User;
const postSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
    },
    content:{
        type:String,
        required:true, 
    }

});
export const Post = mongoose.model("textMediaPosts", postSchema);