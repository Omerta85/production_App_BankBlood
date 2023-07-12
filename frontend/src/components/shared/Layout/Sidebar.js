import React from  'react';
import {useLocation, Link} from "react-router-dom";
// import {userMenu} from "./Menu/userMenu";

import '../../../styles/Layout.css';
import {useSelector} from "react-redux";

const Sidebar = () => {
    //Get user State
    const {user} = useSelector((state) => state.auth)
    const location = useLocation();
    return (
        <div>
            <div className="sidebar">
                <div className="menu">
                    {user?.role === 'organization' && (
                        <>
                            <div className={`menu-item ${location.pathname === '/' && 'active'}`}>
                                <i className="fa-solid fa-warehouse"></i>
                                <Link to="/">INVENTORY</Link>
                            </div>
                            <div className={`menu-item ${location.pathname === '/donor' && 'active'}`}>
                                <i className="fa-solid fa-hand-holding-medical"></i>
                                <Link to="/donor">DONOR</Link>
                            </div>
                            <div className={`menu-item ${location.pathname === '/hospital' && 'active'}`}>
                                <i className="fa-solid fa-house-medical"></i>
                                <Link to="/hospital">HOSPITAL</Link>
                            </div>
                        </>
                    )}
                    {user?.role === 'admin' && (
                        <>
                            <div className={`menu-item ${location.pathname === '/donor-list' && 'active'}`}>
                                <i className="fa-solid fa-warehouse"></i>
                                <Link to="/donor-list">DONOR LIST</Link>
                            </div>
                            <div className={`menu-item ${location.pathname === '/hospital-list' && 'active'}`}>
                                <i className="fa-solid fa-hand-holding-medical"></i>
                                <Link to="/hospital-list">HOSPITAL LIST</Link>
                            </div>
                            <div className={`menu-item ${location.pathname === '/org-list' && 'active'}`}>
                                <i className="fa-solid fa-house-medical"></i>
                                <Link to="/org-list">ORGANIZATION LIST</Link>
                            </div>
                        </>
                    )}
                    {(user?.role === 'donor' || user?.role === 'hospital') && (
                        <>
                            <div className={`menu-item ${location.pathname === '/organization' && 'active'}`}>
                                <i className="fa-solid fa-building-ngo"></i>
                                <Link to="/organization">ORGANIZATION</Link>
                            </div>
                        </>
                        )}
                    {(user?.role === 'hospital') && (
                        <>
                            <div className={`menu-item ${location.pathname === '/consumer' && 'active'}`}>
                                <i className="fa-solid fa-building-ngo"></i>
                                <Link to="/consumer">CONSUMER</Link>
                            </div>
                        </>
                    )}
                    {user?.role === "donor" && (
                        <div
                            className={`menu-item ${
                                location.pathname === "/donation" && "active"
                            }`}
                        >
                            <i className="fa-sharp fa-solid fa-building-ngo"></i>
                            <Link to="/donation">DONATION</Link>
                        </div>
                    )}

                    {/*{userMenu.map((menu) => {
                       const isActive = location.pathname === menu.path
                       return (
                           <div
                               className={`menu-item ${isActive && 'active'}`}
                                key={menu.name}
                           >
                            <i className={menu.icon}></i>
                               <Link to={menu.path}>{menu.name}</Link>
                           </div>
                       )
                    })}*/}
                </div>
            </div>
        </div>
    );
}
export {Sidebar};