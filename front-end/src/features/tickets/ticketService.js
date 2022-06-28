import axios from "axios";

const API_URL = '/api/tickets/'

// create ticket
const createTicket = async(ticketData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, ticketData, config)

    return response.data
}

// get user Tickets
const getTickets = async(token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// get ticket by id
const getTicket = async(ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + ticketId, config)

    return response.data
}

// close current ticket by id
const closeTicket = async(ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + ticketId, { status: 'closed' }, config)

    return response.data
}

// delete ticket by id
const deleteTicket = async(ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + ticketId, config)

    return response.data
}



const ticketService = {
    createTicket,
    getTickets,
    getTicket,
    closeTicket,
    deleteTicket
}
export default ticketService

//update ticket
//remove ticket