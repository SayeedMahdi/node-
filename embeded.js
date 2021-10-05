const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/embed", {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => console.log("connected to detabase."))
    .catch(e => console.log(e.message));

    //schema of author
const authershcema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    bio: String,
    web: String
})
//add model
const Author = mongoose.model("author", authershcema);
//embed with course
const course = mongoose.model("course", mongoose.Schema({
    name: String,
    authors:{
        type:[authershcema],
        required:true
    }
}));

//create an author
async function createauthor(name, bio, web) {
    const newauthor = await new Author({
        name,
        bio,
        web
    });
    newauthor.save();
    console.log(newauthor);
}
async function createcourse(name,authors) {
    const newcourse =await new course({
        name,
        authors
    });
    newcourse.save();
    console.log(newcourse);
}
async function listCourse(){
    const courses=await course.find()
    .sort("name ")
    console.log(courses);
}
//add author



async function addauthor(course_id,author){
    try{
    const course_for=await courses.findById(course_id);
    course_for.authors.push(author);
    course_for.save();
}catch(e){
    console.log(e.message);
}
}
async function deleteauthor(course_id,author_id){
    const course_for=await course.findById(course_id);
    const author=course_for.authors.id(author_id);
    author.remove();
    course_for.save();
}
//ubdate the course
async function ubdate(courseid){
    const course_se=await course.updateOne({_id:courseid},{
        $unset:{
            "author.name":"",
            
        }
    });
        
    console.log(course_se);
}
//createauthor("Mahdi","mybio","www.mahdimousavi.co.ltd.com");
// createcourse("node.js",[new Author({name:"mahdi"}),
// new Author({name: "alit"}),
// new Author({name:"ali ahmad"})]);
//ubdate("615a941863e2beed39901cea");//
//listCourse();
//addauthor("615a9d54867021112f97142a",new Author({name:"mostafa"}));
deleteauthor("615a9d54867021112f97142a","615ac430d662af05477d7e44");