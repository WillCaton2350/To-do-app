import React, { useState, useEffect } from 'react'

//useEffect is a react hook that runs whatever code we put inside of it everytime the component 
//renders and we can give it a list of dependencies  that will cause it to re render

import './App.css';
import AddToDo from './components/AddToDo'
import Todo from './components/Todo'
import { Container, Row, Col, Card} from 'react-bootstrap'
// axios is an installed import that allows you to make crud functionality
import axios from 'axios'

//react hooks are built-in functions 

function App() {
  const [todos, setTodos] = useState([])

    // THESE ARE THE CRUD FUNCTIONS  


  const getTodos = async () => {
    try {
        const response = await axios.get('/api/v1/todo/')
        const { data } = response
        setTodos(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getTodos()
  }, [])

  // this addTodo const function is connected to the addTodo on line 62
  const addTodo = async newTodo => {
      try {
        console.log(newTodo)
        // this posts a new value / object to the api
        await axios.post('/api/v1/todo/', newTodo)
        // this method displays the todos to the screen / ui
        getTodos()

      } catch (err) {
        console.log(err)
      }
     
  }

// this empty list will use the useeffect function to run only once once the application loads

  const completeTodo = async id => {
    try {
      // === checks if the variables and data types are equal to eachother == just checks if the variables are equal to eachother 
      const todo = todos.filter(todo => todo.id === id) [0] // [0] grabs the first element in this array / if id === id is true the try block will return the todos.filter method into/as an array
      todo.completed = true
      await axios.put(`/api/v1/todo/${id}/`, todo)
      getTodos()
    } catch(err) {
      console.log(err)
    }
  }

    const editTodo = async todo => {
      try{
        await axios.put(`/api/v1/todo/${todo.id}/`, todo)
        getTodos()
      } catch(err) {
        console.log(err)

      }
    }

    const deleteTodo = async id => {
      try{
        await axios.delete(`/api/v1/todo/${id}/`)
        getTodos()
      } catch(err) {
        console.log(err)
      }
    }


  return (
    // p-5 is padding 5 auto in bootstrap
    // pt-5 is padding top 5
    // This is an empty tag in react called a (react fragment tag) <> </>
    // todos.map() the map function loops through the array / loops over each index (index call below)
   <div className='wrapper'>
   <Container>
   <Row className='justify-content-center pt-5'>
     <Col>
       <Card className='p-5' id='card'>
          <h1>To-do List</h1>
          <AddToDo addTodo={addTodo} />
          {todos.map((todo, index) => (
            // is this todo completed? if not, run this <Todo /> call 
            !todo.completed && <Todo  key={index} id={todo.id} title={todo.title} description={todo.description} completeTodo={completeTodo} deleteTodo={deleteTodo} editTodo={editTodo}/>
                                      // ^ this is called a prop ^
          ))}
       </Card>
     </Col>  
   </Row>
   </Container>
   </div>
  );
}

export default App;
