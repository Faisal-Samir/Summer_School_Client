import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import useAdmin from '../../../hooks/useAdmin';
import useInstructor from '../../../hooks/useInstructor';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout()
            .then(() => {
                navigate('/login');
            })
    }

    return (
        <div>
            <div className="navbar bg-blue-200">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/instructor">Instructors</Link></li>
                            <li><Link to="/classes">Classes</Link></li>
                            {
                                user ? <div className='items-center flex space-x-3'>
                                    {isAdmin ? <li><Link to="/dashboard/manageClasses">Dashboard</Link></li> :
                                        isInstructor ? <li><Link to="/dashboard/myClasses">Dashboard</Link></li> :
                                            <li><Link to="/dashboard/stdClass">Dashboard</Link></li>}
                                    <li><button onClick={handleLogout} className='btn btn-primary'>Logout</button></li>
                                    <li><img className='w-10 h-10 rounded-full' title={user.displayName} src={user.photoURL} alt="" /></li>
                                </div> :
                                    <>
                                        <li><Link to="/login">Login</Link></li>
                                        <li><Link to="/registration">Register</Link></li>
                                    </>
                            }
                        </ul>
                    </div>
                    <p className="text-sm normal-case lg:text-xl">Sam<span className='text-sm lg:text-3xl font-semibold text-[#006600] '>'s Gr</span>ound</p>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className=" flex space-x-3 items-center px-1">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/instructor">Instructors</Link></li>
                        <li><Link to="/classes">Classes</Link></li>

                        {
                            user ? <div className='items-center lg:flex space-x-3'>
                                {isAdmin ? <li><Link to="/dashboard/manageClasses">Dashboard</Link></li> :
                                    isInstructor ? <li><Link to="/dashboard/myClasses">Dashboard</Link></li> :
                                        <li><Link to="/dashboard/stdClass">Dashboard</Link></li>}
                                <li><button onClick={handleLogout} className='btn btn-primary'>Logout</button></li>
                                <li><img className='w-10 h-10 rounded-full' title={user.displayName} src={user.photoURL} alt="" /></li>
                            </div> :
                                <>
                                    <li><Link to="/login">Login</Link></li>
                                    <li><Link to="/registration">Register</Link></li>
                                </>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;