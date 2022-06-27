const asyncHandler = require('express-async-handler')
const Ticket = require('../models/ticketModel')
const User = require('../models/userModel')


//@description Get all tickets
//@route GET api/tickets
//access Private
const getTickets = asyncHandler(async(req, res) => {
    // Get user id in the JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const tickets = await Ticket.find({ user: req.user.id })

    res.status(200).json(tickets)

})

//@description Get one Ticket
//@route GET api/tickets/:id
//access Private
const getOneTicket = asyncHandler(async(req, res) => {
    // Get user id in the JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authorized')
    }

    res.status(200).json(ticket)

})


//@description Delete one Ticket
//@route DELETE api/tickets/:id
//access Private
const deleteOneTicket = asyncHandler(async(req, res) => {
        // Get user id in the JWT
        const user = await User.findById(req.user.id)

        if (!user) {
            res.status(401)
            throw new Error('User not found')
        }

        const ticket = await Ticket.findById(req.params.id)

        if (!ticket) {
            res.status(404)
            throw new Error('Ticket not found')
        }

        if (ticket.user.toString() !== req.user.id) {
            res.status(401)
            throw new Error('Not authorized')
        }

        ticket.remove(ticket)

        res.status(200).json({ success: true })

    })
    //@description UPDATE one Ticket
    //@route PUT api/tickets/:id
    //access Private
const updateOneTicket = asyncHandler(async(req, res) => {
    // Get user id in the JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authorized')
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedTicket)

})

//@description Create a ticket
//@route POST api/tickets
//access Private
const createTicket = asyncHandler(async(req, res) => {
    const { product, description } = req.body

    if (!product || !description) {
        res.status(400)
        throw new Error('Products or description not found')
    }

    // Get user id in the JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: 'new'
    })

    res.status(201).json(ticket)

})

module.exports = {
    getTickets,
    getOneTicket,
    updateOneTicket,
    deleteOneTicket,
    createTicket
}