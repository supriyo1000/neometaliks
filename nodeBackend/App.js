const express = require('express');
const app = express();
const path = 8002;
const db = require('./knex');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const cors = require('cors');
const image = require('./image');
const ipAddress = require('./ipconfig');

// const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use("/uploads", express.static("./uploads"))
app.use("/images", image);

// app.use(bodyParser.json())

//console.log("ip", ipAddress);


const date = new Date();
const current_month = date.getMonth() + 1;
const current_day_of_month = date.getDate(); // Use getDate to get the day of the month.
const current_date = `${date.getFullYear()}-${current_month < 10 ? '0' : ''}${current_month}-${current_day_of_month < 10 ? '0' : ''}${current_day_of_month}`;
const current_minutes = date.getMinutes();
const current_time = `${date.getHours()}:${current_minutes < 10 ? '0' : ''}${current_minutes}`;

async function sendMailtoStudent(account, link, semester, nm) {
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
            // to: "pokhraj.das@gmail.com",
            subject: `Important: Upload your Exam Result for ${semester}`,
            html: `<p>Dear ${nm},<br/><br/>

      I hope this email finds you well. We are pleased to inform you that Please upload your ${semester} results on urgent basis for review on Siksha Samarth Programme.<br/><br/>
      
      To upload your exam results, please click on the following link: <br/><br/>
      ${link}<br/><br/>
      
      Important Note: Make sure to use a desktop or laptop computer for the best experience when accessing the result upload portal.
      If you encounter any difficulties or have questions regarding your results, please don't hesitate to reach out to csr@neometaliks.com<br/><br/>
      
      Thank you for your patience and cooperation throughout this process. We wish you the best of luck in your academic endeavors, and we look forward to your continued success.<br/><br/>
      
      Thanks & Regards-<br/><br/>
      Sikhska Samarth Team</p>`
        });

        //console.log("Message sent: %s", info.messageId);
        //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, message: "Failed to send email" };
    }
}

async function sendMailtoCSR(account, link, semester, nm) {
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
            // to: "pokhraj.das@gmail.com",
            subject: `Important: Upload your Exam Result for ${semester}`,
            html: `<p>Dear ${nm},<br/><br/>

      I hope this email finds you well. We are pleased to inform you that Please upload your ${semester} results on urgent basis for review on Siksha Samarth Programme.<br/><br/>
      
      To upload your exam results, please click on the following link: <br/><br/>
      ${link}<br/><br/>
      
      Important Note: Make sure to use a desktop or laptop computer for the best experience when accessing the result upload portal.
      If you encounter any difficulties or have questions regarding your results, please don't hesitate to reach out to csr@neometaliks.com<br/><br/>
      
      Thank you for your patience and cooperation throughout this process. We wish you the best of luck in your academic endeavors, and we look forward to your continued success.<br/><br/>
      
      Thanks & Regards-<br/><br/>
      Sikhska Samarth Team</p>`
        });

        //console.log("Message sent: %s", info.messageId);
        //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, message: "Failed to send email" };
    }
}

// //console.log("vv");

// async function checkCurrentDate() {
//     try {
//         // Get the current date
//         const currentDate = new Date();

//         const databaseResponse = await db.raw(`
//       CALL get_result_master(
//         ${4}, ${1}, ${1}, "sem", "res", "2023-12-19", ${0}, "2023-12-19"
//       )
//     `);

//         const isResultUpload = await db.raw(`
//       CALL get_result_master(
//         ${7}, ${1}, ${1}, "sem", "res", "2023-12-19", ${0}, "2023-12-19"
//       )
//     `);

//         // Assuming that the stored procedure returns a result set
//         const result = databaseResponse[0][0];
//         const resultupload = isResultUpload[0][0];
//         //console.log(result);

