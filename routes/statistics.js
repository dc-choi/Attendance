const express = require('express');
const router = express.Router();

const sequelize = require('sequelize');
const { group, student, attendance } = require('../models/index').models;

router.get('/', (req, res, next) => {
	res.send({ title: 'express'});
});

module.exports = router;
