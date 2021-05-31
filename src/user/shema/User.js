
const {Schema, model} = require("mongoose")

const UserSchema = new Schema({
    _id:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    imageUrl:String,
    name:{
        type:String,
        required:true
    }
}, { timestamps: true })

 module.exports = model("User", UserSchema)