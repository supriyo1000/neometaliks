const knex = require('knex')({
    client: 'mysql2',
    connection: {
        // host: '127.0.0.1',
        // port: 3306,
        // user: 'root',
        // password: 'qtest123',
        // database: 'linkdin_neo'
        host: '103.184.242.29',
        port: 3306,
        database: 'linkdin_neo',
        user: 'neodbadmin',
        password: 'Killer$123'
    }
});

module.exports = knex;