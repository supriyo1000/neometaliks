
const express = require("express");
const router = express();
const multer = require("multer");
const apiCtrl = require('../controllers/api');
const dbconfig = require('../knexfile');
const ipAddress = require("../ipconfig");
const db = require('knex')(dbconfig.development)

// const app = express();
const date = new Date();
const showTime = date.getHours()
    + ':' + date.getMinutes()
let dateMDY = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: async (req, file, cb) => {
        // cb(null, `${file.originalname}-${showTime}-${dateMDY}`);
        // cb(null, file.originalname)
        const fileName = file.originalname;
        const stid = req.query.stidt;
        const newFileName = `${stid}-${fileName}`;
        cb(null, newFileName);
    },
});

const upload = multer({ storage });

router.post("/uploadimage", upload.fields([{ name: "psp" }, { name: "pap" }, { name: "fip" }, { name: "mip" }, { name: "pop" }, { name: "fbs" }, { name: "mbs" }, { name: "sbs" }, { name: "adh" }, { name: "msp" }, { name: "ivf" }, { name: "ia" }, { name: "fsc" }, { name: "id" }, { name: "marksdoc" }]), async (req, res) => {
    console.log(req.files.psp[0]);
    const stid = req.query.stidt;
    console.log(stid);
    const psp = req.files.psp[0].originalname
    const pap = req.files.pap[0].originalname
    const fip = req.files.fip[0].originalname
    const mip = req.files.mip[0].originalname
    const pop = req.files.pop[0].originalname
    const fbs = req.files.fbs[0].originalname
    const mbs = req.files.mbs[0].originalname
    const sbs = req.files.sbs[0].originalname
    const adh = req.files.adh[0].originalname
    const msp = req.files.msp[0].originalname
    const ivf = req.files.ivf[0].originalname
    const ia = req.files.ia[0].originalname
    const fsc = req.files.fsc[0].originalname
    const id = req.files.id[0].originalname
    const marksdoc = req.files.marksdoc ? req.files.marksdoc[0].originalname : "";



    console.log(psp, pap, fip, mip, pop, fbs, mbs, sbs, adh, msp, ivf, ia, fsc, id);

    const sp = await db.raw(`call insert_files('${stid}','${stid}-${psp}', '${stid}-${pap}', '${stid}-${fip}', '${stid}-${mip}','${stid}-${pop}', '${stid}-${fbs}', '${stid}-${mbs}', '${stid}-${sbs}','${stid}-${adh}', '${stid}-${msp}', '${stid}-${ivf}', '${stid}-${ia}','${stid}-${fsc}', '${stid}-${id}','${stid}-${marksdoc}')`);

    res.send("Files uploaded successfully");
});


// router.get("/viewimage",async (req,res)=>{

//     const vw = await apiCtrl.getAllimage();

// //    const imageFiles = [vw[0].username,vw[0].name,vw[0].email,vw[0].password];
// //    const images = imageFiles.map((imageName) => {
// //     return `${__dirname}/path/to/uploads/${imageName}`;

// res.send(vw)
//   });

router.get("/viewimage", async (req, res) => {
    const vw = await apiCtrl.getAllimage();
    const imageFiles = [vw[0].username, vw[0].name, vw[0].email, vw[0].password];
    const images = imageFiles.map((imageName) => {
        return `http://${ipAddress}:8001/${imageName}`;
    });
    res.send(images);
});


// router.use(express.static("uploads"));

module.exports = router;