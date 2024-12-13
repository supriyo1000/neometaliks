var express = require('express');
var router = express.Router();
var apiCtrl = require("../controllers/api")
const dbconfig = require('../knexfile');
const db = require('knex')(dbconfig.development);
const fs = require("fs");
const path = require('path');


const date = new Date();
const current_month = date.getMonth() + 1;
const current_day_of_month = date.getDate(); // Use getDate to get the day of the month.
const current_date = `${date.getFullYear()}-${current_month < 10 ? '0' : ''}${current_month}-${current_day_of_month < 10 ? '0' : ''}${current_day_of_month}`;
const current_minutes = date.getMinutes();
const current_time = `${date.getHours()}:${current_minutes < 10 ? '0' : ''}${current_minutes}`;


/* GET home page. */

const bcrypt = require('bcrypt');

function hashPassword(password) {
  const saltRounds = 5;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  return hashedPassword;
}



router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/registeruser', async function (req, res, next) {
  const user = req.body.username;
  const password = req.body.pass;
  const hashedPassword = hashPassword(password);

  const ins = await db.raw(`CALL userlogin('${user}','${hashedPassword}')`)
  res.send("update successfully")

})

router.post('/updatestatus', async function (req, res, next) {
  const id = req.body.stid;
  // console.log(id);

  const updatedStatus = await apiCtrl.getUpdatestatus(id);
  res.status(200).json({ message: "status update successfully", status: updatedStatus });
});


router.get('/usersdetails', async function (req, res, next) {
  res.json(await db.raw(`CALL get_list()`))

});

router.post('/register', async function (req, res, next) {
  const user = req.body.username;
  const password = req.body.pass;

  try {
    const response = await db.raw(`CALL get_user_login_details('${user}')`);
    // console.log("res is ", response[0][0][0]);
    if (response[0].length === 0) { // <-- check if the response array is empty
      res.status(401).send('Invalid username or password');
    } else {
      const hashedPassword = response[0][0][0].mypassword;
      // console.log(hashedPassword);
      const result = await bcrypt.compare(password, hashedPassword);
      if (result) {
        // localStorage.setItem("studentid", response[0][0][0].id)
        res.send(response[0][0][0]);
      } else {
        res.status(402).send('Invalid username or password');
      }


    }
  } catch (error) {
    // console.error(error);
    res.status(500).send('Error logging in'); // <-- update the status code
  }
});

