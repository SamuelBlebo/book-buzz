const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
// middleware
app.use(cors("cors"));
app.use(express.json());

app.listen(5000, () => {
  console.log("server has started on port 5000");
});

//ROUTES

//create a book

// get all book

// get a book

// update a book
