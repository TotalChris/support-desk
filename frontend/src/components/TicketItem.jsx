import React from 'react';
import {Link} from 'react-router-dom'
import {FaExternalLinkAlt} from 'react-icons/fa'

const TicketItem = ({ticket}) => {
    return (
        <div className='ticket'>
            <div>{new Date(ticket.createdAt).toLocaleString('en-US')}</div>
            <div>{ticket.product}</div>
            <div className={`status status-${ticket.status}`}>
                {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
            </div>
            <Link to={`/ticket/${ticket._id}`} className='btn btn-reverse btn-sm'>View&nbsp;<FaExternalLinkAlt /></Link>
        </div>
    );
};

export default TicketItem;