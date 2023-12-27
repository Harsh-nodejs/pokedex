const express = require('express');
const pokeController = require('../controller/pokeController');

const router = express.Router();

router.route('/').get(pokeController.getAll);

router.route('/generation/:genId').get(pokeController.getGeneration);

router.route('/:Id').get(pokeController.getOne);

router.route('/special/legendary').get(pokeController.getLegendary);

router.route('/special/mythical').get(pokeController.getMythical);

module.exports = router;
