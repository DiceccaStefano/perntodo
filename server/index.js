const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//Middlewere:
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create an expense

app.post("/expenses", async (req, res) => {
    try {
        const { description, price, stringdate } = req.body;
        const newExpense = await pool.query("INSERT INTO expenses (description , price, stringdate) VALUES($1,$2,$3) RETURNING *",
            [description, price, stringdate]);

        res.json(newExpense[0]);

    } catch (err) {
        console.error(err.message);
    }
})

//get all expenses

app.get("/expenses", async (req, res) => {
    try {
        const allexpenses = await pool.query("SELECT * FROM expenses");
        res.json(allexpenses.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//get an expense

app.get("/expenses/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM expenses WHERE expenses_id=$1", [id])

        res.json(todo.rows[0])
    } catch (err) {
        console.error(err.message);
    }
})

//update an expense

app.put("/expenses/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description, price, stringdate } = req.body;
        const updateExpense = await pool.query("UPDATE expenses SET description = $1, price = $2, stringdate = $3 WHERE expenses_id = $4",
            [description, price, stringdate, id]
        );
        res.json("Expense was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

//delete an expense

app.delete("/expenses/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteExpense = await pool.query("DELETE FROM expenses WHERE expenses_id = $1",
            [id]
        );
        res.json("Expense was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});



app.listen(5000, () => {
    console.log("server has started on port 5000");
});