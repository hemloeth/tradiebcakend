const mongoose = require('mongoose');

const HomeOwnerSchema = new mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    location:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    phone:{type:String, required:true},
    password:{type:String, required:true},
    role: {
        type: [String],
        enum: ["homeowner", "tradie"],
      }
})

const HomeOwner = mongoose.model("HomeOwner", HomeOwnerSchema);
module.exports = HomeOwner;