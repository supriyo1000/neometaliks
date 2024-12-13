const express = require('express');
const router = express.Router();
const dbconfig = require('../knexfile');
const db = require('knex')(dbconfig.development);
const cheakAuth = require("../authmiddleware")
const nodemailer = require("nodemailer");
const apiCntrl = require('../controllers/api')

const date = new Date();
const current_month = date.getMonth() + 1;
const current_day_of_month = date.getDate(); // Use getDate to get the day of the month.
const current_date = `${date.getFullYear()}-${current_month < 10 ? '0' : ''}${current_month}-${current_day_of_month < 10 ? '0' : ''}${current_day_of_month}`;
const current_minutes = date.getMinutes();
const current_time = `${date.getHours()}:${current_minutes < 10 ? '0' : ''}${current_minutes}`;


const studentRejectMailbody = (stuname) => {
    return `<p>Dear ${stuname},<br/><br/>

      I hope this message finds you well.<br/><br/>
      
      I would like to express our sincere appreciation for your interest in the Neo Metaliks Scholarship Sikhsa Samarth Programm and for the effort you put into your application.<br/><br/>
      
      After careful consideration, we regret to inform you that your application for Sikhsa Samarth Program has not been selected. 
      We received a large number of highly qualified applicants, and the decision-making process was extremely challenging.<br/><br/>
      
      Please be aware that this decision is not a reflection of your qualifications, skills, or potential. We recognize the dedication and hard work you have put into your academic pursuits, and we commend your commitment.<br/><br/>

      We understand that this news may be disappointing, and we encourage you to continue pursuing your academic and professional goals.<br/><br/>

      If you have any questions or would like feedback on your application, please feel free to contact us at csr@neometaliks.com. 
      We are more than willing to provide insights that may be helpful for future applications<br/><br/>

      Thank you once again for considering Sikhsa Samarth Programme, and we wish you continued success in your academic and personal endeavors.<br/><br/>

      Sincerely,<br/><br/>
      Team Neo Metaliks</p>`
}

const studentApprovalMailBody = (stuname) => {
    return `<p>Dear ${stuname},<br/><br/>

      I am delighted to inform you that your application for fund disbursement through the Siksha Samarth Program has been successfully approved. 
      Congratulations! Your dedication and achievements have truly stood out, and we are excited to support you in your academic journey.<br/><br/>
      
      The Siksha Samarth Program committee was impressed with your qualifications, achievements, and the compelling reasons you provided for seeking financial assistance. We believe that the support you'll receive through this fund will contribute significantly to your continued success.<br/><br/>
      
      We look forward to seeing the positive impact this support will have on your academic and personal growth. Once again, congratulations on this well-deserved opportunity.<br/><br/>

      Thanks-<br/><br/>
      Team Neo Metaliks</p>`
}

const collegeApprovalMailBody = (clgname, stuname) => {
    return `<p>Hello ${clgname},<br/><br/>

      I trust this email finds you well. I am writing to inform you of the approval of fund disbursement for ${stuname}, who is currently enrolled at ${clgname}.<br/><br/>
      
      After careful consideration and a thorough review of ${stuname}'s application, we are pleased to announce that their request for financial assistance through the Siksha Samarth Program has been approved. <br/><br/>
      
      We believe that this support will play a crucial role in facilitating ${stuname}'s academic journey and contribute to their overall success.<br/><br/>

      We greatly appreciate your cooperation in making this Siksha Samarth Program accessible to ${stuname}. If there are any administrative steps or paperwork that need to be completed from our end, please do not hesitate to inform us at csr@neometaliks.com.<br/><br/>

      Thank you for your attention to this matter. We look forward to the positive impact that this support will have on ${stuname}'s educational journey<br/><br/>

      Best regards,<br/><br/>
      Team Neo Metaliks</p>`
}

const collegeRejectionMailBody = (clgname, stuname) => {
    return `<p>Hello ${clgname},<br/><br/>

      I trust this message finds you well. I am writing to inform you about the status of the Siksha Samarth Program application for ${stuname}, who is currently enrolled at ${clgname}.<br/><br/>
      
      After careful consideration of ${stuname}'s application for Siksha Samarth Program, we regret to inform you that the application has not been approved in this round. This decision was not made lightly, and we understand the significance of financial support for students.<br/><br/>
      
      We want to express our appreciation for ${stuname}'s interest in the Siksha Samarth Program and recognize their dedication to academic pursuits. The selection process was highly competitive, and unfortunately, we were unable to accommodate all deserving applicants.<br/><br/>

      While we regret that we cannot fulfill ${stuname}'s request for financial assistance at this time, we encourage them to explore alternative avenues for support. Additionally, we appreciate your office's efforts in facilitating the application process, and we value the partnership with ${clgname}.<br/><br/>

      If ${stuname} has any questions or would like feedback on the application, please feel free to direct them to us at csr@neometaliks.com.<br/><br/>

      Thank you for your understanding, and we look forward to the possibility of collaborating on future opportunities.<br/><br/>

      Best regards,<br/><br/>
      Team Neo Metaliks</p>`
}

