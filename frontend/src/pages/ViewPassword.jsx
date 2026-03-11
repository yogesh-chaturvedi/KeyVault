import React, { useContext, useEffect, useState } from 'react'
import AppLayoutWrapper from '../component/ui/wrappers/AppLayoutWrapper'
import PageWrapper from '../component/ui/wrappers/PageWrapper'
import Footer from '../component/layouts/Footer'
import Navbar from '../component/layouts/Navbar'
import { ArrowLeft, Copy, Eye, EyeOff, User, Lock, Pencil, Trash2, } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSinglePassword, removePassword } from '../services/passwords.services'
import { toast } from 'react-toastify'
import DeleteConfirmModal from '../component/layouts/DeleteConfirmModal'
import { PasswordContext } from '../context/PasswordContext'
import helpers from '../utils/helpers'


const ViewPassword = () => {

    const navigate = useNavigate();
    const { passwords, setPasswords, fetchPasswords } = useContext(PasswordContext);
    const [showPassword, setShowPassword] = useState(false);
    const [editMode, setEditMode] = useState(false)
    const [showModal, setShowModal] = useState(false);

    const { getSiteName } = helpers

    const { id } = useParams();

    const [password, setPassword] = useState(null)

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
    };

    async function getSinglePassword() {
        try {
            const response = await fetchSinglePassword(id);

            if (response.success) {
                setPassword(response.data)
            }

        }
        catch (error) {
            console.error('getSinglePassword failed', error);
            toast.error(error.response.data.message)
        }

    }
    useEffect(() => {
        getSinglePassword()
    }, [])


    function handleEdit() {
        setEditMode((prev) => !prev);
        navigate(`/passwords-add/${id}`)
    }

    const handleDelete = async () => {
        const previousPasswords = passwords

        const remainingVaults = passwords.filter((item) => item._id !== id);
        setPasswords(remainingVaults);

        try {
            const response = await removePassword(id);
            if (response.success) {
                toast.success("Removed Successfully")
                navigate('/passwords')
            }
            else {
                setPasswords(previousPasswords)
            }
        }
        catch (error) {
            console.error("handleDelete failed", error);
        }
        setShowModal(false);
    };

    return (
        <AppLayoutWrapper>
            <Navbar />
            <div className='flex-1'>
                <PageWrapper>
                    <div className="min-h-[calc(100vh-100px)] bg-gray-50 p-6 rounded-2xl">
                        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-6 space-y-6">

                            {/* Back Button */}
                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center gap-2 text-gray-600 hover:text-black transition"
                            >
                                <ArrowLeft size={18} />
                                Back
                            </button>

                            {/* Site Info */}
                            <div className="flex items-center gap-4 border-b pb-4">
                                <img
                                    src={`https://www.google.com/s2/favicons?sz=128&domain_url=https://${getSiteName(password?.site)}.com`}
                                    alt="logo"
                                    className="w-12 h-12 rounded-lg"
                                />
                                <div>
                                    <h2 className="text-2xl font-bold">{password?.site}</h2>
                                    <a
                                        href={password?.siteUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-sm text-blue-500 hover:underline"
                                    >
                                        {password?.siteUrl}
                                    </a>
                                </div>
                            </div>

                            {/* 👤 Username */}
                            <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                                <div className="flex items-center gap-3">
                                    <User size={18} className="text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Username</p>
                                        <p className="font-medium">{password?.userName}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleCopy(password?.userName)}
                                    className="text-gray-500 hover:text-black"
                                >
                                    <Copy size={18} />
                                </button>
                            </div>

                            {/* 🔒 Password */}
                            <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                                <div className="flex items-center gap-3">
                                    <Lock size={18} className="text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Password</p>
                                        <p className="font-medium tracking-widest">
                                            {showPassword ? password?.password : "••••••••••"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-gray-500 hover:text-black"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>

                                    <button
                                        onClick={() => handleCopy(password?.password)}
                                        className="text-gray-500 hover:text-black"
                                    >
                                        <Copy size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* 📅 Created Date */}
                            <div className="text-sm text-gray-500">
                                Created on: {password?.createdAt}
                            </div>

                            {/* ✏️ Action Buttons */}
                            <div className="flex justify-end gap-4 pt-4 border-t">
                                <button
                                    onClick={() => { handleEdit() }}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition">
                                    <Pencil size={16} />
                                    Edit
                                </button>

                                <button
                                    onClick={() => setShowModal(true)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">
                                    <Trash2 size={16} />
                                    Delete
                                </button>
                            </div>
                        </div>

                        <DeleteConfirmModal isOpen={showModal} onClose={() => setShowModal(false)} onConfirm={handleDelete} />

                    </div>
                </PageWrapper>
            </div>
            <Footer />
        </AppLayoutWrapper>
    )
}

export default ViewPassword
