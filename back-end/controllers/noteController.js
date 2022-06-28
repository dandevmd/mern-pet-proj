const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')
const Note = require('../models/noteModel')

//@description Get all Notes for specific ticket
//@route GET /api/tickets/:tickedId/notes
//access Private
const getNotes = asyncHandler(async(req, res) => {
    //get the user id from token
    const user = await User.findById(req.user.id)
        //check for user object --- true
    if (!user) {
        res.status(401)
        throw new Error('User not found (from getNotes func)')
    }

    //get the specific ticket
    const ticket = await Ticket.findById(req.params.ticketId)

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
            // the ticket id match the user id
        throw new Error('User is not authorized to access another user notes.')
    }

    const notes = await Note.find({ ticket: req.params.ticketId })

    res.status(200).json(notes)
})


//@description create ticket note
//@route POST /api/tickets/:tickedId/notes
//access Private
const addNote = asyncHandler(async(req, res) => {
    //get the user id from token
    const user = await User.findById(req.user.id)
        //check for user object --- true
    if (!user) {
        res.status(401)
        throw new Error('User not found (from getNotes func)')
    }

    //get the specific ticket
    const ticket = await Ticket.findById(req.params.ticketId)
        //make sure user owns the ticket
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User is not authorized to access another user notes.')
    }

    const note = await Note.create({
        user: req.user.id,
        ticket: req.params.ticketId,
        text: req.body.text,
        isStaff: false
    })

    res.status(200).json(note)
})

module.exports = {
    getNotes,
    addNote
}