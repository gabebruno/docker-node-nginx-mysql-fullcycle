const express = require('express');
const mysql = require('mysql2');
const { faker } = require('@faker-js/faker');

const app = express();
const port = 3000;

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'fullcycle',
};

const connection = mysql.createConnection(config);

connection.query(
  `CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))`
);

app.get('/', (req, res) => {
  const name = faker.name.fullName();
  connection.query(`INSERT INTO people(name) VALUES(?)`, [name], (err) => {
    if (err) throw err;

    connection.query(`SELECT name FROM people`, (err, results) => {
      if (err) throw err;

      const names = results.map((row) => `<li>${row.name}</li>`).join('');
      res.send(`<h1>Full Cycle Rocks!</h1><ul>${names}</ul>`);
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});