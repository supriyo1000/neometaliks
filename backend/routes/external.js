var express = require('express');
var router = express.Router();
var apiCtrl = require("../controllers/api")
// const jwt = require('jsonwebtoken');
const multer = require("multer");
const dbconfig = require('../knexfile');
const db = require('knex')(dbconfig.development)

const date = new Date();
const current_month = date.getMonth() + 1;
const current_day_of_month = date.getDate(); // Use getDate to get the day of the month.
const current_date = `${date.getFullYear()}-${current_month < 10 ? '0' : ''}${current_month}-${current_day_of_month < 10 ? '0' : ''}${current_day_of_month}`;
const current_minutes = date.getMinutes();
const current_time = `${date.getHours()}:${current_minutes < 10 ? '0' : ''}${current_minutes}`;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: async (req, file, cb) => {
        const fileName = file.originalname;
        const userId = req.query.userid;
        const newFileName = `${userId}-${fileName}`;
        cb(null, newFileName);
    },
});

const upload = multer({ storage });


router.get('/', (req, res) => {
    res.send('working');
})

router.post('/insert_external_student', async (req, res) => {
    const { sname, mail, sphone, clgid, clg, grd, mrks,
        rperson, add } = req.body;

    // console.log(sname, mail, sphone, clg, grd, mrks,
    //     rperson, add);

    const checkdata = await db.raw(`CALL check_External_Student(${sphone}, '${mail}', @isPresent)`)
    const selectResult = await db.raw('SELECT @isPresent AS isPresent');
    const isDataPresent = selectResult[0][0].isPresent;

    // console.log("present", isDataPresent);

    if (isDataPresent === 0) {
        const response = await db.raw(`CALL external_student(${1},'${sname}',${clgid},
                '${clg}','${add}',${sphone},'${mail}','${grd}',${mrks},'${rperson}','${current_date}','${current_date}')`)

        res.send(response);
    } else {
        res.send(204);
    }

})

router.get("/external_student_list", async (req, res) => {

    const mode = req.query.dbmode;
    const fdate = req.query.fromdate;
    const tdate = req.query.todate;

    const response = await db.raw(`CALL external_student(${mode},'',${1},
'','',${null},'','',${null},'','${fdate}','${tdate}')`)

    res.send(response[0][0]);
})

router.post("/external_student_update", async (req, res) => {

    const stuid = req.body.stuid;
    const stat = req.body.status;

    // console.log(stuid, stat);

    try {
        if (stat === 2) {
            const response = await db.raw(`CALL external_student_update(
                            ${3},${stuid},${null},'','',${null},'','',${null},'${current_date}')`)
            res.send("Rejected");
        }
        else {
            const response1 = await db.raw(`CALL external_student_update(
                            ${4},${stuid},${null},'','',${null},'','',${null},'${current_date}')`)

            const response2 = await db.raw(`CALL external_student_update(
                            ${1},${stuid},${response1[0][0][0].clgid},'','${response1[0][0][0].college}',${null},'','',${null},'${current_date}')`)

            const response3 = await db.raw(`CALL external_student_update(
                            ${5},${stuid},${null},'','${response1[0][0][0].college}',${null},'','',${null},'${current_date}')`)
            const response4 = await db.raw(`CALL external_student_update(
                            ${2},${stuid},${response3[0][0][0].Coll_ID},'${response1[0][0][0].name}','${response1[0][0][0].college}',${response1[0][0][0].phone},'${response1[0][0][0].email}','${response1[0][0][0].grade}',${response1[0][0][0].marks},'${current_date}')`)

            res.send("Success");
        }
    } catch (error) {
        console.error(error);
    }

    // res.send(response[0][0]);
})

router.get('/abc', async function (req, res) {
    const response = await db.raw(`CALL getFundMaster(${1}, '2030-2031', ${2000}, ${800}, ${2800}, ${1}, '2023-12-02', ${null}, '2023-12-02', ${0}, 'null', ${1}, 'null')`);
    res.send(response)
})

