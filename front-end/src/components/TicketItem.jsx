import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteTicket } from '../features/tickets/ticketSlice'

const TicketItem = ({ ticket }) => {
  const dispatch = useDispatch()

  const deleteCurrentTicket = () => {
    dispatch(deleteTicket(ticket._id))
  }

  return (
    <div className='ticket'>
      <div>{new Date(ticket.createdAt).toLocaleString('en-US')}</div>
      <div>{ticket.product}</div>
      <div className={`status status-${ticket.status}`}>{ticket.status}</div>
      <Link to={`/ticket/${ticket._id}`} className='btn btn-reverse btn-sm'>
        View Ticket Info
      </Link>
      <button className='btn btn-sm' onClick={deleteCurrentTicket}>
        DELETE
      </button>
    </div>
  )
}

export default TicketItem