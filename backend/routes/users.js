
const express = require('express');
const router = express.Router();
const dbconfig = require('../knexfile');
const db = require('knex')(dbconfig.development);
const cheakAuth = require("../authmiddleware")
const nodemailer = require("nodemailer");
const apiCntrl = require('../controllers/api')
const  ipAddress = require('../ipconfig');

// console.log(ipAddress);


// function showtime(time_string) {
//   const time = parseInt(time_string, 10);
//   if (time === 0) {
//     return 'Not Selected'
//   }
//   else if (time === 1) {
//     return '10 am - 11 am'
//   }
//   else if (time === 2) {
//     return '11 am - 12 pm'
//   }
//   else if (time === 3) {
//     return '12 pm - 1 pm'
//   }
//   else if (time === 4) {
//     return '1 pm - 2 pm'
//   }
//   else if (time === 5) {
//     return '3 pm - 4 pm'
//   }
//   else if (time === 6) {
//     return '4 pm - 5 pm'
//   }
// }

// function showtime(time_string) {
//   const time = parseInt(time_string, 10);
//   if (time === 0) {
//     return "Not Selected";
//   } else if (time === 1) {
//     return "8.30 am - 9.00 am";
//   } else if (time >= 2 && time <= 29) {
//     const startTimeHour = Math.floor(time / 2) + 8;
//     const startTimeMinute = (time % 2) * 30;
//     const endTimeHour = Math.floor((time + 1) / 2) + 8;
//     const endTimeMinute = ((time + 1) % 2) * 30;

//     console.log(typeof (startTimeHour));
//     console.log(endTimeHour);

//     const startTimeString = `${startTimeHour.toString().padStart(2, '0')}:${startTimeMinute.toString().padStart(2, '0')}`;
//     const endTimeString = `${endTimeHour.toString().padStart(2, '0')}:${endTimeMinute.toString().padStart(2, '0')}`;

//     return `${startTimeString} ${startTimeHour >= 12 ? "pm" : "am"} - ${endTimeString} ${endTimeHour >= 12 ? "pm" : "am"}`;
//   } else {
//     return "Invalid Parameter";
//   }
// }


function showtime(time_string) {
  const time = parseInt(time_string, 10);
  if (time === 0) {
    return "Not Selected";
  }
  else {
    let startTimeHour = 8;
    let endTimeHour = 9;

    for (let i = 0; i < time; i++) {
      if (time === i + 1) {
        startTimeHour = startTimeHour + i;
        endTimeHour = endTimeHour + i;
      }
    }

    console.log(typeof (startTimeHour));
    console.log(endTimeHour);

    const startTimeString = `${startTimeHour.toString().padStart(2, '0')}:30`;
    const endTimeString = `${endTimeHour.toString().padStart(2, '0')}:30`;

    return `${startTimeString} - ${endTimeString}`;
  }
}

