var mysql = require('mysql');
const db = mysql.createPool({
    host : 'localhost',
    user : 'root', 
    password : 'root',
    port : '3306',
    timezone:'KST',
    database : 'webcalendar'
});

module.exports = db;