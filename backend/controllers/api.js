// const { save } = require('../../xapp5/controllers/Api');
const { json } = require('express');
const dbconfig = require('../knexfile');
const db = require('knex')(dbconfig.development)


// const searchValue = 'supriya';
module.exports = {
    name: 'neoproduction',
    getAll: async function () {
        const datas = await db(this.name).select('*');
        return datas;
    },
    getAllMsg: async function () {
        const datas = await db("message").select('*');
        return datas;
    },
    getChat: async function (sid, rid) {
        const total = []
        const data1 = await db("message").select('*').where({ senderid: sid, receiverid: rid });
        const data2 = await db("message").select('*').where({ senderid: rid, receiverid: sid });
        // console.log(data2.length);
        const totallength = data1.length + data2.length;
        // console.log(totallength);
        // const entries = Object.entries(data1);
        // const entries2 = Object.entries(data2);
        // const entries3 = entries.concat(entries2)
        // console.log(entries3);
        // return entries3;
        for (let i of data1) {
            if (total.includes(i)) {
                null;
            } else {
                total.push(i)
            }
        }
        for (let j of data2) {
            if (total.includes(j)) {
                null;
            } else {
                total.push(j)
            }
        }
        total.sort(function (a, b) {
            return a.id - b.id;
        });
        return total
    },
    getUpdate: async function (email, password) {
        const datas = await db(this.name).where({ email: email })
            .update({
                password: password

            })
            .then(() => {
                console.log("password updated successfully.");
            })
        return datas;
    },
    UpdateUserStatus: async function (userid, userstatus) {
        const datas = await db("usermaster").where({ userId: userid })
            .update({
                status: userstatus

            })
            .then(() => {
                console.log("User Status updated successfully.");
            })
        return datas;
    },
    // UpdateUserRoleStatus: async function (userid, userstatus, table) {
    //     console.log("abc",userid, userstatus, table);
    //     const tablename = table === 1 ? "usermaster" : "additional_role";
    //     const columnName = table === 1 ? "userId" : "user_id";
    //     console.log(tablename);
    //     const datas = await db(`${tablename}`).where( { columnName }= userid )
    //         .update({
    //             status: userstatus

    //         })
    //         .then(() => {
    //             console.log("User Status updated successfully.");
    //         })
    //     return datas;
    // },

    UpdateUserRoleStatus: async function (userid, userstatus, table) {
        console.log("abc", userid, userstatus, table);
        const tablename = table === 1 ? "usermaster" : "additional_role";
        const columnName = table === 1 ? "userId" : "user_id";
        console.log(tablename);

        const whereClause = {};
        whereClause[columnName] = userid;

        const datas = await db(tablename).where(whereClause)
            .update({
                status: userstatus
            })
            .then(() => {
                console.log("User Status updated successfully.");
            });
        return datas;
    },


    async save(data) {
        return await db(this.name).insert(data);
    },
    async savemsg(data) {
        return await db("message").insert(data);
    },

    getCheck: async function (data) {
        return await db(this.name)
            .where('user', data)
            .count('* as count')
            .then(result => {
                const count = parseInt(result[0].count);
                if (count > 0) {
                    return {
                        name: data,
                    }
                } else {
                    return null
                }
            })
            .catch(error => {
                console.error(error);
            })
    },
    saverole: async function (roleName, pages, date, status) {
        try {
            const datas = await db("rolemaster").insert({
                roleName: roleName,
                accessList: pages,
                creationDate: date,
                status: status,
            });

            console.log("Role created successfully.");
            return datas;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    saveuser: async function (email, pass, date, roleid) {
        try {
            const datas = await db("usermaster").insert({
                userEmail: email,
                uPassword: pass,
                creationDate: date,
                roleId: roleid,
            });

            console.log("Role created successfully.");
            return datas;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    // findrole: async function (role) {

    //     try {
    //         const data = await db("rolemaster").where({ roleName: role }).first();
    //         console.log(data)
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    findrole: async function (role) {
        try {
            const data = await db("rolemaster").where({ roleName: role }).first();
            return !!data; // Returns true if data exists, false otherwise
        } catch (error) {
            console.error(error);
            return false; // Return false if an error occurs during the query
        }
    },
    finduser: async function (username) {
        try {
            const data = await db("usermaster").where({ userEmail: username }).first();
            return !!data; // Returns true if data exists, false otherwise
        } catch (error) {
            console.error(error);
            return false; // Return false if an error occurs during the query
        }
    },

    fetchrole: async function () {
        try {
            const data = await db("rolemaster").select("*");
            return data;
        } catch (error) {
            console.error(error);
            return false; // Return false if an error occurs during the query
        }
    },
    fetchpages: async function (roleid) {
        try {
            const data = await db("rolemaster").where({ roleId: roleid });
            return data;
        } catch (error) {
            console.error(error);
        }
    }

}