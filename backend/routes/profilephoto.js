const express = require("express");
const router = express();
const multer = require("multer");
const apiCtrl = require('../controllers/api');
const dbconfig = require('../knexfile');
const ipAddress = require("../ipconfig");
const db = require('knex')(dbconfig.development);

const date = new Date();
const showTime = date.getHours() + ':' + date.getMinutes();
let dateMDY = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

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

router.post("/uploadprofile", upload.single("photo"), async (req, res) => {
    console.log(req.file);
    const user = req.query.userid;
    const userId = parseInt(user, 10);
    const dbmode = req.query.mode;
    console.log(typeof(userId));
    const photo = req.file.originalname;

    console.log(photo);

    const sp = await db.raw(`call profilepicture(${dbmode},${userId}, '${userId}-${photo}')`);
    res.status(200).json({ message: 'photo updated successfully' });
});

router.post("/uploadEmailFile", upload.single("photo"), async (req, res) => {
    console.log(req.file);
    const user = req.query.userid;
    const userId = parseInt(user, 10);
    // const dbmode = req.query.mode;
    console.log(typeof (userId));
    const photo = req.file.originalname;

    console.log(photo);

    const response = await db.raw(`CALL getFundMaster(${4},'2023-2024',${100},${100},${100}
        ,${1}, '2023-11-12', ${null}, '2023-11-12',${0},'null',${userId},'${userId}-${photo}')`);
    res.status(200).json({ message: 'Email File Uploaded successfully' });
});

router.post("/updateEmailFile", upload.single("photo"), async (req, res) => {
    console.log(req.file);
    const user = req.query.userid;
    const userId = parseInt(user, 10);
    // const dbmode = req.query.mode;
    console.log(typeof (userId));
    const photo = req.file.originalname;

    console.log(photo);

    const response = await db.raw(`CALL getFundMaster(${4},'2023-2024',${100},${100},${100}
        ,${1}, '2023-11-12', ${null}, '2023-11-12',${0},'null',${userId},'${userId}-${photo}')`);
    res.status(200).json({ message: 'Email File Updated successfully' });
});

router.get("/viewimage", async (req, res) => {
    const vw = await apiCtrl.getAllimage();
    const imageFiles = [vw[0].username, vw[0].name, vw[0].email, vw[0].password];
    const images = imageFiles.map((imageName) => {
        return `http://${ipAddress}:8000/uploads/${imageName}`;
    });
    res.send(images);
});

module.exports = router;
