import React, { useEffect, useState } from 'react'
import {Button, Dropdown, Form, Modal, Table} from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { ModalComment } from '../components/modal/ModalComment'
import { Logout } from '../components/nav/Logout'
import {API} from '../config/API'

export const Admin = () => {
    const [showC, setShowC] = useState(false);
    const handleCloseC = () => setShowC(false);
    const handleShowC = () => setShowC(true);

    const [events, setEvents] = useState([])
    const {loading, setLoading} =  useState(false)

    // const Comment = () => {
    //     return (
    //         <Modal show={showC} onHide={handleCloseC}>
    //             <Modal.Header closeButton>
    //             <Modal.Title>Modal heading</Modal.Title>
    //             </Modal.Header>
    //             <Modal.Body>
    //             <Form>
    //                 <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    //                 <Form.Label>Email address</Form.Label>
    //                 <Form.Control
    //                     type="email"
    //                     placeholder="name@example.com"
    //                     autoFocus
    //                 />
    //                 </Form.Group>
    //                 <Form.Group
    //                 className="mb-3"
    //                 controlId="exampleForm.ControlTextarea1"
    //                 >
    //                 <Form.Label>Example textarea</Form.Label>
    //                 <Form.Control as="textarea" rows={3} />
    //                 </Form.Group>
    //             </Form>
    //             </Modal.Body>
    //             <Modal.Footer>
    //                 <Button variant="secondary" onClick={handleCloseC}>
    //                     Close
    //                 </Button>
    //                 <Button variant="primary" onClick={handleCloseC}>
    //                     Save Changes
    //                 </Button>
    //             </Modal.Footer>
    //         </Modal>
    //     )
    // }
    
    const getEvents = async () => {
        try {
            const res = await API.get('/events')
            setEvents(res.data.data.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleApproved = async (id) => {
        const body = JSON.stringify({
            status: "Approved"
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            await API.patch(`/update/${id}`, body, config)
            getEvents()
        } catch (error) {
            console.log(error.message)
        }

    }

    const handleReject = async (id) => {

        try {
            const body = JSON.stringify({
                status: "Reject"
            })
    
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            await API.patch(`/update/${id}`, body, config)
            getEvents()
        } catch (error) {
            console.log(error.message)
        }

    }

    useEffect(() => {
        getEvents()
        handleApproved()
        handleReject()
    }, [loading])

    return (
        <div>
            <div className='d-flex justify-content-between py-3'>
                <div className='d-flex mx-5 px-5'>
                    <p className='text-logo'>E</p>
                    <div className='line-logo font-heading'>
                        <p>mbreo</p> 
                        <p>vent</p>
                    </div>
                </div>
                <div className='d-flex justify-content-around font-heading my-auto mx-5 px-4 w-25'>
                    <Logout />
                </div>
            </div>
            <div className='text-center'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th> Company </th>
                        <th> Event ID/Name </th>
                        <th> Location </th>
                        <th> Date </th>
                        <th> Comment </th>
                        <th> Action/Status </th>
                        <th> Created Date </th>
                        </tr>
                    </thead>
                    {events.map((events, index) =>(
                    <tbody key={index}>
                        <tr>
                        <td> {events.id} </td>
                        <td> {events.user.companyName} </td>
                        <td> {events.eventName} </td>
                        <td> {events.location} </td>
                        <td> {events.date} </td>
                        <td>
                            <Button onCLick={handleShowC}> Add Comment</Button>
                            {/* <Comment /> */}

            <Modal show={showC} onHide={handleCloseC} centered>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="name@example.com"
                        autoFocus
                    />
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseC}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCloseC}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
                        </td>
                        <td> <Dropdown className='text-end justify-content-between'>
                                <Dropdown.Toggle variant="Light" id="dropdown-basic">
                                    {events.status}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Button className='btn btn-light w-100' onClick={()=> handleApproved(events.id)} variant="info" type='submit'>
                                        <Dropdown.Item >Accept</Dropdown.Item>
                                    </Button>
                                    <Button className='btn btn-light w-100' onClick={()=> handleReject(events.id) } variant="info" type='submit'>
                                        <Dropdown.Item >Reject</Dropdown.Item>
                                    </Button>
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                        <td> {events.createdAt.slice(0, 10)} </td>
                        </tr>
                    </tbody>
                    ))}
                </Table>
            </div>
        </div>
    )
}
