const mongoose=require("mongoose");
async function connectdb(params) {
    try{await mongoose.connect(process.env.MONGO_URI);
    console.log("mongodb is connected");}
    catch(err){
        console.log(err);
    }
}
module.exports=connectdb;