import React, {useEffect} from 'react';
import {useState} from "react";
import {FaUser} from "react-icons/fa";
import {toast} from "react-toastify";
import {useSelector, useDispatch} from "react-redux";
import {register, reset} from "../features/auth/authSlice.js";
import {useNavigate} from "react-router-dom";
import Spinner from "../components/Spinner.jsx";

const Register = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {user, isLoading, isSuccess, isError, message} = useSelector(state => state.auth)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })

    const {name, email, password, password2} = formData;

    useEffect(() => {
        if(isError){
            toast.error(message);
        }

        if(isSuccess && user){
            navigate('/');
        }

        dispatch(reset())
    }, [isError, isSuccess, message, user, navigate, dispatch])

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

        if(!name || !email || !password || !password2){
            toast.error('Please fill out all required fields');
            return;
        }

        if(password !== password2){
            toast.error('Passwords do not match');
            return;
        }

        const userData = {
            name,
            email,
            password
        }

        dispatch(register(userData))
    }

    if(isLoading){
        return <Spinner />
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser /><br/>Register
                </h1>
                <p>Create a new account</p>
            </section>
            <section className="form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" id='name' value={name} onChange={handleChange} placeholder='Name*'/>
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control" id='email' value={email} onChange={handleChange} placeholder='Email*'/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id='password' value={password} onChange={handleChange} placeholder='Password*'/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id='password2' value={password2} onChange={handleChange} placeholder='Confirm Password*'/>
                    </div>
                    <div className='form-group'>
                        <button type='submit' className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Register;