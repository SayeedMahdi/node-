const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Exercise-1", {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => console.log("connected with database."))
    .catch(e => console.log(e));


const schema = new mongoose.Schema({
    //tag validation 
    tags: {
        type: Array,
        
        validate: {
           validator:function(v){
               return v && v.length>0
           }
            ,message:"a course must have at least one tag."
        }
    },
    date: { typeL: Date },
    name: { type: String, required: true, minlength: 3, maxlength: 255 , lowercase: true, uppercase: true},
    author: String,
    isPublished: Boolean,
    catagory: { type: String, required: true, enum: ["web", "mobile", "network"] },
    price: {
        set:e=>Math.round(e)
        type: Number,
        min: 12, max: 500,
        required: function () { return this.isPublished }
    }
});

const Course = mongoose.model("Course", schema);
async function create() {
    try {
        const course = new Course({
            name: "new working",
            author: "Mahdi mousavi",
            tags: [],
            isPublished: false,
            price: 33,
            catagory: "we"
        });
        const result = await course.save();
        console.log(result);
    } catch (err) {
        for(f in err.errors){
        console.log(err.errors[f]);
    }
}
}

create();