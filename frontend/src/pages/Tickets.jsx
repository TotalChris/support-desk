import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {getTickets, reset} from "../features/tickets/ticketSlice.js";
import Spinner from "../components/Spinner.jsx";
import BackButton from "../components/BackButton.jsx";
import TicketItem from "../components/TicketItem.jsx";

const Tickets = () => {

    const {tickets, isLoading, isSuccess, isError} = useSelector(state => state.tickets);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            if(isSuccess){
                dispatch(reset());
            }
        }
    }, [dispatch, isSuccess])

    useEffect(() => {
        dispatch(getTickets())
    }, [dispatch])

    if(isLoading){
        return Spinner;
    }

    return (
        <>
            <BackButton url='/' />
            <h1>Open Tickets</h1>
            <div className="tickets">
                <div className="ticket-headings">
                    <div>Date</div>
                    <div>Product</div>
                    <div>Status</div>
                    <div></div>
                </div>
                {tickets.map((ticket) => {
                    return <TicketItem key={ticket._id} ticket={ticket}/>
                })}
            </div>
        </>
    );
};

export default Tickets;