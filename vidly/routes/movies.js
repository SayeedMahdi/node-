const express = require('express');
const router = express.Router();
const mongooes=require("mongoose");
const {Genres}=require("../model/genres");
const {Movie , validatemovie}=require("../model/moveis");

try{
//all movies get with api
router.get("/",async(req,res)=>{
    try{
    const allmoveis=await Movie.find().sort("name");
    res.send(allmoveis);
    }catch(e){
        console.message(e.message);
    }
});

//add a movie

router.post("/",async(req,res)=>{
    const {error}=validatemovie(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const genre=await Genres.findById(req.body.genreId);
    if(!genre) return res.status(404).send("The Genre didn't recognized");

    let new_movie=new Movie({
        title:req.body.title,
        genre:{
            _id:genre.id,
            name:genre.name
        },
        description: String,
      numberinStock:req.body.numberinStock,
    dailyRate:req.body.dailyRate
    });
    new_movie= await new_movie.save();
   res.send(new_movie);
});
//find an specific movie
router.get("/:id",async (req, res)=>{
    await Movie.findById(req.params.id)
    .then( e=> res.send(e))
    .catch(e=> res.send(e.message));
    
    // if(!movie) return res.status(404).send("The movie with the id didn't recognized");
    // res.send(movie);
});
//ubdate 
router.put("/:id",async (req, res)=>{
    //validation
     const {error}=await validatemovie(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //find and undate
    try{
    const movie=await Movie.findByIdAndUpdate(req.params.id,{
        title:req.body.title,
        genre_id:req.body.genreId,
        numberinStock:req.body.numberinStock,
        dailyRate:req.body.dailyRate,
        description:req.body.description

    });
    if(!movie) return res.status(400).send("The movie does not find");
    //if not fount return 404
    movie.save();
    res.send(movie);
}catch(e){
    console.log(e.message);
}
 
    //delete the movie
    router.delete("/:id",async (req,res)=>{
        //find and delete
        const movie=await Movie.findByIdAndDelete(req.params.id);
        if(!movie) return res.status(400).send("The id does not found");
        res.send("deleted",movie);
    });

});
}catch(e){
    console.log(e.message);
}
module.exports=router;