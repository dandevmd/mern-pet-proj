import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, closeTicket } from '../features/tickets/ticketSlice'
import { getNotes, reset as notesReset, createNote } from '../features/notes/noteSlice'
import { useParams, useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
import { toast } from 'react-toastify'

import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import NoteItem from '../components/NoteItem'
import { FaPlus } from 'react-icons/fa'


const customStyles = {
    content: {
        width: '600px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%,-50%)',
        position: 'relative'
    }
}

Modal.setAppElement('#root')

const Ticket = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [noteText, setNoteText] = useState('')
    const { isLoading, message, isError, ticket } = useSelector(state => state.tickets)
    const { isLoading: notesIsLoading, notes } = useSelector(state => state.notes)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { ticketId } = useParams()

    useEffect(() => {
        if (isError) {
            return toast.error(message)
        }

        dispatch(getTicket(ticketId))
        dispatch(getNotes(ticketId))

    }, [message, isError, ticketId])

    //modal state change
    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    //change ticket state
    const closeOnClick = () => {
        dispatch(closeTicket(ticketId))
        navigate('/tickets')
        toast.success('Ticked status changed to "closed"')
    }

//submit info to create new note
    const onNoteSubmit =(e)=>{
        e.preventDefault()
        dispatch(createNote({noteText,ticketId}))
        closeModal()
    }


    if (isLoading || notesIsLoading) {
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
                <h2>Notes:</h2>
            </header>


            {ticket.status !== 'closed' && (
                <button className="btn" onClick={openModal}>Add Note <FaPlus /></button>
            )}

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel='Add Note'>
                <h2>Add Note</h2>
                <button className="btn-close" onClick={closeModal}>X</button>

                <form onSubmit={onNoteSubmit}>
                    <div className="form-group">
                        <textarea 
                        name="noteText" 
                        id="noteText" 
                        className='form-control' 
                        placeholder='Describe your problem' 
                        value={noteText}
                        onChange={e=>setNoteText(e.target.value)}
                        style={{resize:'none'}}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn">Submit</button>
                    </div>
                </form>
            </Modal>


            {notes && notes.map(note => (
                <NoteItem key={note._id} note={note} />
            ))}


            {ticket.status !== 'closed' && (
                <button className="btn btn-block btn-danger" onClick={closeOnClick}>Close Ticket</button>
            )}
        </div>
    )
}

export default Ticket