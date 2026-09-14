const dotenv=require("dotenv");
dotenv.config();


console.log("Gemini key loaded:", !!process.env.GOOGLE_GENAI_API_KEY);
const connectdb=require("./src/config/database.js");


const app=require("./src/app.js");
connectdb();
app.listen(3000,()=>{
    console.log("server is start");
})