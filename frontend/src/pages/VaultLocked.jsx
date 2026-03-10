import React from "react";
import { Lock, Shield, KeyRound, EyeOff, Eye } from "lucide-react";
import { useState } from "react";
import { unlockVault } from "../services/auth.services";
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const VaultLocked = () => {

    const { user, setVaultUnlocked } = useContext(AuthContext)
    const [MasterPass, setMasterPass] = useState('')
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(true)

    async function handleUnlockVault() {
        try {
            const response = await unlockVault(MasterPass)
            if (response.success) {
                setVaultUnlocked(true)
                navigate('/')
                toast.success(response.message);
            }
        }
        catch (error) {
            console.error('handleUnlockVault failed', error)
            toast.error(error.response.data.message);
        }
    }


    function handleChange(e) {
        setMasterPass(e.target.value)
    }


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="bg-blue-100 p-4 rounded-full">
                        <Lock size={32} className="text-blue-600" />
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                    Vault Locked
                </h2>

                <p className="text-center text-gray-500 mb-6">
                    Your passwords are securely encrypted.
                    Enter your master password to unlock.
                </p>

                {/* Hardcoded email display */}
                <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg mb-6">
                    <Shield size={18} className="text-gray-500" />
                    <span className="text-sm text-gray-700">
                        Logged in as: {user.email}
                    </span>
                </div>

                {/* Master Password Input */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Master Password
                    </label>
                    <div className="relative">
                        <KeyRound
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            value={MasterPass}
                            onChange={handleChange}
                            type={showPassword ? "password":"text"}
                            placeholder="Enter master password"
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type='button'
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-gray-500 hover:text-black absolute right-3 top-3"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>


                {/* Unlock Button */}
                <button
                    onClick={() => { handleUnlockVault() }}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Unlock Vault
                </button>

                {/* Footer Info */}
                <p className="text-xs text-gray-400 text-center mt-6">
                    For security reasons, your vault will auto-lock after 10 minutes of inactivity.
                </p>
            </div>
        </div>
    );
};

export default VaultLocked;