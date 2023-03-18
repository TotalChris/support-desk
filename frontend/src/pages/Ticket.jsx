import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import Spinner from "../components/Spinner.jsx";
import {getTicket, closeTicket} from '../features/tickets/ticketSlice'
import {getNotes, reset as notesReset} from "../features/notes/noteSlice.js";
import BackButton from "../components/BackButton.jsx";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import NoteItem from "../components/NoteItem.jsx";

const Ticket = () => {

    const {ticket, isLoading, isSuccess, isError, message} = useSelector(state => state.tickets);
    const {notes, isLoading: notesIsLoading} = useSelector(state => state.notes);


    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            {notes && (
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