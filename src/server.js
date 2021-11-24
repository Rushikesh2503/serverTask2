const express=require('express');
const PORT=2753;
console.log('PORT:', PORT)
const connect=require("./configs/db");
const app = express();
app.use(express.json());
const registerController=require('./controllers/auth.controller')
app.use("/api",registerController)

app.listen(PORT,async function(){
    await connect();
    console.log("Listening on port ",PORT)
})