//         if (result.length > 0) {
//             result.forEach(async (item) => {
//                 // Parse ins_month string to Date object
//                 const appLink = `http://${ipAddress}:3005/neometaliks@SikhskaSamarth@${item.semester}@2semesters-587@54semester-2@${item.student_id}@5492D15B37`;
//                 const insMonthDate = new Date(item.ins_month);
//                 // Calculate the difference in milliseconds
//                 const timeDifference = insMonthDate - currentDate;
//                 // Calculate the difference in days
//                 const daysDifference = timeDifference / (1000 * 3600 * 24);

//                 //console.log(currentDate, insMonthDate, timeDifference, daysDifference);
//                 // Log the student name if ins_month is 15 days before the current date
//                 if (Math.abs(daysDifference - 15) < 1) {
//                     //console.log('Student Name:', item.studentname);

//                     //console.log(item.student_id, item.collegeid, item.semester);

//                     const response2 = await db.raw(`CALL get_result_master(${1},${item.student_id},
//                     ${item.collegeid}, '${item.semester}',"res", '${current_date}', ${0}, "2023-12-19")`);
//                     //console.log(response2);
//                     sendMailtoStudent(item.email, appLink, item.semester, item.studentname)

//                 }
//             });
//         } else {
//             //console.log('No results from the database');
//         }
//     } catch (error) {
//         console.error('Error executing database query:', error);
//     }
// }


function formatDate(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure 2-digit month
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2-digit day
    return `${year}-${month}-${day}`;
}



async function checkCurrentDate() {
    try {

        const currentDate = current_date;

        console.log(currentDate);

        const databaseResponse = await db.raw(`CALL get_result_master(${4}, ${1}, ${1}, "sem", "res", "2023-12-19", ${0}, "2023-12-19")`);

        // Assuming that the stored procedure returns a result set
        const result = databaseResponse[0][0];
        console.log("result", result);
        

        if (result.length > 0) {
            for (let i = 0; i < result.length; i++) {

                const appLink = `http://${ipAddress}:3005/neometaliks@SikhskaSamarth@${result[i].semester}@2semesters-587@54semester-2@${result[i].student_id}@5492D15B37`;
                
                if (currentDate === formatDate(result[i].ins_month)) {
                    const response2 = await db.raw(`CALL get_result_master(${1},${result[i].student_id},
                    ${result[i].collegeid}, '${result[i].semester}',"res", '${current_date}', ${0}, "2023-12-19")`);

                    // const appLink = `http://${ipAddress}:3005/neometaliks@SikhskaSamarth@${result[i].semester}@2semesters-587@54semester-2@${result[i].student_id}@5492D15B37`;

                    sendMailtoStudent(result[i].email, appLink, result[i].semester, result[i].studentname)
                    sendMailtoCSR(result[i].email, appLink, result[i].semester, result[i].studentname)
                }
                else if (currentDate > formatDate(result[i].ins_month)) {
                    const isResultUpload = await db.raw(`CALL get_result_master(${8}, ${result[i].student_id}, ${1}, '${result[i].semester}', "res", "2023-12-19", ${0}, "2023-12-19")`);
                    console.log("isResultUpload", isResultUpload[0][0]);

                    const isResultUpload2 = await db.raw(`CALL get_result_master(${6}, ${result[i].student_id}, ${1}, '${result[i].semester}', "res", "2023-12-19", ${0}, "2023-12-19")`);

                    if (isResultUpload && isResultUpload[0][0] && isResultUpload[0][0][0] && isResultUpload[0][0][0].rowcount === 0) {
                        const response2 = await db.raw(`CALL get_result_master(${1},${result[i].student_id},
                    ${result[i].collegeid}, '${result[i].semester}',"res", '${current_date}', ${0}, "2023-12-19")`);
                        
                        // const appLink = `http://${ipAddress}:3005/neometaliks@SikhskaSamarth@${result[i].semester}@2semesters-587@54semester-2@${result[i].student_id}@5492D15B37`;
                        
                        sendMailtoStudent(result[i].email, appLink, result[i].semester, result[i].studentname)
                        sendMailtoCSR(result[i].email, appLink, result[i].semester, result[i].studentname)
                    }
                    else if (isResultUpload && isResultUpload[0][0] && isResultUpload[0][0][0] && isResultUpload[0][0][0].status === 0) {
                        // const appLink = `http://${ipAddress}:3005/neometaliks@SikhskaSamarth@${result[i].semester}@2semesters-587@54semester-2@${result[i].student_id}@5492D15B37`;

                        sendMailtoStudent(result[i].email, appLink, result[i].semester, result[i].studentname) 
                        sendMailtoCSR(result[i].email, appLink, result[i].semester, result[i].studentname)
                    }
                }
            }
        }


        // if (result.length > 0) {
        //     result.forEach(async (item) => {
        //         // Parse ins_month string to Date object
        //         const appLink = `http://${ipAddress}:3005/neometaliks@SikhskaSamarth@${item.semester}@2semesters-587@54semester-2@${item.student_id}@5492D15B37`;
        //         // const insMonthDate = new Date(item.ins_month);


        //         if (formatDate(item.ins_month) === currentDate) {

                    // const response2 = await db.raw(`CALL get_result_master(${1},${item.student_id},
                    // ${item.collegeid}, '${item.semester}',"res", '${current_date}', ${0}, "2023-12-19")`);
        //             //console.log(response2);

        //             sendMailtoStudent(item.email, appLink, item.semester, item.studentname)

        //         }
        //         else if (currentDate > formatDate(item.ins_month)) {

        //             console.log(item.student_id, item.semester);
        //             console.log(currentDate, formatDate(item.ins_month));

        //             const isResultUpload = await db.raw(`CALL get_result_master(${8}, ${item.student_id}, ${1}, '${item.semester}', "res", "2023-12-19", ${0}, "2023-12-19")`);
        //             console.log(isResultUpload);
        //             const resultupload = isResultUpload[0][0];

        //             console.log("isResultUpload",resultupload);

        //             if (resultupload && resultupload.status === 0) {

        //                 sendMailtoStudent(item.email, appLink, item.semester, item.studentname)
        //             }
        //         }
        //     });
        // }
    } catch (error) {
        console.error('Error executing database query:', error);
    }
}

