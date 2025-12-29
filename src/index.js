const express= require("express");
const app=express();
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");
const mongoose =require("mongoose");

app.use(express.json());
app.use("/users",userRouter);
app.use("/notes",noteRouter);
mongoose.connect("mongodb+srv://admin:tans%402304@cluster0.aiwsmte.mongodb.net/?appName=Cluster0")
.then(()=>{

})
.catch((error)=>{
    console.log(error);
}
)

app.listen(5000,()=>{
    console.log("server started on port no. 5000");
})