// Get express into variable
const express = require('express');

// Set-up Router
const router = express.Router();

// Get variable endpoint
const { register, login, checkAuth } = require('../controller/landingPage');
const { users, detailUser } = require('../controller/user');
const { addEvent, events, detailEvent, updateApprove, updateReject, updateData, deleteEvent } = require('../controller/event');
const { auth } = require('../middleware');

// Set-up endpoint for Landing Page
router.post('/register', register)
router.post('/login', login)
router.get('/check-auth', auth, checkAuth)

// Set-up endpoint for user
router.get('/users', auth, users)
router.get('/user/:id', auth, detailUser)

// Set-up endpoint for events
router.post('/add-event', auth, addEvent)
router.get('/events', auth, events)
router.get('/detail-event/:id', auth, detailEvent)
router.patch('/update/:id', auth, updateData)
router.patch('/update-approve/:id', auth, updateApprove)
router.patch('/update-reject/:id', auth, updateReject)
router.delete('/delete-event/:id', auth, deleteEvent)

// Exports router
module.exports = router;