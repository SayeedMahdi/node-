const mongoose = require("mongoose");
const joi = require('joi');

const {genres_schema}=require("./genres");


const movie_schema=new mongoose.Schema({
    title: {
      type:String,
      required: true,
      maxlength: 50,
      minlength: 5
    },
    description:String,
    genre:{
        type:genres_schema
    },
    numberinStock:{
        type:Number,
        required:true,
        max:10,
        min:0
    },
    dailyRate:{
        type:Number,
        max:10
    }
  });
const Movie = mongoose.model("movie", movie_schema);

  
  function validatemovie(movie) {
    const schema = joi.object({
      title:joi.string().min(3).required(),
      genreId:joi.string().required(),
      numberinStock:joi.number().min(0).required(),
      dailyRate:joi.number().min(0).required()
      
    }); 
  
    return schema.validate(movie);
  }

  exports.Movie=Movie;
  exports.validatemovie=validatemovie;