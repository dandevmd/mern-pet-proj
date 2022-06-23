const asyncHandler = require('express-async-handler')
const Ticket = require('../models/ticketModel')
const User = require('../models/userModel')


//@description Get all tickets
//@route GET api/tickets
//access Private
const getTickets = asyncHandler(async(req, res) => {

    res.status(200).json({ message: 'getTickets' })

})

//@description Create a ticket
//@route POST api/tickets
//access Private
const createTicket = asyncHandler(async(req, res) => {

    res.status(200).json({ message: 'createTicket' })

})

module.exports = {
    getTickets,
    createTicket
}