// Call the function
// checkCurrentDate();


// Schedule the function to run every day at a specific time (e.g., 2 AM)
// You may need to adjust the time zone based on your VPS location

// cron.schedule('0 0 * * *', checkCurrentDate); // Run at 2 AM every day

// cron.schedule('*/3 * * * *', checkCurrentDate);

cron.schedule('0 0 1,4,7,11,19,22,26 * *', checkCurrentDate);

// cron.schedule('0  * * *', checkCurrentDate);




app.get('/', async (req, res) => {
    try {
        const databaseResponse = await db.raw(`
      CALL get_result_master(
        ${4}, ${1}, ${1}, "sem", "res", "2023-12-19", ${0}, "2023-12-19"
      )
    `);

        //console.log(databaseResponse);

        // Assuming that the stored procedure returns a result set
        const result = databaseResponse[0][0];

        // Sending the result as JSON
        res.json(result);
    } catch (error) {
        console.error('Error executing database query:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/getStudentDetails', async (req, res) => {
    //console.log("ok");
    const stuid = req.query.stuid;
    const semester = req.query.semester;

    //console.log(stuid, semester);

    try {
        const response = await db.raw(`CALL get_result_master(
        ${5}, ${stuid}, ${1}, '${semester}', "res", "2023-12-19", ${0}, "2023-12-19" )`)
        //console.log(response);
        res.json(response[0][0]);
    } catch (error) {
        //console.log(error);
    }

})



app.get("/xyz", async (req, res) => {
    const isResultUpload = await db.raw(`CALL get_result_master(${4}, ${1}, ${1}, 'semester-1', "res", "2023-12-19", ${0}, "2023-12-19")`);
    res.send(isResultUpload[0][0]);
})


// checkCurrentDate();



app.listen(path, () => console.log("node backend running on path :", path))