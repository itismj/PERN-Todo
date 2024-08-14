const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

const PORT = 3000;

//middleware
app.use(cors());
app.use(express.json());

// post a todo
app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.log(error);
        
    }
})
 
// get all todos
app.get('/todos', async (req, res) => {
    try {
        const allToDos = await pool.query("SELECT * FROM todo");
        res.json(allToDos.rows);
    } catch (error) {
        console.log(error);
        
    }
})

// get a todo
app.get('/todos/:id', async (req, res) => {
    try {

        const { id } = req.params;
        const getToDo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(getToDo.rows[0]);
        
    } catch (error) {
        console.log(error);   
    }
    
})

// update a todo
app.put('/todos/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateToDo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
        res.json("Updated successfully!");
    } catch (error) {
        console.log(error);
        
    }
})

//delete todo 
app.delete('/todos/:id', async(req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM todo where todo_id = $1", [id]);
        res.json('Deleted successfully!');
    } catch (error) {
        console.log(error);
        
    }
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    
})