const express = require('express');
const mongoose=require("mongoose");
const app = express();

const genres = require('./routes/genres');
const customer=require('./routes/customer');
const rentals=require("./routes/rentals");
const movie=require('./routes/movies');
const users=require("./routes/user");

app.use(express.json());

//loud the all objects to rout
app.use("/api/users",users);
app.use("/api/rentals",rentals);
app.use('/api/genres', genres);
app.use('/api/customer',customer);
app.use("/api/movies",movie);
mongoose.connect("mongodb://localhost:27017/vidly", {
  
  useMongoClient: true
})
.then(console.log("The detabase is connected."))
.catch(e=>console.log(e.message));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));