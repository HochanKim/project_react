const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors({origin : 'http://localhost:3030'}));
app.use(bodyParser.json());

app.use("/user", require("./route/userRoute"));
app.use("/join", require("./route/joinRoute"));

app.listen(3031, ()=>{
    console.log("server start!");
})