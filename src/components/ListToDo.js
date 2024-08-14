import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListToDo = () => {

    const [todos, setTodos] = useState([]);

    // delete Todo function
    const deleteTodo = async(id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:3000/todos/${id}`, {
                method: "DELETE"
            });
            setTodos(todos.filter(todo => todo.todo_id !== id));
            
        } catch (error) {
            console.error(error);
        }
    }

    const  getTodos = async() => {
        try {
            const response = await fetch("http://localhost:3000/todos");
            const jsonData = await response.json();

            setTodos(jsonData);
            
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getTodos();
    }, []);

    
    return <Fragment>
         <table class="table mt-5 text-center">
    <thead>
      <tr>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => (
        <tr key={todo.todo_id}>
            <td>{todo.description}</td>
            <td><EditTodo todo={todo} /></td>
            <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
        </tr>
      ))}
    </tbody>
  </table>
    </Fragment>
}

export default ListToDo;