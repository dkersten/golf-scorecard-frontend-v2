import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const Nav = (props) => {
    
    const { logout } = useAuth0();
    const { user, isAuthenticated } = useAuth0();

    const [openNav, setOpenNav] = useState(false);

    const toggleNav = () => {
        setOpenNav(!openNav)
    }

    const toggleIcon = () => {
        if (openNav === false) {
            return(
                <svg onClick={toggleNav} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"/></svg>
            )
        } else {
            return(
                <svg onClick={toggleNav} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"/></svg>
            )
        }
    }

    const closeNavMenu = () => {
        setOpenNav(!openNav)
    }

    const navOpen = () => {
        return(
            <div onClick={closeNavMenu} className="nav-links">
                <ul>
                    <li><NavLink to="/scorecard/new">Create New Scorecard</NavLink></li>
                    <li><NavLink to="/profile">Profile</NavLink></li>
                    {/* <li><NavLink to="/">Log Out</NavLink></li> */}
                    <li><button onClick={() => logout()}>Log Out</button></li>
                </ul>
            </div>
        )
    }

    return(
        isAuthenticated && (
            <nav>
                <div className="inner-container">
                    <div className="btn-container">
                        { toggleIcon() }
                        { openNav ? navOpen() : null }
                    </div>
                </div>
            </nav>
        )
    )
}

export default Nav;