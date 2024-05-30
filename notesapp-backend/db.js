const mysql = require("mysql2");

const connection = mysql
  .createConnection({
    host: "localhost",
    user: "root",
    password: "Leenu@555",
    database: "notesapp",
  })
  .promise();

module.exports = connection;