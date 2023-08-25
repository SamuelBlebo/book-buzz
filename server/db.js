const pool = require("pg").Pool;

const pool = new pool({
  user: "postgres",
  password: "buzz1234",
  host: "localhost",
  port: "database:",
  database: "BookBuzz",
});

module.exports = pool;
