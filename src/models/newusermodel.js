const mongoose= require('mongoose')

const newUserSchema = new mongoose.Schema(
{
    firstName:String,
    lastName:String,
    age:Number,
    mobile:String,
    emailId:String,
    password:String,
    gender:{type:String,
      enum:['male','female','other']},
      isDeleted:
{
        type:Boolean,
        default:false
},

},{timestamps:true});
module.exports=mongoose.model("newUser",newUserSchema)