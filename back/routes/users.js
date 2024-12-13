// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const dbconfig = require('../knexfile');
const db = require('knex')(dbconfig.development)
const nodemailer = require("nodemailer");
const puppeteer = require('puppeteer');
const apiCntrl = require('../controllers/api');

async function sendMail(account, link, nm) {
  try {
    const testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: 'neokolkata123@gmail.com',
        pass: 'pxwbzukyckbtizjd'
      }
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"NeoMetaliks Admin" <chatterjees368@gmail.com>',
      to: account,
      subject: "Registration for Scholarship",
      html: `<p>Hello ${nm}<br/><br/>

      Congratulations from Neo Metaliks.<br/><br/>
      
      This is to inform you that you have been selected for our prestigious Scholarship Programs.<br/><br/>
      
      Please find the below link to fill the necessary details and Upload your students' details who are eligible and interested in availing scholarship programs.<br/><br/>
      
      Link: ${link}<br/><br/>
      
      Thanks & Regards-<br/><br/>
      Team Neo Metaliks</p>`
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send email" };
  }
}


async function studentsendMail(account, link, nm) {
  try {
    const testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: 'neokolkata123@gmail.com',
        pass: 'pxwbzukyckbtizjd'
      }
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"NeoMetaliks Admin 👻" <chatterjees368@gmail.com>',
      to: account,
      subject: "Registration For Scholarships",
      html: `<p>
      Dear ${nm}<br/><br/>

      Congratulations from Neo-Metaliks Limited.

      We are happy to inform you that you are selected for our prestigious Scholarship program.<br/><br/>
      Please click the below link and fill necessary details for further process<br/><br/>

      Link: ${link}<br/><br/>
      
      Thanks & Regards-<br/><br/>
      Team Neo Metaliks
      
        </p>`
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send email" };
  }
}


// async function generatePDF() {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   // Navigate to a web page or load HTML content
//   await page.goto('http://localhost:3000/pdfresume'); // Replace with your URL or HTML content

//   // Generate a PDF from the page
//   await page.pdf({
//     path: 'output.pdf', // Output file name
//     format: 'A4',       // Page format (A4 is the default)
//   });

//   await browser.close();
// }

// GET /users
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/emailstatus', async function (req, res, next) {
  const response = await db.raw(`CALL mailstatus()`);
  res.send(response[0][0])
});

// POST /users/collegemail
// router.post('/collegemail', async function (req, res, next) {
//   const id = "";
//   try {
//     const mailAccount = req.body.account;
//     const appLink = `http://192.168.43.175:3000/universityform?srno=${id}`
//     const name = req.body.clgsname;
//     const cmnts = req.body.comments;
//     console.log("Email Account:", mailAccount);

//     // Validate email address
//     if (!isValidEmail(mailAccount)) {
//       return res.status(400).json({ success: false, message: "Invalid email address" });
//     }

//     // const mailResult = await sendMail(mailAccount, appLink, name);
//     // if (mailResult.success) {
//     const response = await db.raw(`CALL insert_mail_details('${name}','${mailAccount}','${cmnts}',"Success")`)
//     const resp = await db.raw(`CALL collegeid('${name}', '${mailAccount}')`)
//     console.log("id id :", resp);
//     id = resp[0][0];
//     const mailResult = await sendMail(mailAccount, appLink, name);

//       res.status(200).json({ success: true, message: "Email sent successfully" });

//   } catch (error) {
//     console.error("Error handling collegemail request:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// });

