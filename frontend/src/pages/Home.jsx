import React from 'react';
import {FaQuestionCircle, FaTicketAlt, FaHeadset} from 'react-icons/fa'
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <>
           <section className="heading">
               <h1>
                   <FaHeadset /><br/>How can we help?
               </h1>
               <p>Choose one of the following options</p>
           </section>
            <Link to={'/new-ticket'} className={'btn btn-reverse btn-block'}>
               <FaQuestionCircle/> Create a New Ticket
            </Link>
            <Link to={'/tickets'} className={'btn btn-block'}>
                <FaTicketAlt/> Track an Existing Ticket
            </Link>
        </>
    );
};

export default Home;