// const { save } = require('../../xapp5/controllers/Api');
const { json } = require('express');
const dbconfig = require('../knexfile');
const db = require('knex')(dbconfig.development)


// const searchValue = 'supriya';
module.exports = {
    name: 'neo',
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
    async save(data) {
        return await db(this.name).insert(data);
    },
    async savemsg(data) {
        return await db("message").insert(data);
    },
    getUpdatestatus: async function (id) {
        const datas = await db("studentmaster").where({ studentid: id })
            .update({
                status: "approved"

            })
            .then(() => {
                console.log("password updated successfully.");
            })
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

    insertCollegeList: (value) => {
        return `INSERT INTO college_list (collegename) VALUES ('${value}')`;
    },
}