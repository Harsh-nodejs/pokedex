const mongoose = require('mongoose');

const pokeSchema = mongoose.Schema({
  pokedex_number: {
    type: Number,
  },
  pokemon_name: String,
  type_1: String,
  type_2: String,
  hit_points: Number,
  attack: Number,
  defense: Number,
  special_attack: Number,
  special_defense: Number,
  speed: Number,
  generation: Number,
  legendary: Boolean,
  mythical: Boolean,
});

pokeSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();
  next();
});

pokeSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

const Pokedex = mongoose.model('pokedex', pokeSchema);

module.exports = Pokedex;
