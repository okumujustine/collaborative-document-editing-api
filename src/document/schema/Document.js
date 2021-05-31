const {Schema, model} = require("mongoose")

const DocumentSchema = new Schema({
    _id:{ type: String },
    data:{type: Object},
    title: {type: String},
    isReady: {type: Boolean, default: false},
    editors:[String],
    admin: {type:String, ref:'User', required: true}
}, { timestamps: true })

 module.exports = model("Document", DocumentSchema)