router.post("/budget_allocation", async (req, res) => {
    const { fyear, cyear, pyear, total, appid } = req.body;
    // console.log("******");
    // console.log(fyear, cyear, pyear, total, appid);
    // console.log("******");
    const response = await db.raw(`CALL getFundMaster(${1},'${fyear}',${cyear},${pyear},${total}
        ,${appid}, '${current_date}', ${null}, '${current_date}',${0},'null',${1},'null')`);
    // const response = await db.raw(`CALL getFundMaster(${1}, '2030-2031', ${2000}, ${800}, ${2800}, ${1}, '2023-12-02', ${null}, '2023-12-02', ${0}, 'null', ${1}, 'null')`);
    res.send(response);
})

router.get("/check_budget", async (req, res) => {
    const fyear = req.query.fyear;
    const response = await db.raw(`CALL getFundMaster(${7}, '${fyear}', ${2000}, ${800}, ${2800}, ${1}, '2023-12-02', ${null}, '2023-12-02', ${0}, 'null', ${1}, 'null')`);
    res.json(response[0][0][0]);
})

router.post("/budget_approval", async (req, res) => {
    const { mid, status, comment, srno } = req.body;

    const response = await db.raw(`CALL getFundMaster(${2},'2023-2024',${0},${0},${0}
        ,${null}, '${current_date}', ${mid}, '${current_date}',${status},'${comment}',${srno},'null')`);

    res.send(response);
})

router.get("/get_all_budget", async (req, res) => {

    const response1 = await db.raw(`CALL getFundMaster(${3},'2023-2024',${0},${0},${0}
        ,${null}, '2023-11-12', ${null}, '2023-11-12',${1},"null",${1},'null')`);

    // const response2 = await db.raw(`CALL getFundMaster(${4},'2023-2024',${0},${0},${0}
    //     ,${null}, '2023-11-12', ${null}, '2023-11-12',${1},"null",${1},'null')`);

    // const response = {
    //     res1: response1[0][0],
    //     res2: response2[0][0]
    // }   
    res.send(response1[0][0]);
})

router.get('/get_serial', async (req, res) => {
    const fyear = req.query.year;
    const response = await db.raw(`CALL get_fund_serial('${fyear}')`);
    res.send(response[0][0][0]);
})

router.post('/update_budget_approval', async (req, res) => {
    const { fyear, cyear, pyear, total, srno } = req.body;
    const response = await db.raw(`CALL getFundMaster(${5},'${fyear}',${cyear},${pyear},${total}
        ,${null}, '2023-11-12', ${null}, '2023-11-12',${1},"null",${srno},'null')`);
    res.send(response);
})

router.post('/insert_student_fees', async (req, res) => {
    const { stuid, form, appid } = req.body;

    // console.log(stuid, form, appid);

    for (let i = 0; i < form.length; i++) {
        const checkResponse = await db.raw(
            `CALL get_student_fees_master(${1},${stuid},
  '${form[i].semester}',${form[i].amount}, '${form[i].month}', '${form[i].year}',${0}, '${current_date}', ${0}, ${appid})`);
    }

    res.send("ok");
})

router.get("/getReadyforFund_students", async (req, res) => {
    const clgId = req.query.clgid;
    const response = await db.raw(`CALL get_student_fees_master(${2},${clgId},
  ${1},${0}, '${current_date}', '2023-2024',${0}, '${current_date}', ${0}, ${0}) `)
    res.send(response[0][0]);
})

router.post("/update_password", async function (req, res) {
    const { userid, pass } = req.body;
    // console.log(userid, pass);
    const response = await db.raw(`CALL update_password(${userid}, '${pass}')`)
    res.send(response);
})

router.get('/get_student_fees', async (req, res) => {
    const mode = req.query.dbmode;
    const year = req.query.year;
    // console.log(mode, year);
    const response = await db.raw(`CALL get_student_fees_master(${mode},${0},
  '${1}',${0}, '${current_date}', '${year}',${0}, '${current_date}', ${0}, ${0}) `);
    res.send(response[0][0]);
})

