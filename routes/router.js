const express=require("express");
const rout=express.Router()
//the database array
const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" }
];


//get all courses from array with postman
rout.get("/", (req, res) => {
    res.send(courses);
});


//post an new course and validate it
rout.post("/", (req, res) => {

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
//get specific course from array courses
rout.get('/:id', (req, res) => {
    const result = find_id(req.params.id);
    res.send(result);

});

//update a course
rout.put("/:id", (req, res) => {
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
rout.delete("/:id",(req,res)=>{
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

module.exports=rout;