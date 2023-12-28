const _ = require('lodash');
const Pokedex = require('../models/pokedex');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAll = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Pokedex.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const pokedex = await features.query;

  if (_.isEmpty(pokedex)) {
    return next(new AppError('No Pokemon found with that ID', 404));
  }

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: pokedex.length,
    data: {
      pokedex,
    },
  });
});

// Get pokemon by generations
exports.getGeneration = catchAsync(async (req, res, next) => {
  // Checking for empty Generation value
  if (!req.params.genId) {
    return this.getAll(req, res);
  }

  const features = new APIFeatures(
    Pokedex.find({ generation: req.params.genId }),
    req.query,
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const pokedex = await features.query;

  if (_.isEmpty(pokedex)) {
    return next(new AppError('No Pokemon found with that ID', 404));
  }

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: pokedex.length,
    data: {
      pokedex,
    },
  });
});

exports.getOne = catchAsync(async (req, res, next) => {
  // check ID for number or Name
  let param = req.params.Id;
  let queryst = '';

  if (param === 'randomPokemon') {
    param = Math.floor(Math.random() * 898);
  } // Checking for Random Pokemon

  if (!isNaN(param)) {
    queryst = `{ "pokedex_number" : ${param} }`;
  } else {
    queryst = `{ "pokemon_name" : "${param}" }`;
  }

  queryst = JSON.parse(queryst);
  // console.log(queryst);

  // Querying
  const features = new APIFeatures(Pokedex.find(queryst), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const pokedex = await features.query;

  if (_.isEmpty(pokedex)) {
    return next(new AppError('No Pokemon found with that ID', 404));
  }

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: pokedex.length,
    data: {
      pokedex,
    },
  });
});

exports.getLegendary = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Pokedex.find({ legendary: true }), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const pokedex = await features.query;

  if (_.isEmpty(pokedex)) {
    return next(new AppError('No Pokemon found with that ID', 404));
  }

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: pokedex.length,
    data: {
      pokedex,
    },
  });
});

exports.getMythical = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Pokedex.find({ mythical: true }), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const pokedex = await features.query;

  if (_.isEmpty(pokedex)) {
    return next(new AppError('No Pokemon found with that ID', 404));
  }
  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: pokedex.length,
    data: {
      pokedex,
    },
  });
});
