const dotenv=require("dotenv");
dotenv.config();
const connectdb=require("./src/config/database.js");


const app=require("./src/app.js");
connectdb();
app.listen(3000,()=>{
    console.log("server is start");
})