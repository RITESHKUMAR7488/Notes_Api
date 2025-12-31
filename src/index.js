const express= require("express");
const app=express();
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");
const mongoose =require("mongoose");
const dotenv = require("dotenv");
const cors=require("cors");

// Point strictly to where your .env file is located
dotenv.config({ path: "./src/.env" });
app.use(cors());
app.use(express.json());
app.use("/users",userRouter);
app.use("/notes",noteRouter);
const PORT=process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT,()=>{
        console.log("server started on port no."+PORT);
    })

})
.catch((error)=>{
    console.log(error);
}
)

