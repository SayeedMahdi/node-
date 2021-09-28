//express api
const express = require('express');
const Joi=require("joi");
const app = express();
app.use(express.json());



//the database array
const courses=[
    {id:1 , name:"course1"},
    {id:2, name:"course2"},
    {id:3, name:"course3"}
];


//get all courses from array with postman
app.get("/api/courses",(req,res)=>{
    res.send(courses);
});

//get specific course from array courses
app.get('/api/Courses/:id', (req, res) => {
    const result=courses.find(c=>c.id=== parseInt( req.params.id));
    if(!result) res.status(404).send("your request id not found");
    res.send(result);
  
});


//post an new course and validate it
app.post("/api/Courses",(req,res)=>{
    const schema={
        name:Joi.string().required().min(3)
    }
    const result=Joi.validata(req.body,schema);
    if(result.error){
        //404 bad request
       return  res.status(404).send(result.error.details[0].message);
    }
    const cours={
    id:courses.length+1,
    name:req.body.name
}
courses.push(cours);
res.send("The class added to courses ");
});
const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
console.log("wellcome back mahdi");