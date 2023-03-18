import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import Spinner from "../components/Spinner.jsx";
import {getTicket, closeTicket} from '../features/tickets/ticketSlice'
import {getNotes, addNote, reset as notesReset} from "../features/notes/noteSlice.js";
import BackButton from "../components/BackButton.jsx";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import NoteItem from "../components/NoteItem.jsx";
import Modal from 'react-modal';
import {FaPlus, FaRegWindowClose} from "react-icons/fa";

const customStyles = {
    content: {
        width: '600px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        position: 'relative',
    },
}

Modal.setAppElement('#root')

const Ticket = () => {

    const {ticket, isLoading, isSuccess, isError, message} = useSelector(state => state.tickets);
    const {notes, isLoading: notesIsLoading} = useSelector(state => state.notes);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [noteText, setNoteText] = useState('')

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const openModal = () => {
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    useEffect(() => {
        if(isError) {
            toast.error('Could not retrieve the ticket. It may have been closed or removed. Error: ' + message);
        }
        dispatch(getTicket(params.ticketId));
        dispatch(getNotes(params.ticketId));
    }, [isError, message, params.ticketId, dispatch])

    const onTicketClose = () => {
        dispatch(closeTicket(params.ticketId));
        toast.success('Ticket successfully closed');
        navigate('/tickets');
    }

    const onNoteSubmit = (e) => {
        e.preventDefault();
        dispatch(addNote({noteText, ticketId: params.ticketId}))
        closeModal();
    }

    if(isLoading || notesIsLoading){
        return <Spinner />;
    }

    if(isError){
        return <h3>Error retrieving ticket. Please try again.</h3>
    }

    return (
        <div className='ticket-page'>
            <header className='ticket-header'>
                <BackButton url="/tickets" />
                <h2>Ticket ID: {ticket._id}
                <span className={`status status-${ticket.status}`}>{ticket.status}</span>
                </h2>
                <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
                <h4>Product: {ticket.product}</h4>
                <hr/>
                <div className="ticket-desc">
                    <h3>Description of Issue:</h3>
                    <p>{ticket.description}</p>
                </div>
            </header>
            {
                ticket.status !== 'closed' && (
                    <button className='btn' onClick={openModal}><FaPlus /> Add Note</button>
                )
            }
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Add Note">
                <h2>Add Note</h2>
                <button className='btn-close' onClick={closeModal}><FaRegWindowClose /></button>
                <form onSubmit={onNoteSubmit}>
                    <div className="form-group">
                        <textarea name="noteText" id="noteText" className='form-control' placeholder='note' value={noteText} onChange={(e) => {setNoteText(e.target.value)}}></textarea>
                    </div>
                    <div className="form-group">
                        <button className='btn' type='submit'>Submit</button>
                    </div>
                </form>
            </Modal>
            {notes.length > 0 && (
                <>
                    <h2>Notes</h2>
                    {notes.map((note) => {
                        return <NoteItem key={note._id} note={note} />
                    })}
                </>
            )}
            {
                ticket.status !== 'closed' && (
                    <button className="btn btn-block btn-danger" onClick={onTicketClose}>Close Ticket</button>
                )
            }
        </div>
    );
};

export default Ticket;