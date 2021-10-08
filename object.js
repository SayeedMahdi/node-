const mongoose=require("mongoose");
const id=new mongoose.Types.ObjectId();
console.log(id.getTimestamp());
const c=mongoose.Types.ObjectId.isValid(id);
console.log(c);