const express = require('express');
const router = express.Router();

const sequelize = require('sequelize');
const { group, student, attendance } = require('../models/index').models;

router.get('/studentCountForMonth', (req, res, next) => {
});

router.get('/studentCountForWeek', (req, res, next) => {
});

router.get('/excellentStudent', (req, res, next) => {
});

router.get('/groupCountForMonth', (req, res, next) => {
});

router.get('/groupCountForWeek', (req, res, next) => {
});

module.exports = router;
