const express = require('express');
const router = express.Router();
const {Genres, validateGenre}=require("../model/genres");


router.get('/', async (req, res) => {
  const genres = await Genres.find().sort("name");
  res.send(genres);
});

router.post('/', async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const new_genre = new Genres({
    name: req.body.name
  });

  let result = await new_genre.save();
  res.send(result);
});

router.put('/:id', async (req, res) => {

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await Genres.findByIdAndUpdate(req.params.id, {
    name: req.body.name
  }, { new: true })
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

router.delete('/:id', async(req, res) => {
  const genre = await Genres.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send('The genre with the given ID was not found if you need help press ctrl + c.');
  res.send(genre);
});

router.get('/:id', async(req, res) => {
  const genre =await Genres.findById(req.params.id);
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});


module.exports = router;