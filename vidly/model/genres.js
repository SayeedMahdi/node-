const mongoose = require("mongoose");
const joi = require('joi');

const Genres = mongoose.model("Genres", mongoose.Schema({
    name: {
      type:String,
      required: true,
      maxlength: 50,
      minlength: 5
    }
  }));

  function validateGenre(genre) {
    const schema = Joi.object({
      name: Joi.string().min(3).required()
    });
  
    return schema.validate(genre);
  }
exports.Genres=Genres;
exports.validateGenre=validateGenre;  