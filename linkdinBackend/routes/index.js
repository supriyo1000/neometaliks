var express = require('express');
var router = express.Router();
const multer = require("multer");
var db = require("../knex");


const date = new Date();
const current_month = date.getMonth() + 1;
const current_day_of_month = date.getDate(); // Use getDate to get the day of the month.
const current_date = `${date.getFullYear()}-${current_month < 10 ? '0' : ''}${current_month}-${current_day_of_month < 10 ? '0' : ''}${current_day_of_month}`;
const current_minutes = date.getMinutes();
const current_time = `${date.getHours()}:${current_minutes < 10 ? '0' : ''}${current_minutes}`;


const roleDate = new Date();
const nowDate = `${roleDate.getDate()}/${roleDate.getMonth() + 1}/${roleDate.getFullYear()}`


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

router.post("/imageUpload", upload.single("profilePic"), async (req, res) => {
  console.log(req.file);
  const user = req.query.userid;
  const userId = parseInt(user, 10);
  const dbmode = req.query.mode;
  console.log(userId);
  const photo = req.file.originalname;

  console.log(photo);
  console.log(dbmode);

  const response = await db.raw(`CALL linkdin_student(${dbmode},${user},'','${user}','password',
'${current_date}',
'${user}-${photo}',
'in abt varchar(950)',
'in com varchar(250)',
'in jb varchar(250)',
'in addrs varchar(250)',
${1111111111},'in fb varchar(250)','in insta varchar(250)','in lnkdn varchar(250)',"clg",
'in crs varchar(250)','${current_date}','${current_date}','in sub varchar(300)')`)
  res.status(200).json({ message: 'photo updated successfully' });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
