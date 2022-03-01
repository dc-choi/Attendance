const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');

const { student } = require('../models/index').models;
const PK = require('../middleware/Pk');

// 학생 명단 정보
router.get('/list', async(req, res, next) => {
	try {
		const { searchOption, searchWord } = req.query;
		let { nowPage } = req.query; // 현재 출력해야할 페이지
		nowPage = Number(nowPage);
		if (nowPage === undefined || nowPage === '' || nowPage === 0) nowPage = 1;
		
		const rowPerPage = 10; // 페이지당 학생 출력 수
		let totalRow; // 학생 총 인원 수
		let totalPage; // 학생 출력할 총 페이지
		let startRow; // DB에서 가져올 데이터 위치
		let list;
		let sendData = {};

		if (searchWord !== '') {
			let whereCase = {};
			switch (searchOption) {
				case 'societyName':
					whereCase.s_society_name = searchWord;
					break;
				case 'catholicName':
					whereCase.s_catholic_name = searchWord;
					break;
				default:
					break;
			}
			totalRow = await student.findOne({
				attributes: [
					[sequelize.fn('COUNT', sequelize.col('s_code')), 'studentCount']
				]
			});
			totalPage = Math.ceil(totalRow.dataValues.studentCount / rowPerPage);
			startRow = (nowPage - 1) * rowPerPage;
			list = await student.findAll({
				attributes: [
					['s_code', 'code'],
					['s_society_name', 'societyName'],
					['s_catholic_name', 'catholicName'],
					['s_age', 'age'],
					['s_grade', 'grade'],
					['s_contact', 'contact'],
				],
				where: whereCase,
				order: [ ['s_grade', 'ASC'], ['s_age', 'ASC'], ['s_society_name', 'ASC'] ],
				offset: startRow,
				limit: rowPerPage,
			});
		} else {
			totalRow = await student.findOne({
				attributes: [
					[sequelize.fn('COUNT', sequelize.col('s_code')), 'studentCount']
				]
			});
			totalPage = Math.ceil(totalRow.dataValues.studentCount / rowPerPage);
			startRow = (nowPage - 1) * rowPerPage;
			list = await student.findAll({
				attributes: [
					['s_code', 'code'],
					['s_society_name', 'societyName'],
					['s_catholic_name', 'catholicName'],
					['s_age', 'age'],
					['s_grade', 'grade'],
					['s_contact', 'contact'],
				],
				order: [ ['s_grade', 'ASC'], ['s_age', 'ASC'], ['s_society_name', 'ASC'] ],
				offset: startRow,
				limit: rowPerPage,
			});
		}

		sendData.list = list;
		sendData.totalRow = totalRow.dataValues.studentCount;
		sendData.totalPage = totalPage;
		sendData.nowPage = nowPage;

		res.status(200).send(sendData);
	} catch (error) {
		res.status(500);
    	next(error);
	}
});

// 학생 상세 정보
router.get('/info', async(req, res, next) => {
	try {
		const code = req.query.receivedData;
		const info = await student.findOne({
			where: { s_code: code }
		});

		res.status(200).send(info);
	} catch (error) {
		res.status(500);
    	next(error);
	}
});

// 학생 데이터 추가
router.post('/add', async(req, res, next) => {
	try {
		const { societyName, catholicName, age, grade, contact } = req.body;
		let code = await PK.addPK();
		let check = await student.findOne({
			where: { s_code: code }
		});
		while (check != null) {
			code = await PK.addPK();
			check = await student.findOne({
				where: { s_code: code }
			});
		}
		await student.create({
			s_code: code,
			s_society_name: societyName,
			s_catholic_name: catholicName,
			s_age: age,
			s_grade: grade,
			s_contact: contact,
		});

		res.status(200).send('학생 입력 성공');
	} catch (error) {
		res.status(500);
    	next(error);
	}
});

// 학생 데이터 수정
router.put('/modify', async(req, res, next) => {
	try {
		console.log(req.body);
		const { code, societyName, catholicName, age, grade, contact } = req.body;
		await student.update({
				s_society_name: societyName,
				s_catholic_name: catholicName,
				s_age: age,
				s_grade: grade,
				s_contact: contact,
			},
			{
				where: {
					s_code: code
				}
			},
		);

		res.status(200).send('학생 수정 성공');
	} catch (error) {
		res.status(500);
    	next(error);
	}
});

// 학생 데이터 삭제
router.delete('/:code', async(req, res, next) => {
	try {
		console.log(req.params);
		const { code } = req.params;
		await student.destroy({
			where: {
				s_code: code
			}
		});

		res.status(200).send('학생 삭제 성공');
	} catch (error) {
		res.status(500);
    	next(error);
	}
});

module.exports = router;