router.post('/formdata', async function (req, res, next) { 

  // let { stidt,namet, dobt, gendert, fnamet, fot, fait, fopht, foat, addt, pot, pint, pst, munt, pht, apht, eit, mnt, mot, mait, mopht, moat, nost, nobt, nomt, nos2t, nob2t, mo2t, coft, noct, attclgt, rost, clngt, strt, cest, sbt, aost, oiat, futt, xyear, xiiyear, sub, lexam, lyear, lclg, lmarks } = req.body;

  let a = req.body.stidt;
  let b = req.body.namet;
  let c = req.body.dobt;
  let d = req.body.gendert;
  let e = req.body.fnamet;
  let f = req.body.fot;
  let g = req.body.fait;
  let h = req.body.fopht;
  let i = req.body.foat;
  let j = req.body.addt;
  let k = req.body.pot;
  let l = req.body.pint;
  let m = req.body.munt;
  let n = req.body.pht;
  let o = req.body.apht;
  let p = req.body.eit;
  let q = req.body.mnt;
  let r = req.body.mot;
  let s = req.body.mait;
  let t = req.body.mopht;
  let u = req.body.moat;
  let v = req.body.nost;
  let w = req.body.nobt;
  let x = req.body.nomt;
  let y = req.body.nos2t;
  let z = req.body.nob2t;
  let a2 = req.body.mo2t;
  let b2 = req.body.coft;
  let c2 = req.body.noct;
  let d2 = req.body.attclgt;
  let e2 = req.body.rost;
  let f2 = req.body.clngt;
  let g2 = req.body.strt;
  let h2 = req.body.cest;
  let i2 = req.body.sbt;
  let j2 = req.body.aost;
  let k2 = req.body.oiat;
  let k3 = req.body.futt;
  let l2 = req.body.pst;
  let xpyear = req.body.xyear;
  let xiipyear = req.body.xiiyear;
  let subject = req.body.sub;
  let lastexam = req.body.lexam;
  let lecollege = req.body.lclg; 

  let leYear = req.body.lyear === '' ? current_date : req.body.lyear;
  let lemarks = req.body.lmarks === '' ? 0 : req.body.lmarks;

  // const options = [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, a2, b2, c2, d2, e2, f2, g2, h2, i2, j2, k2, k3, l2, xpyear, xiipyear, subject, lastexam, lecollege]
  
  // for (let i = 0; i < options.length; i++) {
  //   if (options[i].includes("'") || options[i].includes('"')){
  //     options[i] = options[i].replace(/['"]/g, ''); // Remove single and double quotes
  //   }
  // }


  // try {
  //   const response = await db.raw(`CALL insert_student(${a},'${b}','${c}',${n},${o},'${p}','${d}')`,[a,b,c,n,o,p,d]);
  //   const response1 = await db.raw(`CALL insert_father(${a},'${e}','${f}','${g}','${h}','${i}')`);
  //   const response2 = await db.raw(`CALL insert_address(${a},'${j}','${k}','${l}','${l2}','${m}')`);
  //   const response3 = await db.raw(`CALL insert_mother(${a},'${q}','${r}','${s}','${t}','${u}')`);
  //   const response4 = await db.raw(`CALL insert_education(${a},'${v}','${w}','${x}','${y}','${z}','${a2}','${xpyear}','${xiipyear}','${lastexam}','${leYear}','${lecollege}','${lemarks}')`);
  //   const response5 = await db.raw(`CALL insert_scholarship(${a},'${b2}','${c2}','${d2}','${e2}','${f2}','${g2}','${h2}','${i2}','${j2}','${k2}','${k3}','${subject}')`);

  //   // console.log(response, response1, response2, response3,response4,response5);
  //   res.send("upload successfully")

  try {
    const response = await db.raw(`CALL insert_student(?,?,?,?,?,?,?)`, [a, b, c, n, o, p, d]);
    const response1 = await db.raw(`CALL insert_father(?,?,?,?,?,?)`, [a, e, f, g, h, i]);
    const response2 = await db.raw(`CALL insert_address(?,?,?,?,?,?)`, [a, j, k, l, l2, m]);
    const response3 = await db.raw(`CALL insert_mother(?,?,?,?,?,?)`, [a, q, r, s, t, u]);
    const response4 = await db.raw(`CALL insert_education(?,?,?,?,?,?,?,?,?,?,?,?,?)`, [a, v, w, x, y, z, a2, xpyear,xiipyear,lastexam,leYear,lecollege,lemarks]);
    const response5 = await db.raw(`CALL insert_scholarship(?,?,?,?,?,?,?,?,?,?,?,?,?)`, [a, b2, c2, d2, e2, f2, g2, h2, i2, j2, k2, k3, subject]);

    // console.log(response, response1, response2, response3,response4,response5);
    res.send("upload successfully")


    // console.log("res is ", response[0][0][0]);
    // if (response[0].length === 0) { // <-- check if the response array is empty
    //   res.status(401).send('Invalid username or password');
    // } else {
    //   const hashedPassword = response[0][0][0].mypassword;
    //   console.log(hashedPassword);
    //   const result = await bcrypt.compare(password, hashedPassword);
    //   if (result) {
    //     res.send('Login successful');
    //   } else {
    //     res.status(402).send('Invalid username or password');
    //   }


    // }
  } catch (error) {
    console.error(error);
    res.status(500); // <-- update the status code
  }
});

