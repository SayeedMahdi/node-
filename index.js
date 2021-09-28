//express api
const express = require('express');
const Joi = require("joi");
const app = express();
const morgon=require("morgan")





app.use(morgon("tiny"));
app.use(express.json());



//the database array
const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" }
];


//get all courses from array with postman
app.get("/api/courses", (req, res) => {
    res.send(courses);
});

//get specific course from array courses
app.get('/api/Courses/:id', (req, res) => {
    const result = find_id(req.params.id);
    res.send(result);

});


//post an new course and validate it
app.post("/api/Courses", (req, res) => {

    const { error } = name_validation(req.body);
    if (error) {
        //404 bad request
        return res.status(404).send(error.details[0].message);
    }
    const cours = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(cours);
    res.send("The class added to courses ");
});



//update a course
app.put("/api/Courses/:id", (req, res) => {
    const course = find_id(req.params.id);
    if (!course) res.status(404).send("your request id not found");
    const { error } = name_validation(req.body);
    if (error) {
        //404 bad request
        return res.status(404).send(error.details[0].message);
    }
    course.name = req.body.name;
    res.send(course);
});


//delete a specific course
app.delete("/api/Courses/:id",(req,res)=>{
    //first find the id
    const course=find_id(req.params.id);
    if (!course) res.status(404).send("your request id not found");
    const index=courses.indexOf(course);
    courses.splice(index,1);
    res.send(course);
});



//function for findig a course
function find_id(id) {
    const result = courses.find(c => c.id === parseInt(id));
    return result;
   
}
//funtion for validation
function name_validation(name) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(name);
}

//make a listner to specific port
const port = process.env.Port || 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
console.log("wellcome back mahdi");