router.post('/collegemail', async function (req, res, next) {
  let id = ""; // Declare id variable for later assignment
  try {
    const mailAccount = req.body.account;
    const name = req.body.clgsname;
    const cmnts = req.body.comments;
    console.log("Email Account:", name);

    // Validate email address
    if (!isValidEmail(mailAccount)) {
      return res.status(400).json({ success: false, message: "Invalid email address" });
    }

    // Call the stored procedure to insert mail details
    const insertResult = await db.raw(`CALL insert_mail_details('${name}', '${mailAccount}', '${cmnts}', "Success")`);

    // Call the stored procedure to retrieve the id
    const [result] = await db.raw(`CALL collegeid('${name}', '${mailAccount}')`);
    if (result.length > 0) {
      id = result[0][0].id;
    }
    console.log(id);
    // Generate the appLink with the retrieved id
    const appLink = `http://localhost:3001/${id}`;

    // Send the email
    const mailResult = await sendMail(mailAccount, appLink, name);

    // Handle the response
    if (mailResult.success) {
      // If the email was sent successfully
      res.status(200).json({ success: true, message: "Email sent successfully" });
    } else {
      // If there was an error sending the email
      res.status(500).json({ success: false, message: "Failed to send email" });
    }
  } catch (error) {
    console.error("Error handling collegemail request:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


router.get('/studentmailstatus', async function (req, res, next) {
  const response = await db.raw(`CALL studentmailstatus()`);
  res.send(response[0][0])
});


router.post('/studentmail', async function (req, res, next) {
  let id = ""; // Declare id variable for later assignment
  try {
    const mailAccount = req.body.account;
    const name = req.body.stuname;
    const cmnts = req.body.comments;
    console.log("Email Account:", name);

    // Validate email address
    if (!isValidEmail(mailAccount)) {
      return res.status(400).json({ success: false, message: "Invalid email address" });
    }

    // Call the stored procedure to insert mail details
    const insertResult = await db.raw(`CALL insert_student_notification('${name}', '${mailAccount}', '${cmnts}', "Success")`);

    // Call the stored procedure to retrieve the id
    const [result] = await db.raw(`CALL studentid('${name}', '${mailAccount}')`);
    if (result.length > 0) {
      id = result[0][0].id;
    }
    console.log(id);
    // Generate the appLink with the retrieved id
    const appLink = `http://103.184.242.25:3002`;

    // Send the email
    const mailResult = await studentsendMail(mailAccount, appLink, name);

    // Handle the response
    if (mailResult.success) {
      // If the email was sent successfully
      res.status(200).json({ success: true, message: "Email sent successfully" });
    } else {
      // If there was an error sending the email
      res.status(500).json({ success: false, message: "Failed to send email" });
    }
  } catch (error) {
    console.error("Error handling collegemail request:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});



// Function to validate email address
function isValidEmail(email) {
  // Regular expression to validate the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Define a POST route to handle the form submission
// router.post('/universityform',async (req, res) => {
//   const formData = req.body.form;
//   const srno = req.body.id;
//   const cname = req.body.colname;
//   const cmail = req.body.colemail;
//   const cphone = req.body.colphone;
//   const prsn = req.body.person;
//   const pno = req.body.personno;
//   const add = req.body.address;

//   console.log(formData, "no", srno);

//   const Result1 =await db.raw(`CALL insert_college('${srno}', '${cname}', '${cmail}','${cphone}','${prsn}','${pno}','${add}')`);

//   // Insert each object in the array as a separate row
//   formData.map((data) => {
//     return db.raw(`CALL insert_student_by_college('${srno}', '${data.studentName}','${data.grade}', '${data.studentPhone}', '${data.marks}','${data.remarks}')`);

//     res.sendStatus(200);
//   });
// })

router.post('/universityform', async (req, res) => {
  const formData = req.body.form;
  const srno = req.body.id;
  const cname = req.body.colname;
  const cmail = req.body.colemail;
  const cphone = req.body.colphone;
  const prsn = req.body.person;
  const pno = req.body.personno;
  const add = req.body.address;

  console.log(formData, "no", srno);

  const Result1 = await db.raw(`CALL insert_college('${srno}', '${cname}', '${cmail}','${cphone}','${prsn}','${pno}','${add}')`);

  // Insert each object in the array as a separate row
  const insertPromises = formData.map((data) => {
    return db.raw(`CALL insert_student_by_college('${srno}', '${data.studentName}','${data.grade}', '${data.studentPhone}', '${data.marks}','${data.remarks}')`);
  });

  await Promise.all(insertPromises);

  res.sendStatus(200);
});


router.get('/colleges', async function (req, res, next) {
  const response = await db.raw(`CALL getcollege()`);
  res.send(response[0][0])
});


router.get('/getstudentbycollege', async function (req, res, next) {
  const id = req.query.clgid;
  console.log(id);
  const response = await db.raw(`CALL getstudentbycollege(${id})`);
  res.send(response[0][0]);
});

// router.get('/getpdf', async (req, res) => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   // Navigate to a web page or load HTML content
//   await page.goto('http://localhost:3000/pdfresume'); // Replace with your URL or HTML content

//   // Generate a PDF from the page
//   const pdfBuffer = await page.pdf({
//     format: 'A4', // Page format (A4 is the default)
//   });

//   await browser.close();

//   // Set the response headers for PDF download
//   res.setHeader('Content-Type', 'application/pdf');
//   res.setHeader('Content-Disposition', 'attachment; filename=downloaded.pdf');

//   // Send the PDF buffer as the response
//   res.send(pdfBuffer);
// });

const options = [
  { value: 'BENGAL COLLEGE OF ENGINEERING & TECHNOLOGY', label: 'BENGAL COLLEGE OF ENGINEERING & TECHNOLOGY' },
  { value: 'ADAMAS INSTITUTE OF TECHNOLOGY', label: 'ADAMAS INSTITUTE OF TECHNOLOGY' },
  { value: 'SUPREME KNOWLEDGE FOUNDATION GROUP OF INSTITUTIONS', label: 'SUPREME KNOWLEDGE FOUNDATION GROUP OF INSTITUTIONS' },
  { value: 'DURGAPUR INSTITUTE OF MANAGEMENT AND SCIENCE', label: 'DURGAPUR INSTITUTE OF MANAGEMENT AND SCIENCE' },
  { value: 'APEX MANAGEMENT INSTITUTE', label: 'APEX MANAGEMENT INSTITUTE' },
  { value: 'NARULA INSTITUTE OF TECHNOLOGY', label: 'NARULA INSTITUTE OF TECHNOLOGY' },
  { value: 'RCC INSTITUTE OF INFORMATION TECHNOLOGY', label: 'RCC INSTITUTE OF INFORMATION TECHNOLOGY' },
  { value: 'ASANSOL ENGINEERING COLLEGE', label: 'ASANSOL ENGINEERING COLLEGE' },
  { value: 'TECHNO INDIA', label: 'TECHNO INDIA' },
  { value: 'SWAMI VIVEKANANDA INSTITUTE OF MANAGEMENT & COMPUTER SCIENCE', label: 'SWAMI VIVEKANANDA INSTITUTE OF MANAGEMENT & COMPUTER SCIENCE' },
  { value: 'NSHM KNOWLEDGE CAMPUS, DURGAPUR - GROUP OF INSTITUTIONS', label: 'NSHM KNOWLEDGE CAMPUS, DURGAPUR - GROUP OF INSTITUTIONS' },
  { value: 'DUMKAL INSTITUTE OF ENGINEERING & TECHNOLOGY', label: 'DUMKAL INSTITUTE OF ENGINEERING & TECHNOLOGY' },
  { value: 'NETAJI SUBHASH ENGINEERING COLLEGE', label: 'NETAJI SUBHASH ENGINEERING COLLEGE' },
  { value: 'DR. B.C. ROY ENGINEERING COLLEGE', label: 'DR. B.C. ROY ENGINEERING COLLEGE' },
  { value: 'BANKURA UNNAYANI INSTITUTE OF ENGINEERING', label: 'BANKURA UNNAYANI INSTITUTE OF ENGINEERING' },
  { value: 'FUTURE INSTITUTE OF ENGINEERING AND MANAGEMENT', label: 'FUTURE INSTITUTE OF ENGINEERING AND MANAGEMENT' },
  { value: 'B. P. PODDAR INSTITUTE OF MANAGEMENT & TECHNOLOGY', label: 'B. P. PODDAR INSTITUTE OF MANAGEMENT & TECHNOLOGY' },
  { value: 'GOENKA COLLEGE OF COMMERCE AND BUSINESS ADMINISTRATION', label: 'GOENKA COLLEGE OF COMMERCE AND BUSINESS ADMINISTRATION' },
  { value: 'CAMELLIA INSTITUTE OF TECHNOLOGY', label: 'CAMELLIA INSTITUTE OF TECHNOLOGY' },
  { value: 'HOOGHLY ENGINEERING & TECHNOLOGY COLLEGE', label: 'HOOGHLY ENGINEERING & TECHNOLOGY COLLEGE' },
  { value: 'GOVT. COLLEGE OF ENGG. & TEXTILE TECHNOLOGY', label: 'GOVT. COLLEGE OF ENGG. & TEXTILE TECHNOLOGY' },
  { value: 'KANAD INSTITUTE OF ENGINEERING & MANAGEMENT', label: 'KANAD INSTITUTE OF ENGINEERING & MANAGEMENT' },
  { value: 'BUDGE BUDGE INSTITUTE OF TECHNOLOGY', label: 'BUDGE BUDGE INSTITUTE OF TECHNOLOGY' },
  { value: 'JIS COLLEGE OF ENGINEERING', label: 'JIS COLLEGE OF ENGINEERING' },
  { value: 'DREAM INSTITUTE OF TECHNOLOGY', label: 'DREAM INSTITUTE OF TECHNOLOGY' },
  { value: "SANAKA EDUCATIONAL TRUSTS GROUP OF INSTITUTIONS", label: "SANAKA EDUCATIONAL TRUST'S GROUP OF INSTITUTIONS" },
  { value: 'MCKV INSTITUTE OF ENGINEERING', label: 'MCKV INSTITUTE OF ENGINEERING' },
  { value: 'SILIGURI INSTITUTE OF TECHNOLOGY', label: 'SILIGURI INSTITUTE OF TECHNOLOGY' },
  { value: 'INSTITUTE OF HOTEL AND RESTAURANT MANAGEMENT', label: 'INSTITUTE OF HOTEL AND RESTAURANT MANAGEMENT' },
  { value: 'DR. SUDHIR CHANDRA SUR DEGREE ENGINEERING COLLEGE', label: 'DR. SUDHIR CHANDRA SUR DEGREE ENGINEERING COLLEGE' },
  { value: 'NETAJI SUBHAS CHANDRA BOSE INSTITUTE OF PHARMACY', label: 'NETAJI SUBHAS CHANDRA BOSE INSTITUTE OF PHARMACY' },
  { value: 'PAILAN COLLEGE OF MANAGEMENT & TECHNOLOGY', label: 'PAILAN COLLEGE OF MANAGEMENT & TECHNOLOGY' },
  { value: 'KINGSTON ENGINEERING COLLEGE', label: 'KINGSTON ENGINEERING COLLEGE' },
  { value: 'FALAKATA POLYTECHNIC', label: 'FALAKATA POLYTECHNIC' },
  { value: 'NIBEDITA INSTITUTE OF TECHNOLOGY', label: 'NIBEDITA INSTITUTE OF TECHNOLOGY' },
  { value: 'JADAVPUR UNIVERSITY', label: 'JADAVPUR UNIVERSITY' },
  { value: 'GURU NANAK INSTITUTE OF PHARMACEUTICAL SCIENCE & TECHNOLOGY', label: 'GURU NANAK INSTITUTE OF PHARMACEUTICAL SCIENCE & TECHNOLOGY' },
  { value: 'JYOTIRMOY SCHOOL OF BUSINESS', label: 'JYOTIRMOY SCHOOL OF BUSINESS' },
  { value: 'KALNA POLYTECHNIC', label: 'KALNA POLYTECHNIC' },
  { value: 'DURGAPUR SOCIETY OF MANAGEMENT SCIENCE', label: 'DURGAPUR SOCIETY OF MANAGEMENT SCIENCE' },
  { value: "WOMENS POLYTECHNIC", label: "WOMEN'S POLYTECHNIC" },
  { value: "Durgapur Womens College, Durgapur, West Bengal", label: "Durgapur Womens College, Durgapur, West Bengal" },
  { value: "Mother Vannini School of Nursing, Tadepalligudem ", label: "Mother Vannini School of Nursing, Tadepalligudem " },
  { value: "Ramakrishna Mission Shilpa Mandira, Belur, Howrah", label: "Ramakrishna Mission Shilpa Mandira, Belur, Howrah" },
  { value: "Don Bosco University, Guwahati, Assam", label: "Don Bosco University, Guwahati, Assam" },
  { value: "Rajendra Academy for Teacher Education , Durgapur, West Bengal", label: "Rajendra Academy for Teacher Education , Durgapur, West Bengal" },
  { value: "St. Xaviers College, Kolkata", label: "St. Xaviers College, Kolkata" },
];

router.get('/insertcollegelist', async function (req, res) {
  let listLength = options.length;
  for (let i = 0; i < listLength; i++) {
    let lower = options[i].value.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
    console.log(lower);
    const response = await db.raw(apiCntrl.insertCollegeList(lower));
    console.log(response);
  }
  res.send("successfull")
})


module.exports = router;

