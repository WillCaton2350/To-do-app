import React, {useState} from 'react'
import {Row, Col, Form, Button, Modal} from 'react-bootstrap'
// Modal is how we edit the todo
 
//This is a component / every component needs to return something to show/render anything to the screen
const Todo = ({id, title, description, completeTodo, editTodo, deleteTodo}) => {
                // The order these variables are called in matter
    const [show, setShow] = useState(false);
    const [newTitle, setTitle] = useState(title)
    const [newDescription, setDescription] = useState(description)

    const handleClose = () => {
        // this function makes the unsaved text in the edit textarea function disapear after you hit the close button
    setShow(false);
    setTitle(title)
    setDescription(description)
    } 
    const handleShow = () => setShow(true);

    const editTodoHandler = (title, description) => {
                handleClose()
                const todo = {
                    id,
                    title,
                    description,
                }
                editTodo(todo)
                // ^ this makes the api request
                setTitle(title)
                setDescription(description)
    }
    return(
        <>
            <Row className="border bottom pt-3">
                    <Col md={1}>
                    <Form>
                        <Form.Check 
                        type='checkbox' 
                        // this is an event handler
                        onChange={() => completeTodo(id)}
                        />
                    </Form>
                    </Col>
                <Col>
                    <h5>{title}</h5>
                    <p>{description}</p>
                </Col>

                <Col md={2}>
                    <Form>
                        <Button variant='info' className='my-2 btn-block' onClick={handleShow}>Edit</Button>
                    </Form>

                    <Form>
                        <Button variant='danger' className='my-2 btn-block' onClick={() => deleteTodo(id)}>Delete</Button>
                    </Form>
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                            <Modal.Body>
                            <Form>
                                <Form.Group controlID='title'>
                                <Form.Label>Title</Form.Label>
                                <Form.Control type='text' value={newTitle} onChange={e => setTitle(e.target.value)} />
                                </Form.Group>

                                <Form.Group controlID='Description'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control type='text' value={newDescription} onChange={e => setDescription(e.target.value)} />
                                </Form.Group>
                            </Form>


                            </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                    Close
                                    </Button>
                                    <Button variant="primary" onClick={() => editTodoHandler(newTitle, newDescription)}>
                                    Save Changes
                                    </Button>
                                </Modal.Footer>
                        </Modal>
        </>
    )

    
}
export default Todo