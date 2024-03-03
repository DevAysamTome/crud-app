const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.post("/items", (req, res) => {
  const { title, price, category, quantity, discount } = req.body;

  connection.query(
    "INSERT INTO crud SET ?",
    { title, price, category, quantity, discount },
    (err, res) => {
      if (err) throw err;
      console.log("New data added:", res.insertId);
    }
  );

  res.status(200).json({ message: "Data added" });
});

app.get("/items", (req, res) => {
  connection.query("SELECT * FROM crud", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/items/:id", (req, res) => {
  connection.query(
    "SELECT * FROM crud where id = ?",
    [req.params.id],
    (err, results) => {
      if (err) throw err;
      res.status(200).json({ message: "Data Added" });
    }
  );
});
app.put("/items/:id", (req, res) => {
  const { title, price, category, quantity, discount } = req.body;

  connection.query(
    "UPDATE crud SET title = ?, price = ? , category = ? , quantity = ? , discount = ? WHERE id = ?",
    [title, price, category, quantity, discount, req.params.id],
    (err, res) => {
      if (err) throw err;
      console.log("Data updated:", res.affectedRows);
    }
  );

  res.status(200).json({ message: "Data updated" });
});

app.delete("/items/:id", (req, res) => {
  const { id } = req.params;

  connection.query("DELETE FROM crud WHERE id = ?", [id], (err, res) => {
    if (err) throw err;
    console.log("Data deleted:", res.affectedRows);
  });

  res.status(200).json({ message: "Data deleted" });
});

app.listen(3001, () => {
  console.log("Server is running on port 3000");
});
