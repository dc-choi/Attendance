// const cron = require('node-cron');
// const { student } = require('../models/index').models;

// cron.schedule("* * 1 1 *", async() => {
// 	console.log("1분마다 크론 실행");
// 	try {
// 		await student.increment('s_age');	
// 	} catch (error) {
//     	next(error);
// 	}
// });