const express = require('express');
const pokeController = require('../controller/pokePageController');

const router = express.Router();

router.route('/').get(pokeController.getAll);


module.exports = router;
