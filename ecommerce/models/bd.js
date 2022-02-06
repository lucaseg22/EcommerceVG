var mysql= require('mysql');
var util = require('util');

var pool = mysql.createPool({
    connectionlimit: 10,
    host: 'localhost',
    user:'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'ecommerce',
});

pool.query = util.promisify(pool.query);

module.exports = pool;