async function sendMail(account, link, nm, sub, document) {
  try {
    const testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: 'neokolkata123@gmail.com',
        // pass: 'muyigwugrrkilvxq'
        pass: 'pxwbzukyckbtizjd'
      }
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Neo Metaliks" <neokolkata123@gmail.com>',
      to: account,
      subject: `${sub}- Reference Neo-Metaliks`,
      html: `<p>Hello ${nm}<br/><br/>

      Congratulations from Neo Metaliks.<br/><br/>
      
      This is to inform you that you have been selected for our prestigious Scholarship Programs.<br/><br/>
      
      Please find the below link to fill the necessary details and ${document = 1 ? "Upload your students' details who are eligible and interested in" : "Upload your Documents for"} availing scholarship programs.<br/><br/>
      
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

// Upload your Documents for availing scholarship programs


async function sendMailtoStudent(account, date, time, nm) {
  try {
    const testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: 'neokolkata123@gmail.com',
        // pass: 'muyigwugrrkilvxq'
        pass: 'pxwbzukyckbtizjd'
      }
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Neo Metaliks" <neokolkata123@gmail.com>',
      to: account,
      subject: "Interview Schedule Details- reference Neo-Metaliks",
      html: `<p>Dear ${nm},<br/><br/>

      We are pleased to inform you that you have been shortlisted for the interview process at Neo Metaliks Limited.<br/><br/>
      
      The interview will be conducted on ${date} at ${time}. Please prepare yorself a few minutes early to allow time for to familiarize yourself.<br/><br/>
      
      The interview process will consists of  panel interviews, technical assessments. Please be prepared to discuss your experiences, qualifications, and any specific skills relevant to the role.<br/><br/>
      
      If you have any questions or require further information, please do not hesitate to reach out to us at csr@neometaliks.com.<br/><br/>

      We look forward to meeting you and discussing your potential role with us.<br/><br/>
      
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
async function sendMailtoInterviewer(account, stuname, nm, date, time) {
  try {
    const testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: 'neokolkata123@gmail.com',
        // pass: 'muyigwugrrkilvxq'
        pass: 'pxwbzukyckbtizjd'
      }
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Neo Metaliks" <neokolkata123@gmail.com>',
      to: account,
      subject: "Interview Schedule Details- reference Neo-Metaliks",
      html: `<p> Dear ${nm},<br/><br/>

      I hope this message finds you well. <br/><br/>
      
      We are pleased to inform you that you have been invited for technical discussions for the Candidate ${stuname}. Your expertise and experience will be invaluable in helping us identify the best candidate for this role.<br/><br/>
      
      Date: ${date}<br/><br/>
      Time: ${time}.<br/><br/>
      
      We kindly request your presence for the interview process. Your insights and feedback will play a crucial role in our decision-making process.<br/><br/>

      Should you have any questions or require further information, please feel free to reach out to me directly at csr@neometaliks.com.<br/><br/>

      We look forward to your participation and appreciate your valuable contribution to our selection process.<br/><br/>

      Thank you for your time and consideration.<br/><br/>
      
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
async function sendMailtoCoOrdinator(account, date, time, panelname, stuname, nm) {
  try {
    const testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: 'neokolkata123@gmail.com',
        // pass: 'muyigwugrrkilvxq'
        pass: 'pxwbzukyckbtizjd'
      }
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Neo Metaliks" <neokolkata123@gmail.com>',
      to: account,
      subject: "Interview Schedule Details- reference Neo-Metaliks",
      html: `<p>Dear ${nm},<br/><br/>

      We are pleased to inform you that Interview is being scheduled for the candidate ${stuname}. The details are as follows:<br/><br/>
      
      Date: ${date}<br/><br/>
      Time: ${time}<br/><br/>
      Panelist Name: [${panelname}].<br/><br/>
      
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

const date = new Date();
const current_month = date.getMonth() + 1;
const current_day_of_month = date.getDate(); // Use getDate to get the day of the month.
const current_date = `${date.getFullYear()}-${current_month < 10 ? '0' : ''}${current_month}-${current_day_of_month < 10 ? '0' : ''}${current_day_of_month}`;
const current_minutes = date.getMinutes();
const current_time = `${date.getHours()}:${current_minutes < 10 ? '0' : ''}${current_minutes}`;


const roleDate = new Date();
const nowDate = `${roleDate.getDate()}/${roleDate.getMonth() + 1}/${roleDate.getFullYear()}`



// GET /users
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/emailstatus', async function (req, res, next) {
  const response = await db.raw(`CALL mailstatus()`);
  res.send(response[0][0])
});

