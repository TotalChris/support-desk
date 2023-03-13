import React from 'react';
import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {FaTicketAlt} from "react-icons/fa";

const NewTicket = () => {

    const {user} = useSelector(state => state.auth);

    const [formData, setFormData] = useState({
        product: '',
        description: '',
    })

    const {product, description} = formData;

    const handleSubmit = (e) => {
        e.preventDefualt();

    }

    const handleChange = (e) => {
        setFormData((prevState) => {
            return {
                ...prevState,
                [e.target.id]: e.target.value,
            }
        })
    }

    return (
        <>
            <section className='heading'>
                <h1><FaTicketAlt/><br/>Create New Ticket</h1>
                <p>Submit a new support ticket using the form</p>
            </section>
            <section className="form">
                <div className="form-group">
                    <label htmlFor="name">Your Name:</label>
                    <input type="text" className="form-control" value={user.name} disabled id='name'/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Your Email:</label>
                    <input type="text" className="form-control" value={user.email} disabled id='email'/>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="product">Product you're having trouble with:</label>
                        <select name="product" id="product" value={product} onChange={handleChange}>
                            <option value='Opus'>Opus</option>
                            <option value='Device Alive'>Device Alive</option>
                            <option value='OnTheClock'>OnTheClock</option>
                            <option value='CCKM'>CCKM</option>
                            <option value='MST'>MST / Quick Quote</option>
                            <option value='Demo TV'>DirecTV Stream Demo / TV</option>
                            <option value='Other'>Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Describe your issue:</label>
                        <textarea name="description" id="description" className='form-control' placeholder='Description' value={description} onChange={handleChange}></textarea>
                    </div>
                    <div className="form-group">
                        <button type='submit' className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default NewTicket;