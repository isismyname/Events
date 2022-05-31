import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AddEvent } from '../components/nav/AddEvent';
import { Logout } from '../components/nav/Logout';
import img from '../img/calendar-background.jpeg';
import img1 from '../img/userbackground.jpeg';

export const User = () => {
    let nav = useNavigate()

    const create = () => {
      nav('/Add-Event')
    }

    return (
        <div>
            <img className='image-landingpage' src={img1} alt="User Background" />
            <img className='image-hero' src={img} alt="Hero" />
            <div className='d-flex justify-content-between py-3'>
                <div className='d-flex mx-5 px-5'>
                    <p className='text-logo'>E</p>
                    <div className='line-logo font-heading'>
                        <p>mbreo</p> 
                        <p>vent</p>
                    </div>
                </div>
                <div className='d-flex justify-content-around font-heading my-auto mx-5 px-4 w-25'>
                    <AddEvent/>
                    <Logout />
                </div>
            </div>
            <div className='my-auto text-hero text-center'>
                <p>let's start booking a place for private or family events by clicking the button below <br /> <b>OR</b> <br /> Click <b>Add Event</b> on top </p>
                <Button onClick={create} className='btn btn-success w-100'>Create</Button>
            </div>
        </div>
    )
}