router.post('/collegemail', cheakAuth, async function (req, res, next) {
  let id = ""; // Declare id variable for later assignment
  try {
    const collegeid = req.body.coll_Id;
    const mailAccount = req.body.account;
    const name = req.body.clgsname;
    const cmnts = req.body.comments;
    console.log("Email Account:", mailAccount);

    console.log(collegeid, name);

    // Validate email address
    if (!isValidEmail(mailAccount)) {
      return res.status(400).json({ success: false, message: "Invalid email address" });
    }

    // Call the stored procedure to insert mail details
    const insertResult = await db.raw(`CALL insert_mail_details(${1},${collegeid},'${name}', '${mailAccount}', '${cmnts}', "Success",'${current_date}')`);

    // Call the stored procedure to retrieve the id
    const [result] = await db.raw(`CALL collegeid('${name}', '${mailAccount}')`);
    if (result.length > 0) {
      id = result[0][0].Coll_ID;
    }
    console.log(id);
    // Generate the appLink with the retrieved id
    const appLink = `http://${ipAddress}:3001/neometaliks@${id}`;
    // const appLink = `http://192.168.1.2:3001/neometaliks@${id}`;

    // Send the email
    const mailResult = await sendMail(mailAccount, appLink, name, "Upload Student Details", 1);

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
    console.log("Email Account:", mailAccount);

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
    const appLink = `http://${ipAddress}:3002/${encodeURIComponent(`[${id}]`)}`;
    // const appLink = `http://192.168.1.2:3002/${encodeURIComponent(`[${id}]`)}`;

    // Send the email
    const mailResult = await sendMail(mailAccount, appLink, name, "Upload Documents", 0);

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

router.post('/universityform', async (req, res) => {
  try {
    const formData = req.body.form;
    const srno = req.body.id;
    const cname = req.body.colname;
    const cmail = req.body.colemail;
    const cphone = req.body.colphone;
    const prsn = req.body.person;
    const pno = req.body.personno;
    const add = req.body.address;

    let allConstraintsPassed = true;

    for (let i = 0; i < formData.length; i++) {
      const checkResponse = await db.raw(
        `CALL CheckIfStudentDataExists('${formData[i].studentName}', '${formData[i].email}', '${formData[i].studentPhone}', '${formData[i].grade}', '${formData[i].marks}', @errorCode, @errorStatus)`
      );

      const errorCodeResults = await db.raw('SELECT @errorCode AS errorCode');
      const errorStatusResults = await db.raw('SELECT @errorStatus AS errorStatus');
      const errorCode = errorCodeResults[0][0].errorCode; // Retrieve the error code value

      if (errorCode !== 0) {
        // Constraints violated for at least one object
        allConstraintsPassed = false;
        const apiResponse = {
          errorCode: errorCode,
          errorStatus: errorStatusResults[0][0].errorStatus
        };
        console.log(errorStatusResults[0][0]);
        res.send(apiResponse);
        break;
      }
    }

    if (allConstraintsPassed) {
      const insertPromises = formData.map(async (data) => {
        return db.raw(
          `CALL insert_student_by_college('${srno}', '${data.studentName}', '${data.grade}', '${data.studentPhone}', '${data.marks}', '${data.email}', '${data.remarks}', @errorCode)`
        );
      });

      const insertResponses = await Promise.all(insertPromises);
      const Result1 = await db.raw(`CALL insert_college('${srno}', '${cname}', '${cmail}','${cphone}','${prsn}','${pno}','${add}')`);

      const apiResponse = {
        insertResponses,
        Result1
      };

      res.send(apiResponse);
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).send('Internal Server Error');
  }
});



router.get('/colleges', async function (req, res, next) {
  const response = await db.raw(`CALL getcollege()`);
  res.send(response[0][0])
});


router.get('/getstudentbycollege', async function (req, res, next) {
  const id = req.query.clgid;
  const dbmode = req.query.dbmod;
  const stuid = req.query.studentid;
  console.log(id, dbmode, stuid);

  try {
    const response = await db.raw(`CALL getstudentbycollege(${dbmode}, ${id}, ${stuid})`);

    // Check if the response contains data
    if (response[0].length > 0) {
      res.send(response[0][0]);
    } else {
      // Respond with an appropriate error message or status code
      res.status(404).json({ error: "College not found" });
    }
  } catch (error) {
    // Handle any database errors here
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post('/createrole', async function (req, res, next) {
  const role = req.body.roleName;
  const pg = req.body.pages;

  console.log(pg);

  const roleExists = await apiCntrl.findrole(role);
  console.log(roleExists)

  if (roleExists) {
    return res.send("409");
  } else {
    const serializedPages = JSON.stringify(pg);


    try {
      // Call the stored procedure passing each argument separately
      await db.raw(`CALL neoproduction.createRole(?, ?, ?, ?)`, [role, serializedPages, nowDate, 1]);

      // You may also return a success response if needed
      return res.status(200).send("Role created successfully");
    } catch (err) {
      // Handle the error if the stored procedure call fails
      console.error(err);
      return res.status(500).send("Error creating role");
    }
  }
});

router.get('/fetchrole', async function (req, res) {
  res.send(await apiCntrl.fetchrole());
})

router.get('/fetchpages', async function (req, res) {
  const roleid = req.query.roleId;
  res.send(await apiCntrl.fetchpages(roleid));
})

router.get('/fetchusers', async function (req, res) {
  const response = await db.raw(`CALL fetchusers()`);
  res.send(response[0][0])
})

router.get('/fetchSelectedUsers', async function (req, res) {
  const mode = req.query.dbmode;
  const id = req.query.roleid;
  const response = await db.raw(`CALL role_interview(${mode},${id})`);
  console.log(response[0][0]);
  res.send(response[0][0])
})

router.get('/fetchuserdetails', async function (req, res) {
  const id = req.query.roleid;
  console.log(id);
  const response = await db.raw(`CALL fetchuserdetails(${id})`);
  console.log(response[0][0]);
  res.send(response[0][0])
})

router.post('/registerUser', async function (req, res, next) {
  const user = req.body.username;
  const pass = req.body.pwd;
  const id = req.body.roleid;
  const fname = req.body.firstname;
  const lname = req.body.lastname;

  console.log(user, pass, id, fname, lname);

  const userExists = await apiCntrl.finduser(user);
  console.log(userExists)

  if (userExists) {
    return res.send("409");
  }
  else {

    // await apiCntrl.saveuser(user, pass, nowDate, id);
    await db.raw(`CALL createUser(?,?,?,?,?,?)`, [user, pass, nowDate, id, fname, lname]);

    // You may also return a success response if needed
    return res.status(200).send("User Registered successfully");
  }
});

router.post('/updateUser', async function (req, res, next) {
  const roleId = req.body.roleid;
  const pages = req.body.pages; // pages should be a JSON object, not separate strings
  const status = req.body.status;

  try {
    await db.raw('CALL updateRole(?, ?, ?)', [roleId, JSON.stringify(pages), status]);
    res.status(200).json({ message: 'Access list updated successfully' });
  } catch (error) {
    console.error('Error updating access list:', error);
    res.status(500).json({ error: 'An error occurred while updating the access list' });
  }
});

router.post('/userdetails', async function (req, res, next) {
  const dbmode = req.body.mode;
  const id = req.body.mid;
  const phone = req.body.mobile;
  const education = req.body.hedu;
  const stream = req.body.strm;
  const add = req.body.address;
  const position = req.body.posi;
  const experience = req.body.exp;
  const lastcom = req.body.lastcompany;
  const gender = req.body.gndr;
  const other = req.body.oth;
  console.log("userdetails", id, phone, education, stream, add, position, experience, lastcom, gender, other);

  try {
    await db.raw(`CALL createMentor(${dbmode},${id}, '${education}', '${stream}', ${phone}, '${add}', '${position}', '${experience}', '${lastcom}', '${gender}', '${other}')`);
    res.status(200).json({ message: 'Access list updated successfully' });
  } catch (error) {
    console.error('Error updating access list:', error);
    res.status(500).json({ error: 'An error occurred while updating the access list' });
  }
});

router.get('/fetchuseralldetails', async function (req, res, next) {
  const id = req.query.userId;

  try {
    const result = await db.raw('CALL checkMentorId(?, @isPresent)', [id]);
    const selectResult = await db.raw('SELECT @isPresent AS isPresent');

    const isMentorPresent = selectResult[0][0].isPresent;

    if (isMentorPresent === 1) {
      const response = await db.raw(`CALL fetchMentorDetails(${id})`)
      res.status(200).send(response[0][0])
    }
    // else {
    //   res.status(404).json({ error: 'Mentor not found' });
    // }
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'An error occurred while fetching user details' });
  }
});

router.post("/updateuserstatus", async function (req, res) {
  const userid = req.body.userId;
  const userstatus = req.body.status;

  try {
    const response = await apiCntrl.UpdateUserStatus(userid, userstatus);

    // console.log("Status updated successfully:", response);
    console.log(userid, userstatus);

    res.status(200).json({ message: "Status updated successfully" });
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).json({ message: "Error updating user status" });
  }
});

router.post("/firstAprove", async function (req, res) {
  const { dbmode, colId, stuId, sname, sphone, sgrade, smarks, semail, cmnt1, roleid, comment2, fapprove, sec_userid, fdate, finaldate, stuname, stuemail } = req.body;
  console.log(dbmode, colId, stuId, sname, sphone, sgrade, smarks, semail, cmnt1, roleid, comment2, fapprove, sec_userid, fdate, finaldate, stuname, stuemail);

  try {
    const response = await db.raw(`CALL insert_student_initial_screening(${dbmode},${colId},${stuId},${sname},${sphone},${sgrade},${smarks},${semail},'${cmnt1}',${roleid},'${comment2}',${fapprove},${sec_userid},'${fdate}','${finaldate}')`)

    const appLink = `http://${ipAddress}:3002/${encodeURIComponent(`[${stuId}]`)}`;
    // const appLink = `http://192.168.1.2:3002/${encodeURIComponent(`[${stuId}]`)}`;

    const insertResult = await db.raw(`CALL insert_student_notification('${stuname}', '${stuemail}', '${comment2}', "Success")`);

    if (fapprove === 1) {
      const mailResult = await sendMail(stuemail, appLink, stuname, "Upload Documents", 0);
    }
    // console.log("initial screening successfully:", response);

    res.status(200).send(response);
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).send({ message: "Error updating user status" });
  }
});

router.post("/updatefirstAprove", async function (req, res) {
  const { stuId, name, phone, grade, marks, email } = req.body;
  console.log(stuId, name, phone, grade, marks, email);

  try {
    const response = await db.raw(`CALL updateFirstApprove(${stuId},'${name}',${phone},${marks},'${grade}','${email}')`)

    // console.log("initial screening successfully:", response);

    res.status(200).send(response);
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).send({ message: "Error updating user status" });
  }
});

router.get("/fetchstudentdetails", async (req, res) => {

  const userid = req.query.stuid;

  console.log("userid", userid);

  try {
    const response = await db.raw(`CALL insert_student_initial_screening(${2},${null}, ${userid}, ${null}, ${null}, ${null}, ${null},${null}, '', ${null}, '',${null},${null},${null},${null});`)
    console.log(response[0][0][0]);
    res.send(response[0][0][0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred.");
  }
});

router.get("/fetchfirstapprove", async (req, res) => {
  try {
    const response = await db.raw('CALL countstudent()');
    const response2 = await db.raw(`CALL insert_student_initial_screening(${4},${null}, ${null}, ${null}, ${null}, ${null}, ${null},${null}, '', ${null}, '',${null},${null},${null},${null});`)
    const totalRowCount = response[0][0][0].total_count; // Access the total_count value

    console.log(totalRowCount); // Debugging purposes

    res.send({ totalRowCount, response2 }); // Sending the response back
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred.");
  }
});

router.get("/fetchallstudents", async (req, res) => {

  const dbmod = req.query.dbmode;

  console.log("userid", dbmod);

  try {
    const response = await db.raw(`CALL Fetch_All_Students(${dbmod});`)
    console.log(response[0][0]);
    res.send(response[0][0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred.");
  }
});

router.post('/interviewschedule', async function (req, res, next) {
  const dbmode = req.body.mode;
  const cid = req.body.colid;
  const sid = req.body.stuid;
  const co_id = req.body.coordid;
  const co_role = req.body.coordrole;
  const p_id = req.body.panelid;
  const snd_date = req.body.senddate;
  const p_role = req.body.panelrole

  console.log("details", dbmode, cid, sid, co_id, co_role, p_id, snd_date, p_role);
  const serializedStudents = JSON.stringify(sid);
  try {
    await db.raw(`CALL insert_interview_schedule(${dbmode},${cid},${serializedStudents},${p_id},${p_role}, '${snd_date}', ${co_id}, ${co_role}, ${null}, ${null}, ${null}, ${null}, ${null}, ${null})`);
    res.status(200).json({ message: 'Interview Scheduled send successfully' });
  } catch (error) {
    console.error('Error Interview Scheduled send:', error);
    res.status(500).json({ error: 'An error occurred while Interview Scheduled send' });
  }
});

router.get("/fetchrole", async (req, res) => {
  try {
    const response = await db.raw(`CALL getroles()`);
    res.send(response)
  } catch (error) {
    console.error(error);
  }
})

router.post('/additionalRole', async function (req, res, next) {
  const dbmode = 1;
  const userid = req.body.user;
  const roleid = req.body.role;
  // console.log(now());
  console.log(date.getDate());
  try {

    const checkrole = await db.raw('CALL check_additional_role_exist(?,?, @isPresent)', [userid, roleid]);
    const selectResult = await db.raw('SELECT @isPresent AS isPresent');

    const isRolePresent = selectResult[0][0].isPresent;

    if (isRolePresent === 1) {
      res.status(204).json({ message: "Role Already Assigned" });
    } else {
      const result = await db.raw(`CALL additional_role_sp(${dbmode},${userid},${roleid},'${current_date}')`);
      res.status(200).json({ message: 'additonal_role Update successfully' });
    }

  } catch (error) {
    console.error('Error additonal_role Update:', error);
    res.status(500).json({ error: 'An error occurred while additonal_role Update' });
  }
});

router.get('/fetchaddrole', async function (req, res, next) {
  const id = req.query.userId;
  console.log(id);
  try {
    // Call the stored procedure to check for additional roles
    const result = await db.raw('CALL checkAddRole(?, @isPresent)', [id]);

    // Select the value of @isPresent from the stored procedure
    const selectResult = await db.raw('SELECT @isPresent AS isPresent');

    // Extract the value of isPresent from the result
    const isPresent = selectResult[0][0].isPresent;

    if (isPresent === 1) {

      const response1 = await db.raw(`CALL additional_role_sp(${2},${id}, ${null}, '2023-10-16')`)
      const response = {
        name: "response1",
        data: response1[0][0]
      }
      res.status(200).send(response);
    } else {
      const response2 = await db.raw(`CALL additional_role_sp(${3},${id}, ${null}, '2023-10-16')`)
      const response = {
        name: "response2",
        data: response2[0][0]
      }
      res.status(200).send(response)
    }

  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'An error occurred while fetching user details' });
  }
});

router.post("/UpdateUserRoleStatus", async function (req, res) {
  const userid = req.body.userId;
  const userstatus = req.body.status;
  const tablename = req.body.table;
  console.log(userid, userstatus, tablename);
  try {
    const response = await apiCntrl.UpdateUserRoleStatus(userid, userstatus, tablename);

    // console.log("Status updated successfully:", response);
    console.log(userid, userstatus, tablename);

    res.status(200).json({ message: "Status updated successfully" });
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).json({ message: "Error updating user status" });
  }
});

router.get('/checkGlobalRoleStatus', async function (req, res, next) {
  const id = req.query.roleId;

  try {
    // Call the stored procedure to check for additional roles
    const result = await db.raw('CALL checkGlobalRoleStatus(?, @isPresent)', [id]);

    // Select the value of @isPresent from the stored procedure
    const selectResult = await db.raw('SELECT @isPresent AS isPresent');

    // Extract the value of isPresent from the result
    const isPresent = selectResult[0][0].isPresent;

    res.status(200).send({ isPresent });

  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'An error occurred while fetching user details' });
  }
});

