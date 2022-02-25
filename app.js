const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');

require('./config/env');
const indexRouter = require('./routes/index');
const attendanceRouter = require('./routes/attendance');
const studentRouter = require('./routes/student');
const statisticsRouter = require('./routes/statistics');

const app = express();

app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());

app.use('/index', indexRouter);
app.use('/attendance', attendanceRouter);
app.use('/student', studentRouter);
app.use('/statistics', statisticsRouter);

app.use((err, req, res, next) => {
	if (res.statusCode === 500)
		res.status(500).send(err.message);
	if (res.statusCode === 401)
		res.status(401).send(err.message);
	if (res.statusCode === 404)
		res.status(404).send(err.message);
  });

module.exports = app;
