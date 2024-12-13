var express = require('express');
var router = express.Router();
var db = require("../knex");
const jwt = require('jsonwebtoken');


const date = new Date();
const current_month = date.getMonth() + 1;
const current_day_of_month = date.getDate(); // Use getDate to get the day of the month.
const current_date = `${date.getFullYear()}-${current_month < 10 ? '0' : ''}${current_month}-${current_day_of_month < 10 ? '0' : ''}${current_day_of_month}`;
const current_minutes = date.getMinutes();
const current_time = `${date.getHours()}:${current_minutes < 10 ? '0' : ''}${current_minutes}`;


const roleDate = new Date();
const nowDate = `${roleDate.getDate()}/${roleDate.getMonth() + 1}/${roleDate.getFullYear()}`


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register_linkdin', async function (req, res) {

  const { fullname, mail, pass } = req.body;

  console.log(fullname, mail, pass);

  const response = await db.raw(`CALL linkdin_student(${1},${0},'${fullname}','${mail}','${pass}',
'${current_date}',
'in img varchar(250)',
'in abt varchar(950)',
'in com varchar(250)',
'in jb varchar(250)',
'in addrs varchar(250)',
${1111111111},'in fb varchar(250)','in insta varchar(250)','in lnkdn varchar(250)','clg',
'in crs varchar(250)','${current_date}','${current_date}','in sub varchar(300)')`)
  console.log(response);

  res.send(response);
});


router.get('/userlogin', async function (req, res, next) {
  const user = req.query.username;
  const password = req.query.pass;

  console.log(user, password);

  if (user === "admin@admin.com" && password === "neo@123") {
    const token = jwt.sign({
      name: 'admin neo',
      email: 'admin12345',
      status: 1,
      creationdate: current_date,
    },
      'securitykey',
      {
        expiresIn: "1h"
      }
    );
    res.status(200).json({
      studentId: 0,
      name: 'admin123@neo',
      email: 'admin123',
      token: token,
      status: 200
    })
  }
  else {
    try {
      const response = await db.raw(`CALL linkdin_student(${5},${0},'','${user}','${password}',
'${current_date}',
'in img varchar(250)',
'in abt varchar(950)',
'in com varchar(250)',
'in jb varchar(250)',
'in addrs varchar(250)',
${1111111111},'in fb varchar(250)','in insta varchar(250)','in lnkdn varchar(250)','clg',
'in crs varchar(250)','${current_date}','${current_date}','in sub varchar(300)')`)

      console.log(response[0][0]);

      const value = response[0][0];

      console.log(value);

      if (value.length > 0 && value[0].password === password && value[0].email === user) {
        const token = jwt.sign({
          name: value[0].name,
          email: value[0].email,
          status: value[0].status,
          creationdate: value[0].reg_date
        },
          'securitykey',
          {
            expiresIn: "1h"
          }
        );
        res.status(200).json({
          studentId: value[0].serialno,
          name: value[0].name,
          email: value[0].email,
          token: token,
          status: 200
        })
      }
      else {
        res.status(204).json({
          status: 204
        })
      }

    } catch (error) {
      console.error(error);
    }
  }

});


router.get("/getUserDetails", async function (req, res) {

  let studentId = parseInt(req.query.stuid, 10);

  console.log(typeof (studentId));

  try {
    const response = await db.raw(`CALL linkdin_student(${4},${studentId},'','user','password',
'${current_date}','in img varchar(250)','in abt varchar(950)','in com varchar(250)',
'in jb varchar(250)','in addrs varchar(250)',${1111111111},'in fb varchar(250)','in insta varchar(250)','in lnkdn varchar(250)','clg','in crs varchar(250)','${current_date}','${current_date}','in sub varchar(300)')`);

    res.send(response[0][0]);

  } catch (error) {
    console.error(error);
  }
})

