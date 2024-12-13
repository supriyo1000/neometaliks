var express = require('express');
var router = express.Router();
var apiCtrl = require("../controllers/api")
const jwt = require('jsonwebtoken');
const dbconfig = require('../knexfile');
const db = require('knex')(dbconfig.development)
const fs = require("fs");


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

router.post('/register', async function (req, res, next) {
  const user = req.body.username;
  const password = req.body.pass;

  try {
    const response = await db.raw(`CALL get_user_login_details('${user}')`);
    console.log("res is ", response[0][0][0]);
    if (response[0].length === 0) { // <-- check if the response array is empty
      res.status(401).send('Invalid username or password');
    } else {
      const hashedPassword = response[0][0][0].mypassword;
      console.log(hashedPassword);
      const result = await bcrypt.compare(password, hashedPassword);
      if (result) {
        res.status(200).send(response[0][0][0]);
      } else {
        res.status(402).send('Invalid username or password');
      }


    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error logging in'); // <-- update the status code
  }
});

function getUniqueAccess(dataArray) {
  // Initialize an empty array to store unique access values
  const uniqueAccess = [];

  // Iterate over the dataArray
  dataArray.forEach((item) => {
    // Check if the item has an 'access' property
    if (item.access) {
      const accessArray = JSON.parse(item.access); // Parse the 'access' property as JSON
      // Iterate over the accessArray
      accessArray.forEach((access) => {
        // If the access is not in uniqueAccess, add it
        if (!uniqueAccess.includes(access)) {
          uniqueAccess.push(access);
        }
      });
    }
  });

  return uniqueAccess;
}

router.post('/userlogin', async function (req, res, next) {
  const user = req.body.username;
  const password = req.body.pass;
  const roleids = [];
  const serializedPages = JSON.stringify(roleids);

  console.log(password);

  try {
    const response = await db.raw(`CALL get_user_login_details(${2},'${user}',${null},'${serializedPages}')`);


    const value = response[0][0][0];

    console.log(value.userstatus);

    if (value.userstatus === 1 && value.rolestatus === 1) {
      roleids.push(value.roleId);
      const response2 = await db.raw(`CALL get_user_login_details(${3},'${user}',${value.userId},'${serializedPages}')`);
      const value2 = response2[0][0];
      for (const i of value2) {
        console.log(i, i.addstatus);
        if (i.addstatus === 1) {
          roleids.push(i.role_id);
        }
      }
      const response3 = await db.raw(`CALL get_user_login_details(${4},'${user}',${value.userId},'${serializedPages}')`);

      const response4 = await db.raw(`CALL get_user_login_details(${5},'${user}',${value.userId},'${JSON.stringify(roleids)}')`);

      const response5 = await db.raw(`call get_role_names_by_ids(${6},'${JSON.stringify(roleids)}');`);

      const value3 = response3[0][0][0];
      const value4 = response4[0][0];
      const value5 = response5[0][0];
      console.log(value5);
      const uniqueAccess = getUniqueAccess(value4);
      const responseObject = {
        userId: value3.userId,
        userEmail: value3.userEmail,
        uPassword: value3.uPassword,
        creationDate: value3.creationDate,
        roleId: value5,
        firstname: value3.firstname,
        lastname: value3.lastname,
        roleName: value5,
        accessList: uniqueAccess, // Use value2 if it contains the accessList
        rolecreationdate: value3.creationDate,
        status: 1, // Set the status here based on your logic
      };
      if (value3.uPassword === password) {
        const token = jwt.sign({
          firstname: value.firstname,
          lastname: value.lastname,
          email: value.userEmail,
          role: value.roleName,
          roleid: value.roleId,
          creationdate: value.creationDate
        },
          'securitykey',
          {
            expiresIn: "1h"
          }
        );
        const responseall = {
          response: responseObject,
          token: token
        }
        res.status(200).send(responseall);
      }
      else {
        res.status(401).json({
          error: 'Password incorrect',
          message: 'The provided password does not match the user\'s password.'
        });

      }
    }
    else if (value.userstatus === 0) {
      const response2 = await db.raw(`CALL get_user_login_details(${3},'${user}',${value.userId},'${serializedPages}')`);
      const value2 = response2[0][0];
      for (const i of value2) {
        console.log(i, i.addstatus);
        if (i.addstatus === 1) {
          roleids.push(i.role_id);
        }
      }
      const response3 = await db.raw(`CALL get_user_login_details(${4},'${user}',${value.userId},'${serializedPages}')`);

      const response4 = await db.raw(`CALL get_user_login_details(${5},'${user}',${value.userId},'${JSON.stringify(roleids)}')`);

      const value3 = response3[0][0][0];
      const value4 = response4[0][0];
      // const response5 = {
      //   db4: value3,
      //   db5: value4
      // }
      const uniqueAccess = getUniqueAccess(value4);
      console.log(uniqueAccess);
      const responseObject = {
        userId: value3.userId,
        userEmail: value3.userEmail,
        uPassword: value3.uPassword,
        creationDate: value3.creationDate,
        roleId: 2,
        firstname: value3.firstname,
        lastname: value3.lastname,
        roleName: null,
        accessList: uniqueAccess, // Use value2 if it contains the accessList
        rolecreationdate: value3.creationDate,
        status: value3.status, // Set the status here based on your logic
      };
      if (value3.uPassword === password) {
        const token = jwt.sign({
          firstname: value.firstname,
          lastname: value.lastname,
          email: value.userEmail,
          role: value.roleName,
          roleid: value.roleId,
          creationdate: value.creationDate
        },
          'securitykey',
          {
            expiresIn: "1h"
          }
        );
        const responseall = {
          response: responseObject,
          token: token
        }
        for (const i of value2) {
          console.log(i, i.addstatus);
          if (i.addstatus === 1) {
            res.status(200).send(responseall);
            break;
          }
        }
        return res.status(204).send('No additional role found');

      }
      else {
        res.status(401).json({
          error: 'Password incorrect',
          message: 'The provided password does not match the user\'s password.'
        });

      }
    }
    else {
      res.status(401);
    }
    // console.log("res is ", response[0][0][0]);
    // if (response[0].length === 0) { // <-- check if the response array is empty
    //   res.status(401).send('Invalid username or password');
    // } else {

    // if (response[0][0][0].uPassword === password) {
    //   const token = jwt.sign({
    //     firstname: value.firstname,
    //     lastname: value.lastname,
    //     email: value.userEmail,
    //     role: value.roleName,
    //     roleid: value.roleId,
    //     creationdate: value.creationDate
    //   },
    //     'securitykey',
    //     {
    //       expiresIn: "1h"
    //     }
    //   );
    //     const response2 = {
    //       response: response[0][0][0],
    //       token: token
    //     }
    //     res.status(200).send(response2);
    //   } else {
    //     res.status(402).send('Invalid Password');
    //   }


    // }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error logging in'); // <-- update the status code
  }
});

router.get("/fetch_access_list", async function (req, res) {
  const user_role_id = req.query.role_id;
  const response = await db.raw(`CALL fetch_access_list(${user_role_id})`)
  res.send(response[0][0][0]);
})

router.get("/fetch_all_users_role", async function (req, res) {
  const response = await db.raw(`CALL getAllUsersRole()`);
  res.send(response[0][0]);
})

router.get("/getAllStudents", async function (req, res) {
  const dbmode = req.query.dbmod;
  const collegeid = req.query.clgid;
  const stuid = req.query.studentid;
  const response = await db.raw(`Call getAllStudents(${dbmode}, ${collegeid}, ${stuid})`);
  res.send(response[0][0]);
})

router.get('/download-image', (req, res) => {
  try {
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
  } catch (error) {
    console.error(`Error while downloading image: ${error}`);
    res.status(500).send('Internal Server Error');
  }
});


// router.get('/download-image', (req, res) => {
//   const uploadsPath = path.join(__dirname, './uploads');

//   try {
//     const image = req.query.imageId;
//     const imagePath = path.join(uploadsPath, image);

//     if (fs.existsSync(imagePath)) {
//       const fileStream = fs.createReadStream(imagePath);

//       res.setHeader('Content-Disposition', `attachment; filename="${image}"`);
//       res.setHeader('Content-Type', 'image/jpeg');

//       fileStream.pipe(res);
//     } else {
//       res.status(404).send('Image not found');
//     }
//   } catch (error) {
//     console.error(`Error while downloading image: ${error}`);
//     res.status(500).send('Internal Server Error');
//   }
// });

router.get("/journeyStatus", async function (req, res) {
  // const dbmode = req.query.dbmod;
  const collegeid = req.query.clgid;
  const stuid = req.query.studentid;
  let isdate;
  var intsdate = "NA";
  var sdate = "NA";
  var intdate = "NA";
  var intstatus = 0;
  var csrdate = "NA";
  var mddate = "NA";
  var sstatus = 0;
  var intsStatus = 0;
  var csrstatus = 0;
  var mdstatus = 0;
  const response1 = await db.raw(`Call getAllStudents(${2}, ${collegeid}, ${stuid})`);

  console.log(response1[0][0]);

  if (response1[0][0].length === 0) {
    res.sendStatus(204);
  }
  else if (response1[0][0][0].submit_stage === 0) {
    res.send({});
  }
  else if (response1[0][0][0].submit_stage === 1) {
    isdate = response1[0][0][0].first_approval_date;
    res.send({
      inisDate: isdate, secdate: sdate, intschdate: intsdate, intsStatus: intsStatus, intDate: intdate, intStatus: intstatus, csrDate: csrdate
      , mdDate: mddate, sStatus: sstatus, csrStatus: csrstatus, mdStatus: mdstatus, studentname: response1[0][0][0].studentname
    })
  }
  else {
    if (response1[0][0][0].final_approved_status === 1) {
      sstatus = 1; isdate = response1[0][0][0].first_approval_date; sdate = response1[0][0][0].final_approval_date;
      const response2 = await db.raw(`Call getAllStudents(${3}, ${collegeid}, ${stuid})`);
      console.log(response2[0][0]);
      if (response2[0][0].length !== 0) {
        intsdate = response2[0][0][0].Sys_date;
        intsStatus = 1;
        intdate = response2[0][0][0].Slot_date;
        intstatus = response2[0][0][0].status;
        if (response2[0][0][0].status === 3 || response2[0][0][0].status === 2) {
          // intstatus = response2[0][0][0].status;
          // intstatus = 1;

          const response3 = await db.raw(`Call getAllStudents(${4}, ${collegeid}, ${stuid})`);
          if (response3[0][0].length !== 0) {
            csrdate = response3[0][0][0].approval_Date;

            if (response3[0][0][0].status === 3) {
              csrstatus = 1;
              const response4 = await db.raw(`Call getAllStudents(${5}, ${collegeid}, ${stuid})`);
              if (response4[0][0].length !== 0) {
                mddate = response4[0][0][0].approval_Date; mdstatus = response4[0][0][0].status;
              }
            }
            else {
              csrstatus = 2;
            }
          }
        }
      }

    }
    else {
      isdate = response1[0][0][0].first_approval_date; sdate = response1[0][0][0].final_approval_date; sstatus = 2;
    }
    const data = {
      inisDate: isdate, secdate: sdate, intschdate: intsdate, intsStatus: intsStatus, intDate: intdate, intStatus: intstatus, csrDate: csrdate
      , mdDate: mddate, sStatus: sstatus, csrStatus: csrstatus, mdStatus: mdstatus, studentname: response1[0][0][0].studentname
    }
    console.log(data);

    res.send(data);
  }

})

router.get("/students_due_for_data_upload", async function (req, res) {
  const dbmode = req.query.dbmode;
  const fdate = req.query.fromdate;
  const tdate = req.query.todate;
  try {
    const response = await db.raw(`CALL check_student_data_upload(?,?,?)`,[dbmode,fdate,tdate]);
    res.send(response[0][0]);
  } catch (error) {
    console.error(error);
  }
})

module.exports = router;