router.post('/unset_formdata', async function (req, res, next) {

  let mode = req.body.mode;

  let a = req.body.stidt;
  let b = req.body.namet;
  let c = req.body.dobt;
  let d = req.body.gendert;
  let e = req.body.fnamet;
  let f = req.body.fot;
  let g = req.body.fait;
  let h = req.body.fopht;
  let i = req.body.foat;
  let j = req.body.addt;
  let k = req.body.pot;
  let l = req.body.pint;
  let m = req.body.munt;
  let n = req.body.pht;
  let o = req.body.apht;
  let p = req.body.eit;
  let q = req.body.mnt;
  let r = req.body.mot;
  let s = req.body.mait;
  let t = req.body.mopht;
  let u = req.body.moat;
  let v = req.body.nost;
  let w = req.body.nobt;
  let x = req.body.nomt;
  let y = req.body.nos2t;
  let z = req.body.nob2t;
  let a2 = req.body.mo2t;
  let b2 = req.body.coft;
  let c2 = req.body.noct;
  let d2 = req.body.attclgt;
  let e2 = req.body.rost;
  let f2 = req.body.clngt;
  let g2 = req.body.strt;
  let h2 = req.body.cest;
  let i2 = req.body.sbt;
  let j2 = req.body.aost;
  let k2 = req.body.oiat;
  let k3 = req.body.futt;
  let l2 = req.body.pst;
  let xpyear = req.body.xyear;
  let xiipyear = req.body.xiiyear;
  let subject = req.body.sub;
  let lastexam = req.body.lexam;
  let lecollege = req.body.lclg;

  let leYear = req.body.lyear === '' ? current_date : req.body.lyear;
  let lemarks = req.body.lmarks === '' ? 0 : req.body.lmarks;

  try {
    if (mode === 1) {
      const response = await db.raw(`CALL insert_student(?,?,?,?,?,?,?)`, [a, b, c, n, o, p, d]);
    }
    else if (mode === 2) {
      const response5 = await db.raw(`CALL insert_scholarship(?,?,?,?,?,?,?,?,?,?,?,?,?)`, [a, b2, c2, d2, e2, f2, g2, h2, i2, j2, k2, k3, subject]);
    }
    else if (mode === 3) {
      const response3 = await db.raw(`CALL insert_mother(?,?,?,?,?,?)`, [a, q, r, s, t, u]);
    }
    else if (mode === 4) {
      const response1 = await db.raw(`CALL insert_father(?,?,?,?,?,?)`, [a, e, f, g, h, i]);
    }
    else if (mode === 5) {
      const response4 = await db.raw(`CALL insert_education(?,?,?,?,?,?,?,?,?,?,?,?,?)`, [a, v, w, x, y, z, a2, xpyear, xiipyear, lastexam, leYear, lecollege, lemarks]);
    }
    else if (mode === 6) {
      const response2 = await db.raw(`CALL insert_address(?,?,?,?,?,?)`, [a, j, k, l, l2, m]);
    }
    
    res.send("upload successfully")

  } catch (error) {
    console.error(error);
    res.status(500); // <-- update the status code
  }
});



// router.post("/alldata", async (req, res) => {
//   const stid = req.body.stid;
//   if (stid) {
//     const response = await db.raw(`CALL get_student_details('${stid}')`);
//     const response2 = await db.raw(`CALL get_file_details('${stid}')`);
//     res.send(response)
//     res.send(response2)
//   }
//   res.send("not valid")
// })

router.post("/alldata", async (req, res) => {
  const stuid = req.body.stid;
  const stid = parseInt(stuid, 10);
  console.log("id is", stid);
  if (stid) {
    const response = await db.raw(`CALL get_student_details(${stid})`);
    const response2 = await db.raw(`CALL get_file_details(${stid})`);
    const data = {
      studentDetails: response,
      fileDetails: response2
    };
    res.send(data);
  } else {
    res.status(400).send("Invalid request");
  }
});


router.post("/checkuser", async (req, res) => {
  const stid = req.body.stidt;
  // console.log(stid);
  // console.log("id is", stid);
  if (stid) {
    const response = await db.raw(`CALL get_student_details('${stid}')`);
    const data = {
      studentDetails: response
    };
    if (data.studentDetails[0][0].length > 0) {
      res.status(202).send(data);
    } else {
      res.status(502).send("No data found");
    }
  } else {
    res.status(400).send("Invalid request");
  }
});


router.get('/submissions', (req, res) => {
  const countSql = 'SELECT COUNT(*) as count FROM studentmaster WHERE status = "new"';
  const dataSql = 'SELECT * FROM studentmaster WHERE status = "new"';

  // Execute the count query to get the number of new form submissions
  db.raw(countSql)
    .then(countResult => {
      const count = countResult[0][0].count;

      // Execute the data query to fetch the new form submissions
      db.raw(dataSql)
        .then(dataResult => {
          res.json({ count, submissions: dataResult[0] });
        })
        .catch(dataErr => {
          // console.error('Error retrieving form submissions:', dataErr);
          res.status(500).json({ error: 'Failed to fetch form submissions' });
        });
    })
    .catch(countErr => {
      // console.error('Error counting form submissions:', countErr);
      res.status(500).json({ error: 'Failed to count form submissions' });
    });
});

router.get('/download-image', (req, res) => {
  const image = req.query.imageId; // You may need to retrieve the image file path or name based on the imageId.
  console.log("image", image);

  // Replace 'imagePath' with the actual path to your images directory.
  const imagePath = `./uploads/${image}`;

  // Read the image file from the server.
  const fileStream = fs.createReadStream(imagePath);

  // Set headers to indicate a file download with a specific file name.
  res.setHeader('Content-Disposition', `attachment; filename="${image}"`);
  res.setHeader('Content-Type', 'image/jpeg');

  // Pipe the image file stream to the response.
  fileStream.pipe(res);
  res.status(200);
});



module.exports = router;
