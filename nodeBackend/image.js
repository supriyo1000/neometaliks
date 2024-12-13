const express = require("express");
const router = express();
const multer = require("multer");
const db = require('./knex');
const nodemailer = require("nodemailer");


async function sendMailtoAcounts(account,sem, stuname, colname, amount, month) {
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
            subject: `Request for Disbursement Approval: ${sem} - ${stuname} - ${colname}`,
            html: `<p>Dear Team,<br/><br/>

            I trust this message finds you well. I am writing to request approval for the disbursement of Rs ${amount} for ${sem} on behalf of our student, ${stuname}, who is currently enrolled at ${colname}.<br/><br/>
      
            Kindly consider this as an official request, and we kindly ask for your prompt attention to facilitate the disbursement process within the month of ${month}. Additionally, we would appreciate it if you could ensure that the corresponding receipt is attached to the Sikhsa Samarth Portal for our records and future reference.<br/><br/>

            Thank you for your cooperation in this matter. Should you have any questions or require further information, please feel free to reach out at csr@neometaliks.com<br/><br/>
      
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

async function sendMailtoStudent(account, sem, stuname, colname, amount, month) {
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
            subject: `Confirmation of ${sem} Payment - ${month}  Disbursement`,
            html: `<p>Dear ${stuname},<br/><br/>

            I hope this email finds you well. We are pleased to inform you that the payment for ${sem}, totaling Rs ${amount}, has been successfully processed for the month of ${month}. This disbursement is in support of your studies at ${colname}.<br/><br/>
      
            This mail is related for your records and future reference as part of Sikhsha Samarth Programme. No Action needed from your end.<br/><br/>

            If you have any questions or require further assistance, feel free to reach out at csr@neometaliks.com<br/><br/>

            We wish you continued success in your academic endeavors.<br/><br/>
      
            Best Regards,<br/><br/>
            Team Siksha Samarth</p>`
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, message: "Failed to send email" };
    }
}

async function sendMailtoCSR(account, sem, stuname, colname, amount, month) {
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
            to: 'csr@neometaliks.com',
            // to: 'pokhraj.das@gmail.com',
            subject: `Confirmation of ${sem} Payment - ${month}  Disbursement`,
            html: `<p>Dear Siksha Samarth Team,<br/><br/>

            I hope this email finds you well. We are pleased to inform you that the payment for ${sem}, totaling Rs ${amount}, has been successfully processed for the month of ${month}.<br/><br/>
      
            This mail is related for your records and future reference as part of Sikhsha Samarth Programme. No Action needed from your end.<br/><br/>
      
            Best Regards,<br/><br/>
            Team Siksha Samarth</p>`
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, message: "Failed to send email" };
    }
}

async function sendMailtoCollege(account, sem, stuname, colname, amount, month) {
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
            subject: `Acknowledgment of ${sem} Payment - ${month} Disbursement`,
            html: `<p>Dear ${colname},<br/><br/>

            I trust this email finds you well. I am writing to officially acknowledge the successful disbursement of the ${sem} payment for the month of ${month}. The payment of ${amount} has been processed for our student, ${stuname}, who is currently enrolled in your esteemed institution.<br/><br/>
      
            We kindly request your assistance to ensure and acknowledge the receipt of payment as part of the Sikhsa Samarth Programme at your earliest convenience.<br/><br/>

            This documentation is vital for our records and future reference.<br/><br/>

            We appreciate your cooperation in this matter and look forward to your continued support.<br/><br/>
      
            Thanks & Regards-<br/><br/>
            Team Sikhsha Samarth</p>`
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

router.post("/upload_result", upload.single("result"), async (req, res) => {
    console.log(req.file);
    const user = req.query.userid;
    const semester = req.query.semester;
    const userId = parseInt(user, 10);
    // const dbmode = req.query.mode;
    console.log(userId);
    const photo = req.file.originalname;

    // console.log(user);
    console.log(photo);

    try {
        const response = await db.raw(`CALL get_result_master(${2}, ${userId}, ${1}, '${semester}',
         '${userId}-${photo}', "2023-12-19", ${0}, '${current_date}')`);
        console.log(response);
        res.status(200).send(response)
    } catch (error) {
        console.log(error);
    }
    
});

router.get("/isResultExists", async (req, res) => {

    const user = req.query.userid;
    const semester = req.query.semester;

    const checkrole = await db.raw('CALL check_is_result(?,?, @isPresent)', [user, semester]);
    const selectResult = await db.raw('SELECT @isPresent AS isPresent');

    const isRolePresent = selectResult[0][0].isPresent;
    console.log("kk", isRolePresent);
    res.send({ isPresent: isRolePresent });

    // res.send(isRolePresent);
    // res.send("ok")
})

router.get("/get_student_result", async function (req, res) {
    const response = await db.raw(`CALL get_result_master(${3}, ${1}, ${1}, 'semester',
         'photo', "2023-12-19", ${0}, '${current_date}')`);
    res.send(response[0][0]);
})

router.get("/get_student_result_file", async function (req, res) {
    const userid = req.query.stuid;
    const semester = req.query.semester;
    const response = await db.raw(`CALL get_result_master(${7}, ${userid}, ${1}, '${semester}',
         'photo', "2023-12-19", ${0}, '${current_date}')`);
    res.send(response[0][0]);
})

router.get("/get_student_disbursment_details", async function (req, res) {
    const userid = req.query.stuid;
    const semester = req.query.semester;
    const response = await db.raw(`CALL get_disbursment_master(
        ${2},${userid},'${semester}',${0},'2023-12-20',
        'acd_year',${1},'a_email','${current_date}',${1}, 'null')`);
    res.send(response[0][0]);
})

function getFormattedMonthFromDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'long', year: 'numeric' };
    const formattedMonth = date.toLocaleString('en-US', options);
    return formattedMonth;
}

router.post("/insert_student_disbursment", async function (req, res) {

    const { stuid, sem, amnt, i_month, email, app_id, ac_year, stat,stuname,colname } = req.body;

    console.log(stuid, sem, amnt, i_month, ac_year, email, app_id, stat);
    const response = await db.raw(`CALL get_disbursment_master(
        ${1},${stuid},'${sem}',${amnt},'${i_month}',
        '${ac_year}',${app_id},'${email}','${current_date}',${stat}, 'null')`);
    
    if (stat === 1) {
        sendMailtoAcounts(email,sem, stuname, colname, amnt, getFormattedMonthFromDate(i_month))
    }
    res.send(response[0][0]);
})

router.get("/get_student_disbursment_status", async function (req, res) {
    const userid = req.query.stuid;
    const semester = req.query.semester;
    const response = await db.raw(`CALL get_disbursment_master(
        ${4},${userid},'${semester}',${0},'2023-12-20',
        'acd_year',${1},'a_email','${current_date}',${1}, 'null')`);
    if (response[0][0].length > 0) {
        res.send(response[0][0][0]);
    } else {
        res.send({ status: 0 });
    }
})

router.post("/upload_receipt", upload.single("receipt"), async (req, res) => {
    console.log(req.file);
    const user = req.query.userid;
    const semester = req.query.semester;
    const userId = parseInt(user, 10);
    // const dbmode = req.query.mode;
    console.log(userId);
    const photo = req.file.originalname;

    console.log(user);
    console.log(photo);
    try {
        const response = await db.raw(`CALL get_disbursment_master(
        ${3},${userId},'${semester}',${0},'2023-12-20',
        'acd_year',${1},'a_email','${current_date}',${3}, '${userId}-${photo}')`);
        console.log(response);

        const response2 = await db.raw(`CALL get_disbursment_master(
        ${2},${userId},'${semester}',${0},'2023-12-20',
        'ac_year',${1},'email','${current_date}',${0}, 'null')`);

        sendMailtoCollege(response2[0][0][0].collegeemail, semester, response2[0][0][0].studentname, response2[0][0][0].collegename, response2[0][0][0].amount, getFormattedMonthFromDate(response2[0][0][0].ins_month));
        sendMailtoStudent(response2[0][0][0].email, semester, response2[0][0][0].studentname, response2[0][0][0].collegename, response2[0][0][0].amount, getFormattedMonthFromDate(response2[0][0][0].ins_month));
        res.send(response);
    } catch (error) {
        console.log(error);
    }
});

router.post("/insert_transaction_details", async (req, res) => {
    const { stuid, sem, bank, utrno, date, amnt } = req.body;  
    
    const response = await db.raw(`CALL get_disbursment_master(
        ${7},${stuid},'${sem}',${amnt},'2023-12-20',
        '${bank}',${1},'${utrno}','${date}',${3}, 'null')`);
    
    const response2 = await db.raw(`CALL get_disbursment_master(
        ${2},${stuid},'${sem}',${0},'2023-12-20',
        'ac_year',${1},'email','${current_date}',${0}, 'null')`);

    sendMailtoCollege(response2[0][0][0].collegeemail, sem, response2[0][0][0].studentname, response2[0][0][0].collegename, response2[0][0][0].amount, getFormattedMonthFromDate(response2[0][0][0].ins_month));
    sendMailtoStudent(response2[0][0][0].email, sem, response2[0][0][0].studentname, response2[0][0][0].collegename, response2[0][0][0].amount, getFormattedMonthFromDate(response2[0][0][0].ins_month));
    sendMailtoCSR(response2[0][0][0].email, sem, response2[0][0][0].studentname, response2[0][0][0].collegename, response2[0][0][0].amount, getFormattedMonthFromDate(response2[0][0][0].ins_month));

    res.send(response);

})

router.get("/ccc",async function (req, res){
    const response2 = await db.raw(`CALL get_disbursment_master(
        ${2},${9},'semester-1',${0},'2023-12-20',
        'ac_year',${1},'email','${current_date}',${0}, 'null')`);
    res.send(response2[0][0][0]);
})

router.get("/get_fund_balance_report", async function (req, res) {
    const response2 = await db.raw(`CALL get_disbursment_master(
        ${6},${9},'semester-1',${0},'2023-12-20',
        'ac_year',${1},'email','${current_date}',${0}, 'null')`);
    res.send(response2[0][0][0]);
})


module.exports = router;