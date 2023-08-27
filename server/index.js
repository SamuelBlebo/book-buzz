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
    const newBook = await pool.query(
      "INSERT INTO book (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newBook.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// get all book
app.get("/books", async (req, res) => {
  try {
    const allBooks = await pool.query("SELECT * FROM Book");
    res.json(allBooks.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// get a book
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await pool.query("SELECT * FROM book WHERE book_id = $1", [
      id,
    ]);
    res.json(book.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// update a book
app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateBook = await pool.query(
      "UPDATE book SET  description = $1 WHERE book_id = $2",
      [description, id]
    );

    res.json("Book was updated!");
  } catch (err) {
    console.log(err.message);
  }
});

// delete a book
app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBook = await pool.query("DELETE FROM book WHERE book_id = $1", [
      id,
    ]);
    res.json("Item Deleted Successfully");
  } catch (err) {
    err.message;
  }
});

//server
app.listen(4000, () => {
  console.log("server has started on port 4000");
});