router.get('/get_individual_student_fees', async (req, res) => {
    const mode = req.query.dbmode;
    const userId = req.query.userid;
    const response = await db.raw(`CALL get_student_fees_master(${mode},${userId},
  '${1}',${0}, '${current_date}', '2023-2024',${0}, '${current_date}', ${0}, ${0}) `);
    res.send(response[0][0]);
})

router.get('/get_student_fees_for_approval', async (req, res) => {
    const mode = req.query.dbmode;
    const year = req.query.year;
    const clgid = req.query.clgid;
    // console.log(mode, year);
    const response = await db.raw(`CALL get_student_fees_master(${mode},${clgid},
  '${1}',${0}, '${current_date}', '${year}',${0}, '${current_date}', ${0}, ${0}) `);
    res.send(response[0][0]);
})

router.post('/get_student_fees_for_approval_status', async (req, res) => {
    const fees = req.body.studentFees;
    const status = req.body.status;

    // console.log(Array.isArray(fees));

    for (let i = 0; i < fees.length; i++) {
        const response = await db.raw(`CALL get_student_fees_master(${7},${fees[i].stuid},
  '${fees[i].sem}',${fees[i].amount}, '${current_date}', '2023-2024',${status}, '${current_date}', ${0}, ${0}) `);

    }
    res.send("successfull!!");
})

router.post('/edit_student_fees', async (req, res) => {
    const amount = req.body.amount;
    const sem = req.body.semester;
    const userId = req.body.userid;

    // console.log(amount, sem, userId);

        const response = await db.raw(`CALL get_student_fees_master(${8},${userId},
  '${sem}',${amount}, '${current_date}', '2023-2024',${0}, '${current_date}', ${0}, ${0}) `);

    res.send(response);
})

router.get('/approved_referal_student', async (req, res) => {
    const dbmode = req.query.dbmode;
    const fdate = req.query.fromdate;
    const tdate = req.query.todate;

    // console.log(amount, sem, userId);

    const response = await db.raw(`CALL get_reports(${dbmode}, '${fdate}', '${tdate}')`);

    res.send(response[0][0]);
})

router.get('/disbursed_student_report', async (req, res) => {
    const dbmode = req.query.dbmode;
    const fdate = req.query.fromdate;
    const tdate = req.query.todate;

    // console.log(amount, sem, userId);

    const response = await db.raw(`CALL get_reports(${dbmode}, '${fdate}', '${tdate}')`);

    res.send(response[0][0]);
})

// function currentFinancialYear() {
// console.log(current_date);

//     const currentYear = new Date().getFullYear();
//     const endYear = currentYear + 1;
//     return `${currentYear}-${endYear}`;
// }

function currentFinancialYear() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-based

    let currentYear;

    // If the current month is before April, consider the previous year
    if (currentMonth < 4) {
        currentYear = currentDate.getFullYear() - 1;
    } else {
        currentYear = currentDate.getFullYear();
    }

    const endYear = currentYear + 1;
    return `${currentYear}-${endYear}`;
}

router.get("/get_yearwise_budget", async (req, res) => {

    const fyear = currentFinancialYear();
    console.log("fyear",fyear);

    const response1 = await db.raw(`CALL getFundMaster(${6},'${fyear}',${0},${0},${0}
        ,${null}, '2023-11-12', ${null}, '2023-11-12',${1},"null",${1},'null')`);

    // console.log(response1[0][0][0]);  
    res.send(response1[0][0][0]);
})
router.get("/get_fund_balance_report", async function (req, res) {

    const fyear = currentFinancialYear();
    console.log("fyear", fyear);

    const response2 = await db.raw(`CALL get_disbursment_master(
        ${6},${9},'semester-1',${0},'2023-12-20',
        '${fyear}',${1},'email','${current_date}',${0}, 'null')`);
    res.send(response2[0][0][0]);
})

module.exports = router;
