const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authmidleware')
const {
    getTickets,
    createTicket,
    getOneTicket,
    updateOneTicket,
    deleteOneTicket
} = require('../controllers/ticketController')

//Re-route into note router
const noteRouter = require('./noteRoutes')
router.use('/:ticketId/notes', noteRouter)


router.route('/').get(protect, getTickets).post(protect, createTicket)

router.route('/:id').get(protect, getOneTicket).put(protect, updateOneTicket).delete(protect, deleteOneTicket)


module.exports = router