router.post('/profileUpdate', async function (req, res) {
  const { mode, userid, name, about, company, job, college, add, phone, fb, insta, link } = req.body;

  console.log(mode, userid, name, about, company, job, add, phone, fb, insta, link);

  const handleEmptyString = (value) => (value === '' ? null : value);

  try {
    const response = await db.raw(
      'CALL linkdin_student(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)',
      [
        mode,
        userid,
        handleEmptyString(name),
        'user',
        'password',
        current_date,
        'in img varchar(250)',
        handleEmptyString(about),
        handleEmptyString(company),
        handleEmptyString(job),
        handleEmptyString(add),
        handleEmptyString(phone),
        handleEmptyString(fb),
        handleEmptyString(insta),
        handleEmptyString(link),
        handleEmptyString(college),
        'in crs varchar(250)',
        current_date,
        current_date,
        'in sub varchar(300)',
      ]
    );

    res.send(response[0][0]);
  } catch (error) {
    console.error(error);
    console.log(mode,
      userid,
      handleEmptyString(name),
      'user',
      'password',
      current_date,
      null,
      handleEmptyString(about),
      handleEmptyString(company),
      handleEmptyString(job),
      handleEmptyString(add),
      handleEmptyString(phone),
      handleEmptyString(fb),
      handleEmptyString(insta),
      handleEmptyString(link),
      handleEmptyString(college),
      '',
      current_date,
      current_date,
      '',);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/checkProfileExists', async function (req, res) {
  let studentId = parseInt(req.query.stuid, 10);
  let mode = req.query.mode;

console.log(studentId, mode);

  try {
    const response = await db.raw(`CALL linkdin_student(${mode},${studentId},'','user','password',
'${current_date}','in img varchar(250)','in abt varchar(950)','in com varchar(250)',
'in jb varchar(250)','in addrs varchar(250)',${1111111111},'in fb varchar(250)','in insta varchar(250)','in lnkdn varchar(250)','clg','in crs varchar(250)','${current_date}','${current_date}','in sub varchar(300)')`);
    
    console.log(response[0][0][0]);

    res.send(response[0][0][0]);

  } catch (error) {
    console.error(error);
  }
})


router.post('/educationUpdate', async function (req, res) {
  const { mode, userid, course, fdate, tdate, sub } = req.body;

  console.log( mode, userid, course, fdate, tdate, sub);

  const handleEmptyString = (value) => (value === '' ? null : `${value}`);

  try {
    const response = await db.raw('CALL linkdin_student(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)',
      [
        mode, userid, '', 'user', 'password',
        current_date, 'img', 'abt', 'com',
        'jb', 'addrs', 1111111111, 'fb', 'insta',
        'lnkdn', 'clg', handleEmptyString(course),
        handleEmptyString(fdate), handleEmptyString(tdate),
        handleEmptyString(sub)
      ]
    );

    res.send(response[0][0]);

  } catch (error) {
    console.error(error);
  }

})

router.post('/passwordUpdate', async function (req, res) {
  const { userid, email, newPass } = req.body;

  console.log(userid, email, newPass);

  try {
    const response = await db.raw(`CALL linkdin_student(${13},${userid},'','${email}','${newPass}',
'${current_date}','in img varchar(250)','in abt varchar(950)','in com varchar(250)',
'in jb varchar(250)','in addrs varchar(250)',${1111111111},'in fb varchar(250)','in insta varchar(250)','in lnkdn varchar(250)','clg','course','${current_date}','${current_date}','sub')`);

    res.send(response[0][0]);

  } catch (error) {
    console.error(error);
  }

})

router.get("/get_All_UserDetails", async function (req, res) {

  try {
    const response = await db.raw(`CALL linkdin_student(${14},${0},'','user','password',
'${current_date}','in img varchar(250)','in abt varchar(950)','in com varchar(250)',
'in jb varchar(250)','in addrs varchar(250)',${1111111111},'in fb varchar(250)','in insta varchar(250)','in lnkdn varchar(250)','clg','in crs varchar(250)','${current_date}','${current_date}','in sub varchar(300)')`);

    res.send(response[0][0]);

  } catch (error) {
    console.error(error);
  }
})

router.get("/get_All_Registered_Users", async function (req, res) {

  try {
    const response = await db.raw(`CALL linkdin_student(${15},${0},'','user','password',
'${current_date}','in img varchar(250)','in abt varchar(950)','in com varchar(250)',
'in jb varchar(250)','in addrs varchar(250)',${1111111111},'in fb varchar(250)','in insta varchar(250)','in lnkdn varchar(250)','clg','in crs varchar(250)','${current_date}','${current_date}','in sub varchar(300)')`);

    res.send(response[0][0]);

  } catch (error) {
    console.error(error);
  }
})

module.exports = router;
