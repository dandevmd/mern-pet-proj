const mongoose = require('mongoose')


const TicketSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    product: {
        type: String,
        required: [true, 'Please select your product'],
        enum: ['iPhone', 'MacBook', 'iPad', 'iMac']
    },
    description: {
        type: String,
        required: [true, 'Please enter a description'],
    },
    status: {
        type: String,
        enum: ['new', 'opened', 'closed'],
        default: 'new',
        required: true
    },

}, {
    timestamps: true
})

module.exports = mongoose.model('Ticket', TicketSchema)