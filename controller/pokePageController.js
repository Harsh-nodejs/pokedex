const _ = require('lodash');
const fs = require('fs');
const Pokedex = require('../models/pokedex');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// const data = fs.readFileSync('./public/HTML/index.html', 'utf-8');
// const tab = fs.readFileSync('./public/HTML/dataTable.html', 'utf-8');
// const outTab = data.replace('{%SECTION%}',tab);

const getPage = async (pokedex) => {
  // Getting Page
  const data = () =>
    new Promise((resolve, rej) => {
      fs.readFile('./public/HTML/index.html', 'utf-8', (err, filedata) => {
        resolve(filedata);
      });
    });
  const tab = () =>
    new Promise((resolve, rej) => {
      fs.readFile('./public/HTML/dataTable.html', 'utf-8', (err, filedata) => {
        resolve(filedata);
      });
    });
  const tbodydata = () =>
    new Promise((resolve, rej) => {
      fs.readFile('./public/HTML/tbody.html', 'utf-8', (err, filedata) => {
        resolve(filedata);
      });
    });

  const tbody = await tbodydata();

  const content = pokedex
    .map((el) => {
      let a = tbody;

      a = a.replace('{%pokemon_name%}', el.pokemon_name);
      a = a.replace('{%pokedex_number%}', el.pokedex_number);
      a = a.replace('{%type_1%}', el.type_1);
      a = a.replace('{%type_2%}', el.type_2);
      a = a.replace('{%generation%}', el.generation);

      let legen;
      let mythic;
      if (el.legendary === true) legen = 'True';
      else legen = 'False';

      if (el.mythical === true) mythic = 'True';
      else mythic = 'False';

      a = a.replace('{%legendary%}', legen);
      a = a.replace('{%mythical%}', mythic);

      return a;
    })
    .join('');

  let outTab = await data().then(
    async (e) => await tab().then((el) => e.replace('{%SECTION%}', el)),
  );
  outTab = outTab.replace('{%TBODY%}', content);

  return outTab;
};

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

  // getting page
  const outTab = await getPage(pokedex);

  // SEND RESPONSE
  res.status(200).send(outTab);
});

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

  // getting Page
  const outTab = await getPage(pokedex);

  // SEND RESPONSE
  res.status(200).send(outTab);
});
