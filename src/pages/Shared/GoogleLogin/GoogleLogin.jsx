import React from 'react';
import { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
const GoogleLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();

    let from = location.state?.from?.pathname || "/";

    const { googleLogin } = useContext(AuthContext);
    const handleButton = () => {
        googleLogin()
            .then(result => {
                const loginUser = result.user;
                console.log(loginUser.displayName);
                console.log(loginUser.displayName);
                navigate('/');
                const saveUser = { name: loginUser.displayName, email: loginUser.email };
                fetch(`https://school-summer-camp-server.vercel.app/users`, {
                    method: "POST",
                    headers: {
                        "content-type": 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        // navigate('/');

                    })
            })
    }
    return (
        <div className='text-center -mt-3'>
            <div className='text-center -mt-4'>
                <button onClick={handleButton} className=''><FcGoogle className='w-10 h-10' /></button>
            </div>
        </div>
    );
};

export default GoogleLogin;