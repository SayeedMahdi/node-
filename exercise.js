const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Exercise-1", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
    .then(() =>  console.log("connected with database.") )
    .catch(e =>  console.log(e) );


const schema = new mongoose.Schema({
  tags: [String],
  date: { typeL: Date },
    name: String,
    author: String,
    isPublished: Boolean,
    price:Number
});


const Course = mongoose.model("Courses", schema);
async function find(){
  try{
 const courses= await Course
// .find({isPublished:true,tags:{$in: ["frontend","backend"]}})
.find()
  .or([{isPublished: true, price:{$gt:15}},{name:/.*by.*/}])
.limit(10)
 .sort({price:-1})
  .select({name:1 ,author:1,price:1 }) ;
 console.log(courses);
  }catch(e){console.log("error"+e)}
}
find();