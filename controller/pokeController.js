const Pokedex = require('../models/pokedex');
const APIFeatures = require('../utils/apiFeatures');

exports.getAll = async (req, res, next) => {
  const features = new APIFeatures(Pokedex.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const pokedex = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: pokedex.length,
    data: {
      pokedex,
    },
  });
};

// Get pokemon by generations
exports.getGeneration = async (req, res) => {
  const features = new APIFeatures(
    Pokedex.find({ generation: req.params.genId }),
    req.query,
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const pokedex = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: pokedex.length,
    data: {
      pokedex,
    },
  });
};

exports.getOne = async (req, res, next) => {
  // check ID for number or Name
  const param = req.params.Id;
  let queryst = '';
  if (!isNaN(param)) {
    queryst = `{ "pokedex_number" : ${param} }`;
  } else {
    queryst = `{ "pokemon_name" : "${param}" }`;
  }
  queryst = JSON.parse(queryst);

  // Querying
  const features = new APIFeatures(Pokedex.find(queryst), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const pokedex = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: pokedex.length,
    data: {
      pokedex,
    },
  });
};
