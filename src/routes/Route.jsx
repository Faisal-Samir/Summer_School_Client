import {
    createBrowserRouter
} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import Registration from "../pages/Registration/Registration";
import Login from "../pages/Login/Login";
import Dashboard from "../layout/dashboard";
import AllUsers from "../pages/AllUser/AllUsers";
import Instructor from "../pages/Instructor/Instructor";
import AddClass from "../pages/AddClass/AddClass";
import MyClasses from "../pages/Dashboard/MyClasses/MyClasses";
import PrivateRoute from "./PrivateRoute";
import ManageClass from "../pages/Dashboard/ManageClass/ManageClass";
import Classes from "../pages/Classes/Classes";
import Feedback from "../pages/Feedback/Feedback";
import UserSelectedClass from "../pages/Dashboard/UserSelectedClass/UserSelectedClass";
import Payment from "../pages/Dashboard/Payment/Payment";
import EnrollmentClass from "../pages/Dashboard/EnrollmentClass/EnrollmentClass";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import Error404 from "../pages/Error404/Error404";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/registration',
                element: <Registration></Registration>
            },
            {
                path: 'instructor',
                element: <Instructor></Instructor>
            },
            {
                path: 'classes',
                element: <Classes></Classes>
            },
            {
                path: '/feedBack/:_id',
                element: <Feedback></Feedback>,
                loader: ({ params }) => fetch(`https://school-summer-camp-server.vercel.app/insClass/${params._id}`)
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'allUser',
                element: <AllUsers></AllUsers>
            },
            {
                path: 'addClass',
                element: <AddClass></AddClass>
            },
            {
                path: 'myClasses',
                element: <MyClasses></MyClasses>
            },
            {
                path: 'manageClasses',
                element: <ManageClass></ManageClass>
            },
            {
                path: 'stdClass',
                element: <UserSelectedClass></UserSelectedClass>
            },
            {
                path: 'payment/:classId',
                element: <Payment></Payment>,
                loader: ({ params }) => fetch(`https://school-summer-camp-server.vercel.app/stdClas/${params.classId}`)
            },
            {
                path: 'enrollment',
                element: <EnrollmentClass></EnrollmentClass>
            },
            {
                path: 'paymentHistory',
                element: <PaymentHistory></PaymentHistory>
            }
        ],
    },
    {
        path: '*',
        element: <Error404></Error404>
    }
]);

export default router;