router.get("/mailReports", async function (req, res) {
  const response = await db.raw(`CALL total_count()`);

  // const response1 = await db.raw(`CALL studentmailstatus()`);
  // const response2 = await db.raw(`CALL mailstatus()`);

  // const response = {
  //   student: response1[0][0],
  //   college: response2[0][0]
  // }
  res.send(response[0][0][0]);
})

router.get("/readyforinterview", async function (req, res) {
  const collegeid = req.query.clgid;
  const mode = req.query.dbmod;
  const response = await db.raw(`CALL readyforinterview(${mode},${collegeid})`);
  res.send(response[0][0]);
});

router.post("/Interview_Schedule", async function (req, res) {
  const { mode, stuid, colid, slot_id, slot_date, slot_time, panelid, co_id } = req.body
  console.log(panelid.length);
  const serializedpanel = JSON.stringify(panelid);

  let interviewersName = [];

  const response = await db.raw(`CALL Interview_Schedule(${mode},${stuid},${colid},${slot_id},'${slot_date}','10:00:00','${serializedpanel}','[]','${current_date}',${1},'${current_date}',${1},'${current_date}',${co_id},${0})`);

  const getresponse1 = await db.raw(`CALL Interview_Schedule(${3},${stuid},${colid},${slot_id},'${slot_date}','10:00:00','${serializedpanel}','[]','${current_date}',${1},'${current_date}',${1},'${current_date}',${co_id},${0})`);

  const getresponse2 = await db.raw(`CALL Interview_Schedule(${4},${stuid},${colid},${slot_id},'${slot_date}','10:00:00','${serializedpanel}','[]','${current_date}',${1},'${current_date}',${1},'${current_date}',${co_id},${0})`);

  console.log(getresponse1[0][0]);
  console.log(getresponse2[0][0]);

  for (let i = 0; i < panelid.length; i++) {
    const response2 = await db.raw(`CALL Interview_Schedule(${2}, ${stuid}, ${colid}, ${slot_id}, '${current_date}', '${current_time}', '${serializedpanel}', '[]', '${current_date}',${1}, '${current_date}',${1}, '${current_date}', ${co_id}, ${panelid[i]})`);
    const mailInterviewer = await sendMailtoInterviewer(getresponse1[0][0][i].panelEmail, getresponse2[0][0][0].name, `${getresponse1[0][0][i].firstname} ${getresponse1[0][0][i].lastname}`, slot_date, showtime(slot_id));

    interviewersName.push(`${getresponse1[0][0][i].firstname} ${getresponse1[0][0][i].lastname}`)
  }

  const mailStudent = await sendMailtoStudent(getresponse2[0][0][0].email, slot_date, showtime(slot_id), getresponse2[0][0][0].name);
  const mailCoOrdinator = await sendMailtoCoOrdinator(getresponse2[0][0][0].userEmail, slot_date, showtime(slot_id), interviewersName, getresponse2[0][0][0].name, `${getresponse2[0][0][0].firstname} ${getresponse2[0][0][0].lastname}`);

  res.send(response);
})

