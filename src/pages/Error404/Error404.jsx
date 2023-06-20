import React from 'react';
import { useNavigate } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';

const Error404 = () => {
    useTitle("Error404");
    const navigate = useNavigate();
    const handleBtn = () =>{
        navigate('/');
    }
    return (
        <div className='relative'>
            <img src="https://i.ibb.co/8zCMjZM/reshot-illustration-data-science-404-error-4-WQ6572-DT3.png" alt="" />
            <button onClick={handleBtn} style={{top: '480px',left:'565px'}} className='btn btn-primary absolute '>Back To Home</button>
        </div>
    );
};

export default Error404;