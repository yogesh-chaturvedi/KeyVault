import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {

    const linkClass = ({ isActive }) =>
        `${isActive ? "underline" : ""}`;

    return (
        <footer className="bg-[#9046CF] text-white px-8 py-6 mt-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

                {/* Left - Website Name */}
                <div className="text-2xl font-bold text-gray-300">
                    KeyVault
                </div>

                {/* Middle - Links */}
                <div className="flex gap-6 text-sm text-gray-300">
                    <NavLink to="/" className={linkClass}>
                        Home
                    </NavLink>
                    <NavLink to="/passwords" className={linkClass}>
                        Passwords
                    </NavLink>
                    <NavLink to="/profile" className={linkClass}>
                        Profile
                    </NavLink>
                </div>

                {/* Right - Copyright */}
                <div className="text-sm text-gray-400">
                    © {new Date().getFullYear()} KeyVault. All rights reserved.
                </div>

            </div>
        </footer>
    )
}

export default Footer
