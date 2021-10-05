

const mongoose = require("mongoose");



mongoose.connect("mongodb://localhost:27017/popu", {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => console.log("connected to detabase."))
    .catch(e => console.log(e.message));


const Author = mongoose.model("author", mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    bio: String,
    web: String
}));
const course = mongoose.model("course", mongoose.Schema({
    name: String,
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Author
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
async function createcourse(name,author) {
    const newcourse =await new course({
        name,
        author
    });
    newcourse.save();
    console.log(newcourse);
}
async function listCourse(){
    const courses=await course.find()
    .populate("author")
    .sort("name ")
    console.log(courses);
}

//createauthor("Mahdi","mybio","www.mahdimousavi.co.ltd.com");
//createcourse("node.js","615a85f21d65082e1d17e707");
listCourse();