import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import useInstructor from '../hooks/useInstructor';

const Dashboard = () => {
    // const isAdmin = true;
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    return (
        <div className="drawer drawer-mobile ">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center mt-10 w-full">
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="  min-h-screen">
                <label htmlFor="my-drawer-2" className=""></label>
                <ul className="menu p-4 w-64 mt-40">
                    {
                        isAdmin ? <>
                            <li><NavLink to="/dashboard/manageClasses"> Manage Classes</NavLink></li>
                            <li>
                                <NavLink to="/dashboard/allUser"> Manage Users </NavLink>
                            </li>

                        </> : isInstructor ? <>
                                <li><NavLink to="/dashboard/addClass">Add Class</NavLink></li>
                                <li><NavLink  to="/dashboard/myClasses">My Classes</NavLink></li>
                        </> :
                            <>
                                <li ><NavLink to="/dashboard/stdClass"> User Selected Class</NavLink></li>
                                <li><NavLink to="/dashboard/enrollment"> Enrollment Classes</NavLink></li>
                                <li><NavLink to="/dashboard/paymentHistory"> Payment History</NavLink></li>
                            </>
                    }

                    <div className="divider"></div>
                    <li><NavLink to="/"> Home</NavLink> </li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;