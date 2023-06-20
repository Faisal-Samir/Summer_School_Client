import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { FcGoogle } from 'react-icons/fc';
import GoogleLogin from '../Shared/GoogleLogin/GoogleLogin';
import useTitle from '../../hooks/useTitle';

const Login = () => {
    useTitle("Login");
    const location = useLocation();
    const { login } = useContext(AuthContext);
    // UseTitle("Login");
    const navigate = useNavigate();
    const [error, setError] = useState("");
    let from = location.state?.from?.pathname || "/";

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        login(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate(from, { replace: true });
            })
            .catch(error => {
                // console.log(error);
                setError(error.message);
            })

    };
    return (
        <div className="mt-10 mb-10 mx-auto">
            <div className=''>
                <p className='text-center font-bold text-2xl mb-4'>Login</p>
                <form onSubmit={handleLogin} className="card flex-shrink-0 w-full max-w-sm  mx-auto border">
                    <div className="card-body -mt-10">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email"
                                name='email'
                                placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control -mt-10">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password"
                                name='password' className="input input-bordered" />
                        </div>
                        <div className="form-control -mt-6">
                            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors duration-300">Login</button>
                        </div>
                        <p className='text-center text-lg mb-10'>New here? <Link to="/registration" className='btn-link '>Create a new Account</Link></p>
                    </div>
                    <div className='-mt-16'>
                        <GoogleLogin></GoogleLogin>
                        {
                            error && <div className='text-red-500 font-semibold text-center'>{error}</div>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;

