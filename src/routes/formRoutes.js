const express = require('express');
const { receiveForm } = require('../controllers/formController');

const router = express.Router();

router.post('/:slug', receiveForm);

module.exports = router;
