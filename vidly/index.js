const express = require('express');
const genres = require('./routes/genres');
const mongoose=require("mongoose");
const app = express();
const customer=require('./routes/customer');
//loud the movies to rout
const movie=require('./routes/movies');



app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customer',customer);
app.use("/api/movies",movie);
mongoose.connect("mongodb://localhost:27017/vidly", {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
.then(console.log("The detabase is connected."))
.catch(e=>close.log(e.message));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));