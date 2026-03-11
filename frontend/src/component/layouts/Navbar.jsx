import React, { useContext, useEffect, useState } from 'react'
import { LogOut, Search } from "lucide-react";
import SearchInput from '../ui/input/SearchInput';
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from '../../services/auth.services';
import { AuthContext } from '../../context/AuthContext';
import { PasswordContext } from '../../context/PasswordContext';
import { searchPassword } from '../../services/passwords.services';
import { toast } from 'react-toastify';



const Navbar = () => {

    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const { user, setUser } = useContext(AuthContext);
    const { passwords, setResults } = useContext(PasswordContext);

    const linkClass = ({ isActive }) =>
        `px-3 py-1 rounded-md text-sm font-medium transition
     ${isActive ? "bg-white text-[#9046CF]" : "text-white hover:bg-white/20"}`;


    async function handleLogout() {
        try {
            const response = await logoutUser();
            console.log("Success:", response);
            setUser(null)
            if (response.success) {
                toast.success("Logout Successful 🎉");
            }
            navigate('/login')
        }
        catch (error) {
            console.error("Login failed:", error.response?.data?.message)
            toast.error(error.response?.data?.message)
        }
    }

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (!query.trim()) {
                setResults(passwords)
                return;
            }
            handleSearch(query)
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [query, passwords])


    async function handleSearch(query) {
        try {
            console.log(query)
            const response = await searchPassword(query);
            if (response.success) {
                setResults(response.vault)
            }
        }
        catch (error) {
            console.error("handleSearch failed", error.response.data.message);
            toast.error('Search Failed!');
        }
    }

    function handleUserProfile() {
        navigate('/profile')
    }


    return (

        <nav className="w-full sticky top-0 z-50 h-20 bg-[#9046CF] flex items-center justify-evenly px-32">

            {/* Left: User info */}
            <div className="flex items-center gap-3">
                <img
                    src={user?.profileImage?.url || "/default-avatar.png"}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
                    onClick={() => { handleUserProfile() }}
                />
                <span className="text-white font-medium">
                    {user.name}
                </span>
            </div>

            {/* Middle: Search */}
            <div className="flex-1 flex items-center justify-center gap-8">
                {/* Nav Links */}
                <div className="flex items-center gap-4">
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

                {/* search bar */}
                <SearchInput type="text" placeholder="Search" icon={Search} value={query} onchange={(e) => { setQuery(e.target.value) }} />

            </div>

            {/* Right: Bell icon */}
            <div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>

        </nav>
    );
};

export default Navbar
