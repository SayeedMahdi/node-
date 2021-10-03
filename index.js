//express api
const express = require('express');
const Joi = require("joi");
const app = express();
const morgon=require("morgan")
const courses=require("./routes/router");

app.use(morgon("tiny"));
app.use(express.json());
app.use("/api/Courses",courses);


//make a listner to specific port
const port = process.env.Port || 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
console.log("wellcome back mahdi");