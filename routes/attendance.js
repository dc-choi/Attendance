const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');
const { Op } = require("sequelize");

const { group, student, attendance } = require('../models/index').models;
const PK = require('../middleware/Pk');

// 현재 년도와 그룹 정보
router.get('/initPage', async(req, res, next) => {
	try {
		let today = new Date();
		let year = today.getFullYear();
		const groupList = await group.findAll({
			attributes: [
				['g_code', 'gCode'],
				['g_name', 'gName'],
			],
		});
		const sendData = {
			groupList,
			year,
		};
		res.status(200).send(sendData);	
	} catch (error) {
		res.status(500);
    	next(error);
	}
});

// 출석 데이터 불러오기
router.get('/table', async(req, res, next) => {
	try {
		let { year, group } = req.query;
		year = Number(year);
		if (year === undefined || typeof year === '' || year === 0) {
			const now = new Date();
			year = now.getFullYear();
		}
	
		const month = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ,11, 12 ];
		let day = [];
		let students = [];
		let sendData = {};
	
		month.forEach(e => {
			let temp = [];
			const lastDay = new Date(year, e - 1, 0).getDate();
			
			for (let i = 1; i <= lastDay; i++) {
				const date = new Date(year, e - 1, i);
				if (date.getDay() === 0) {
					temp.push(i);
				}
			}
			day[e - 1] = temp;
		});
	
		const groupStudentcode = await student.findAll({
			attributes: [
				['s_code', 'sCode'],
				['s_society_name', 'societyName'],
				['s_catholic_name', 'catholicName'],
			],
			where: { group_g_code: group},
			order: [ ['s_age', 'ASC'], ['s_society_name', 'ASC'] ],
		});
		groupStudentcode.forEach(e => {
			students.push(e.dataValues.sCode);
		});
	
		const attendanceList = await attendance.findAll({
			attributes: [
				['a_code', 'aCode'],
				['a_date', 'aDate'],
				['a_content', 'aContent'],
				['student_s_code', 'studentCode'],
			],
			where: {
				student_s_code: { [Op.in]: students },
			},
			// order: [ ['a_date', 'ASC'] ],
		});
	
		sendData.day = day;
		sendData.groupStudents = groupStudentcode;
		sendData.attendanceList = attendanceList;
		
		res.status(200).send(sendData);	
	} catch (error) {
		res.status(500);
    	next(error);
	}
});

// 출석 미 입력 데이터 저장
router.post('/emptySave', async(req, res, next) => {
	try {
		const { year, emptyData } = req.body;

		for (let i = 0; i < emptyData.length; i++) { // forEach 안 돌아가서 for문 사용
			let code = emptyData[i].str.substring(0, 13);
			let str = emptyData[i].str.split('-');
			let time = str[2].split('.');
			let fullTime;
	
			if (time[0] < 10 && time[1] < 10)
				fullTime = `${year}${time[0].padStart(2, '0')}${time[1].padStart(2, '0')}`;
			else if (time[0] < 10)
				fullTime = `${year}${time[0].padStart(2, '0')}${time[1]}`;
			else if (time[1] < 10)
				fullTime = `${year}${time[0]}${time[1].padStart(2, '0')}`;
			else
				fullTime = `${year}${time[0]}${time[1]}`;

			const checkAttendance = await attendance.findOne({
				where: {
					student_s_code: code,
					a_date: fullTime,
				},
			});

			if (checkAttendance !== null) {
				await attendance.destroy({
					where: {
						a_date: fullTime,
						student_s_code: code,
					}
				});
			}
		}

		res.status(200).send('출석 입력 성공');	
	} catch (error) {
		res.status(500);
    	next(error);
	}
});

router.post('/fullSave', async(req, res, next) => {
	try {
		const { year, fullData } = req.body;

		for (let i = 0; i < fullData.length; i++) { // forEach 안 돌아가서 for문 사용
			let code = fullData[i].str.substring(0, 13);
			let str = fullData[i].str.split('-');
			let time = str[2].split('.');
			let fullTime;
	
			if (time[0] < 10 && time[1] < 10)
				fullTime = `${year}${time[0].padStart(2, '0')}${time[1].padStart(2, '0')}`;
			else if (time[0] < 10)
				fullTime = `${year}${time[0].padStart(2, '0')}${time[1]}`;
			else if (time[1] < 10)
				fullTime = `${year}${time[0]}${time[1].padStart(2, '0')}`;
			else
				fullTime = `${year}${time[0]}${time[1]}`;
			
			const checkAttendance = await attendance.findOne({
				where: {
					student_s_code: code,
					a_date: fullTime,
				},
			});

			if (checkAttendance === null) {
				let pk = await PK.addPK();
				let check = await attendance.findOne({
					where: { a_code: pk }
				});
				while (check != null) {
					pk = await PK.addPK();
					check = await attendance.findOne({
						where: { a_code: pk }
					});
				}

				await attendance.create({
					a_code: pk,
					a_date: fullTime,
					a_content: fullData[i].data,
					student_s_code: code,
				})
			} else {
				await attendance.update(
					{
						a_content: fullData[i].data,
					},
					{
						where: {
							a_date: fullTime,
							student_s_code: code,
						}
					}
				);
			}
		}

		res.status(200).send('출석 입력 성공');	
	} catch (error) {
		res.status(500);
    	next(error);
	}
});

module.exports = router;