const studentRejectionSubject = "Regarding Your Application for Shiksha Samart"
const studentApprovalSubject = 'Congratulations! Your Application for Shiksha Samart Has Been Approved';
const collegeRejectionSubject = (stuname) => {
    return `Notification of Shiksha Samart Application for ${stuname}`
}
const collegeApprovalSubject = (stuname) => {
    return `Approval of Shiksha Samart for ${stuname}`
}

async function sendMail(emailId, subjct, mailbody) {
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
            from: '"Neo Metaliks" <neokolkata123@gmail.com>',
            to: emailId,
            subject: subjct,
            html: mailbody
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, message: "Failed to send email" };
    }
}


router.get("/get_csr_approval", async (req, res) => {
    const response = await db.raw(`CALL csr_md_approval(${3},${1},${1},${1},'','2023-11-12','10:00');`)
    res.send(response[0][0]);
})

router.get("/get_md_approval", async (req, res) => {
    const response = await db.raw(`CALL csr_md_approval(${4},${1},${1},${1},'','2023-11-12','10:00');`)
    res.send(response[0][0]);
})

router.get('/get_csr_feedback_modal', async (req, res) => {
    const stuId = req.query.studentId;
    let interviewers = [];
    let rolenames = [];
    const response1 = await db.raw(`CALL csr_md_approval(${5},${stuId},${1},${1},'','2023-11-12','10:00');`)
    for (var i = 0; i < response1[0][0].length; i++) {
        interviewers.push(response1[0][0][i].interviewerId);
        // console.log(interviewers);
    }
    for (var i = 0; i < response1[0][0].length; i++) {
        const response2 = await db.raw(`CALL csr_md_approval(${6},${1},${interviewers[i]},${1},'','2023-11-12','10:00');`)
        rolenames.push(response2[0][0])
        // console.log(response2[0][0]);
        console.log(rolenames);
    }

    const response = {
        res1: response1[0][0],
        res2: rolenames
    }

    res.send(response);
})

router.post("/csr_md_approval", async (req, res) => {
    console.log("coming");
    const { dbmode, stuid, appId, comments, status, stuname,
        clgname, stumail, clgmail } = req.body;

    console.log(dbmode, stuid, appId, comments, status);
    const response = await db.raw(`CALL csr_md_approval(${dbmode},${stuid},${appId},${status},'${comments}','${current_date}','${current_time}');`)

    if (dbmode === 1 && status === 2) {
        // student
        sendMail(stumail, studentRejectionSubject, studentRejectMailbody(stuname));
        // college
        sendMail(clgmail, collegeRejectionSubject(stuname), collegeRejectionMailBody(clgname, stuname));
    }
    else if (dbmode === 2 && status === 1) {
        // student
        sendMail(stumail, studentApprovalSubject, studentApprovalMailBody(stuname));
        // college
        sendMail(clgmail, collegeApprovalSubject(stuname), collegeApprovalMailBody(clgname, stuname));
    }
    else if (dbmode === 2 && status === 2) {
        // student
        sendMail(stumail, studentRejectionSubject, studentRejectMailbody(stuname));
        // college
        sendMail(clgmail, collegeRejectionSubject(stuname), collegeRejectionMailBody(clgname, stuname));
    }
    res.send(response);
})

router.get("/ready_for_funds", async (req, res) => {
    // console.log("coming");
    const dbMode = req.query.dbmode;
    const fromDate = req.query.fromdate;
    const toDate = req.query.todate;

    console.log(dbMode, fromDate, toDate);

    const response = await db.raw(`CALL ready_for_funds(${dbMode}, '${fromDate}', '${toDate}');`)

    res.send(response[0][0]);
})

router.get("/pending_fund_report", async (req, res) => {
    // console.log("coming");
    const dbMode = req.query.dbmode;
    const fromDate = req.query.fromdate;
    const toDate = req.query.todate;

    console.log(dbMode, fromDate, toDate);

    const response = await db.raw(`CALL pending_fund_and_reject_stutent_report(${dbMode}, '${fromDate}', '${toDate}');`)

    res.send(response[0][0]);
})

router.get("/interview_rejected_student_report", async (req, res) => {
    // console.log("coming");
    const dbMode = req.query.dbmode;
    const fromDate = req.query.fromdate;
    const toDate = req.query.todate;

    console.log(dbMode, fromDate, toDate);

    const response = await db.raw(`CALL pending_fund_and_reject_stutent_report(${dbMode}, '${fromDate}', '${toDate}');`)

    res.send(response[0][0]);
})

router.get("/ready_for_interview_report", async (req, res) => {
    // console.log("coming");
    const dbMode = req.query.dbmode;
    const fromDate = req.query.fromdate;
    const toDate = req.query.todate;

    console.log(dbMode, fromDate, toDate);

    const response = await db.raw(`CALL ready_for_interview_report(${dbMode}, '${fromDate}', '${toDate}');`)

    res.send(response[0][0]);
})

module.exports = router;
