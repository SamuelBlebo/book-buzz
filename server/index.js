const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors("cors"));
app.use(express.json()); //req body

//ROUTES
//create a book (post)
app.post("/books", async (req, res) => {
  try {
    const { description } = req.body;
    const newBuzz = await pool.query(
      "INSERT INTO buzz (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newBuzz.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// get all book

app.get("/books", async (req, res) => {
  try {
    const allBuzzs = await pool.query("SELECT * FROM Buzz");
    res.json(allBuzzs.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// get a book

app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const buzz = await pool.query("SELECT * FROM buzz WHERE book_id = $1", [
      id,
    ]);
    res.json(buzz.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// update a book

app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateBuzz = await pool.query(
      "UPDATE buzz SET  description = $1 WHERE book_id = $2",
      [description, id]
    );

    res.json("Todo was updated!");
  } catch (err) {
    console.log(err.message);
  }
});

// delete a book
app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBuzz = await pool.query("DELETE FROM buzz WHERE book_id = $1", [
      id,
    ]);
    res.json("Item Deleted Successfully");
  } catch (err) {
    err.message;
  }
});

app.listen(4000, () => {
  console.log("server has started on port 4000");
});
