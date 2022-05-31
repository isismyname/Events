import React, { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { AddEvent } from '../components/nav/AddEvent'
import { Logout } from '../components/nav/Logout'
import { API } from '../config/API'
import { UserContext } from '../context/UserContext'

export const CreateEvent = () => {


    const d = new Date();
    d.setDate(d.getDate()+7)
    const [recommendDate] = useState(d)
    const d1 = new Date();
    d1.setDate(d1.getDate()+14)
    const [recommendDate1] = useState(d1)
    const d2 = new Date();
    d2.setDate(d2.getDate()+21)
    const [recommendDate2] = useState(d2)

    const [state] = useContext(UserContext)

    console.log(state.user.id)

    const [form, setForm] = useState({
        eventName: '',
        date: '',
        location: '',
        idUser : state.user.id
    })

    const changeText = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const submit = async (e) => {
        e.preventDefault()
        
        const setting = {
            headers: {
                "Content-Type" : "application/json"
            }
        }

        const body = JSON.stringify(form)

        const res = await API.post('/add-event', body, setting)
        console.log(res)

    }
    
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
                    <AddEvent />
                    <Logout />
                </div>
            </div>
            <div className='p-3 w-50 mx-auto shadow'>
                <form onSubmit={submit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control name='idUser' placeholder={state.user.companyName} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Event ID/Name</Form.Label>
                        <Form.Control onChange={changeText} name='eventName' placeholder="Event ID/Name" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control onChange={changeText} name='date' placeholder="YYYY-MM-DD" />
                        <i className='recommended'>*We recommended : {recommendDate.toString().slice(0, 15)}, {recommendDate1.toString().slice(0, 15)}, {recommendDate2.toString().slice(0, 15)}</i>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Location</Form.Label>
                        <Form.Control onChange={changeText} name='location' placeholder="Location" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Button className='w-100' type='submit'> Submit </Button>
                    </Form.Group>
                </form>
            </div>
        </div>
    )
}
