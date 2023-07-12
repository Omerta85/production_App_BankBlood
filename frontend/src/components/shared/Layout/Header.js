import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom"
import {BiDonateBlood}  from "react-icons/bi"
import {FaRegCircleUser} from "react-icons/fa6"
import {useSelector} from "react-redux";

const Header = () => {
    const{ user } = useSelector((state) => state.auth);
        const navigate = useNavigate();
        const location = useLocation();
    //logout handler
    const handleLogout = () => {
        localStorage.clear()
        alert("Logout Successfully")
        navigate('/login')
    }

    return (
        <>
           <nav className="navbar b">
               <div className="container-fluid">
                   <div className="navbar-brand h1"><BiDonateBlood color="red" />BANK BLOOD APP</div>
                   <ul className="navbar-nav flex-row ">
                       <li className='nav-item mx-3'>
                           <p className="nav-link ">
                               <FaRegCircleUser className="mx-2"/>WELCOME {""}
                               {user?.name || user?.hospitalName || user?.organizationName}{""}
                               &nbsp;
                               <span className="badge rounded-pill bg-success">{user?.role}</span>
                           </p>
                       </li>
                       {
                           (location.pathname === "/" ||
                               location.pathname ==="/donor" ||
                                   location.pathname ==="hospital"
                           ) ? (
                               <li className='nav-item mx-3'>
                                   <Link  to="/analytics" className="nav-link ">
                                    ANALYTICS
                                   </Link>
                               </li>
                           ) : (
                               <li className='nav-item mx-3'>
                                   <Link  to="/" className="nav-link ">
                                       HOME
                                   </Link>
                               </li>
                           )
                       }
                       <li className='nav-item mx-3'>
                           <button className="btn btn-danger" onClick={handleLogout}>LOGOUT</button>
                       </li>
                   </ul>
               </div>
           </nav>
        </>
    );
}
export {Header};