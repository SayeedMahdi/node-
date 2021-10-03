const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/playground", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
    .then(() =>  console.log("connected with database.") )
    .catch(e =>  console.log(e) );


const schema = new mongoose.Schema({
    name: String,
    author: String,
    date: { typeL: Date },
    tag: [String],
    ispublished: Boolean,
    price:Number
});



const Course = mongoose.model("Course", schema);


async function createCourse() {
    try{
    const course = new Course({
        name: "Next react complete course",
        author: "Mahnaz Mousavi",
        tag: ["frontent", "backend"],
        ispublished: false,
        price:50
    });
    const result = await course.save();
    console.log(result);
}catch(err){
    console.log(err.message);
}
}
async function find(){
    try{
   const courses= await Course
   //.find({author:"Mah Mousavi",ispublished:false})
   // .find({price:{$nin:[10,20]}})
   //.find()
   //.or([{author:"Mah Mousavi"},{price:20}])
    //.find({author:/.*mahnaz.*/i}) contain
    //.find({author:/mahnaz$/i}) finished
    //.find({author:/^mahnaz/i})  start 
   .limit(10)
   .sort({name:1})
    .select({name:1 ,tag:1 ,price:1,author:1}) ;
   console.log(courses);
    }catch(e){console.log("error"+e)}
}
find();
//createCourse();
