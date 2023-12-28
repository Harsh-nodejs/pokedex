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
