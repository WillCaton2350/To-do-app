import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'

//This is a component / every component needs to return something to show/render anything to the screen
const AddToDo = ({ addTodo }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    
    const addTodoHandler = e => {
        e.preventDefault()
        addTodo({
            // this is an object / like a backend data model that that hold all our data that we can send to the api
            title,
            description,
            completed: false,
        })
    }
    // we're gonna call this addTodo once the submit button is activated
    return(
        <Form>
            <Form.Group controlID='title'>
            <Form.Label>Title</Form.Label>
            <Form.Control type='text' placeholder='Enter Title' onChange={e => setTitle(e.target.value)} />
            </Form.Group>

            <Form.Group controlID='Description'>
            <Form.Label>Description</Form.Label>
            <Form.Control type='text' placeholder='Enter Description' onChange={e => setDescription(e.target.value)} />
            </Form.Group>

            <Button variant='primary' type='submit' onClick={addTodoHandler}>Add To do</Button>
        </Form>
    )
}
export default AddToDo