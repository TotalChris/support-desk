import React, {useState} from 'react';
import {FaSignInAlt} from "react-icons/fa";
import {toast} from "react-toastify";

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const {email, password} = formData;

    const handleChange = (e) => {
        setFormData((prevState) => {
            return {
                ...prevState,
                [e.target.id]: e.target.value,
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!email || !password){
            toast.error('Please fill out all required fields');
            return;
        }
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /><br/>Login
                </h1>
                <p>Log in to your account</p>
            </section>
            <section className="form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="email" className="form-control" id='email' value={email} onChange={handleChange} placeholder='Email'/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id='password' value={password} onChange={handleChange} placeholder='Password'/>
                    </div>
                    <div className='form-group'>
                        <button type='submit' className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Login;