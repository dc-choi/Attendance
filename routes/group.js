const express = require('express');
const router = express.Router();

const { group } = require('../models/index').models;
const PK = require('../middleware/Pk');

// 그룹 리스트 정보
router.get('/list', async(req, res, next) => {
	try {
		let list;
		let sendData = {};

		list = await group.findAll({
			attributes: [
				['g_code', 'code'],
				['g_name', 'name'],
			],
			order: [ ['g_name', 'ASC'] ],
		});

		sendData.list = list;

		res.status(200).send(sendData);
	} catch (error) {
		res.status(500);
    	next(error);
	}
});

// 그룹 상세 정보
router.get('/info', async(req, res, next) => {
	try {
		const code = req.query.receivedData;
		const info = await group.findOne({
			where: { g_code: code }
		});

		res.status(200).send(info);
	} catch (error) {
		res.status(500);
    	next(error);
	}
});

// 그룹 데이터 추가
router.post('/add', async(req, res, next) => {
	try {
		const { name } = req.body;
		let code = await PK.addPK();
		let check = await group.findOne({
			where: { g_code: code }
		});
		while (check != null) {
			code = await PK.addPK();
			check = await group.findOne({
				where: { g_code: code }
			});
		}
		await group.create({
			g_code: code,
			g_name: name,
		});

		res.status(200).send('그룹 입력 성공');
	} catch (error) {
		res.status(500);
    	next(error);
	}
});

// 학생 데이터 수정
router.put('/modify', async(req, res, next) => {
	try {
		const { code, name } = req.body;
		await group.update({
				g_name: name,
			},
			{
				where: {
					g_code: code
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
		const { code } = req.params;
		await group.destroy({
			where: {
				g_code: code
			}
		});

		res.status(200).send('학생 삭제 성공');
	} catch (error) {
		res.status(500);
    	next(error);
	}
});

module.exports = router;
