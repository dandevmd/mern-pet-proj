import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, reset, closeTicket } from '../features/tickets/ticketSlice'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'


const Ticket = () => {
    const { isLoading, message, isError, ticket } = useSelector(state => state.tickets)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { ticketId } = useParams()

    useEffect(() => {
        if (isError) {
            return toast.error(message)
        }

        dispatch(getTicket(ticketId))
    }, [message, isError, dispatch, ticketId])

    const closeOnClick = (ticketId) => {
        dispatch(closeTicket(ticketId))
        navigate('/tickets')
        toast.success('Ticked status changed to "closed"')
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className='ticket-header'>
            <header className="ticket-header">
                <BackButton url='/tickets' />
                <h2>
                    Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>{ticket.status}</span>
                </h2>
                <h3>
                    Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
                </h3>
                <h3>
                    Product : {ticket.product}
                </h3>
                <hr />
                <div className="ticket-desc">
                    <h3>Description Issue</h3>
                    <p>{ticket.description}</p>
                </div>
            </header>

            {ticket.status !== 'closed' && (
                <button className="btn btn-block btn-danger" onClick={closeOnClick(ticketId)}>Close Ticket</button>
            )}
        </div>
    )
}

export default Ticket