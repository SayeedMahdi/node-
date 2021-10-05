const mongoose = require("mongoose");
const joi = require('joi');
const genres_schema=new mongoose.Schema({
  name: {
    type:String,
    required: true,
    maxlength: 50,
    minlength: 5
  }
})
const Genres = mongoose.model("Genres",genres_schema );

  function validateGenre(genre) {
    const schema = Joi.object({
      name: Joi.string().min(3).required()
    });
  
    return schema.validate(genre);
  }
  exports.genres_schema=genres_schema;
exports.Genres=Genres;
exports.validateGenre=validateGenre;  