// router.get('/checkStudentDataExist', async function (req, res, next) {
//   const id = req.query.userId;

//   try {
//     // Call the stored procedure to check for additional roles
//     const result = await db.raw('CALL check_student_id_from_studentmaster(?, @isPresent)', [id]);

//     // Select the value of @isPresent from the stored procedure
//     const selectResult = await db.raw('SELECT @isPresent AS isPresent');

//     // Extract the value of isPresent from the result
//     const isPresent = selectResult[0][0].isPresent;
//     console.log(isPresent);

//     res.status(200).send({ isPresent });

//   } catch (error) {
//     console.error('Error fetching user details:', error);
//     res.status(500).json({ error: 'An error occurred while fetching user details' });
//   }
// });


router.get('/checkStudentDataExist', async function (req, res, next) {
  const id = req.query.userId;

  try {
    // Call the stored procedure to check for additional roles
    const result = await db.raw('CALL check_student_id_from_studentmaster(?)', [id]);
    console.log(result[0][0]);
    res.send(result[0][0]);

  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'An error occurred while fetching user details' });
  }
});


router.post("/submitFeedback", async function (req, res) {
  const { stuId, intvwId, sub, com, convic, asp, elg, total, rem, cmnt, interviewers_role } = req.body

  const studentId = parseInt(stuId);
  const interviewerId = parseInt(intvwId);
  const subject = parseFloat(sub);
  const comm = parseFloat(com);
  const con = parseFloat(convic);
  const aspiration = parseFloat(asp);
  const eligibl = parseFloat(elg);
  const remarks = parseInt(rem);
  const role_ids = interviewers_role;

  console.log("role_ids", role_ids, typeof (role_ids));

  let feedback_count = 0;
  let reject_count = 0;
  let notAppread_count = 0;

  console.log("rem", remarks, typeof (remarks));
  console.log("roleid", role_ids, typeof (role_ids));

  const response = await db.raw(`CALL get_interview_feedback(${1},${studentId},${interviewerId},${subject},${comm},${con},${aspiration},${eligibl},${total},${remarks},'${cmnt}')`);

  for (const i in role_ids) {
    const response2 = await db.raw(`CALL get_interview_feedback(${2},${studentId},${role_ids[i]},${subject},${comm},${con},${aspiration},${eligibl},${total},${remarks},'${cmnt}')`);
    console.log("response2[0][0][0]", response2[0][0][0]);
    if (response2[0][0][0].interview_feedback_status === 1 && response2[0][0][0].remarks === 1) {
      feedback_count = feedback_count + 1;
    }

    if (response2[0][0][0].interview_feedback_status === 1 && response2[0][0][0].remarks === 10) {
      reject_count = reject_count + 1;
    }
    else if (response2[0][0][0].interview_feedback_status === 1 && response2[0][0][0].remarks === 11) {
      notAppread_count = notAppread_count + 1;
    }

    console.log(i, response2[0][0]);
  }

  if (feedback_count === role_ids.length) {
    const response3 = await db.raw(`CALL get_interview_feedback(${3},${studentId},${interviewerId},${subject},${comm},${con},${aspiration},${eligibl},${total},${remarks},'${cmnt}')`);
  }

  if (reject_count > 0) {
    const response3 = await db.raw(`CALL get_interview_feedback(${4},${studentId},${interviewerId},${subject},${comm},${con},${aspiration},${eligibl},${total},${remarks},'${cmnt}')`);
  }

  if (notAppread_count === role_ids.length) {
    const response3 = await db.raw(`CALL get_interview_feedback(${5},${studentId},${interviewerId},${subject},${comm},${con},${aspiration},${eligibl},${total},${remarks},'${cmnt}')`);
  }
  else if (notAppread_count > 0) {
    const response3 = await db.raw(`CALL get_interview_feedback(${4},${studentId},${interviewerId},${subject},${comm},${con},${aspiration},${eligibl},${total},${remarks},'${cmnt}')`);
  }

  console.log(feedback_count);
  console.log(role_ids.length);

  res.send(response)
})

router.get("/get_college_list", async function (req, res) {
  const response = await db.raw(`CALL insert_mail_details(${2},${1},'name', 'mailAccount', 'cmnts', "Success",'${current_date}')`);
  res.send(response[0][0])
})

router.get("/get_college_name", async function (req, res) {
  const clgid = req.query.colid;
  console.log(clgid);
  const response = await db.raw(`CALL getstudentbycollege(${3}, ${clgid}, ${1})`);
  res.send(response[0][0][0]);
}
)

router.get("/total_funds_disbursed_till_date", async function (req, res) {
  
  try {
    const response = await db.raw(`CALL get_disbursment_master(
        ${5},${1},'sem',${0},'2023-12-20',
        'acd_year',${1},'a_email','${current_date}',${3}, 'photo')`);
    console.log(response);
    res.send(response[0][0]);
  } catch (error) {
    console.log(error);
  }
}
)

module.exports = router;
