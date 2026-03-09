import React, { useState } from 'react'
import { X, Camera, User } from 'lucide-react'
import PasswordInput from '../ui/input/PasswordInput';
import Button from '../ui/buttons/Button';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify'

const EditProfilePopUp = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const { user, setUser, loading } = useContext(AuthContext)

    const [preview, setPreview] = useState(null);
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors }
    } = useForm();

    function handleImageChange(e) {
        const file = e.target.files[0];
        setPreview(URL.createObjectURL(file));
        setValue("profileImage", file);
    }

    useEffect(() => {
        if (isOpen && user) {
            reset({
                name: user.name,
                email: user.email,
                phone: user.phone,
                country: user.country,
                password: "" // never prefill password
            })
            setPreview(user.profileImage?.url);
        }
    }, [isOpen, user, reset])


    const onSubmit = async (data) => {
        try {
            const formData = new FormData();

            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("phone", data.phone);
            formData.append("country", data.country);

            if (data.profileImage) {
                formData.append("profileImage", data.profileImage);
            }

            const response = await axios({
                method: "post",
                url: `${import.meta.env.VITE_BASE_URL}/api/user/update-profile`,
                data: formData,
                withCredentials: true,
            })

            if (response.data.success) {
                setUser(response.data.userData)
                toast.success("Profile Updated Successfully")
            }
            onClose();


        } catch (error) {
            console.error("Edit profile failed", error);
            toast.error(error.response.data.message)
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4">

            {/* Modal Box */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                        Edit Profile
                    </h3>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full p-1 hover:bg-gray-200 transition"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* FORM START */}
                <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>

                    {/* Profile Image Upload */}
                    <div className="flex flex-col items-center gap-3">

                        {/* Image Preview */}
                        <div className="relative">
                            <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                <img
                                    src={preview || "/default-avatar.png"}
                                    alt="Profile preview"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Upload Button */}
                            <label className="absolute bottom-1 right-1 bg-green-600 p-2 rounded-full cursor-pointer hover:bg-green-700 transition">
                                <Camera size={16} className="text-white" />
                                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                            </label>
                        </div>

                        <p className="text-xs text-gray-500">
                            Click camera icon to change photo
                        </p>

                    </div>

                    {/* Inputs */}

                    {/* name */}
                    <PasswordInput type="text" placeholder="Full Name" error={errors.name} register={register("name", { required: "Name is required" })} />

                    {/* email */}
                    <PasswordInput type="email" placeholder="Email" error={errors.email} register={register("email", { required: "Email is required" })} />

                    {/* password */}
                    <PasswordInput type="password" placeholder="Enter New Password" error={errors.password} register={register("password")} />

                    {/* phone number */}
                    <PasswordInput type="text" placeholder="Phone Number" error={errors.phone} register={register("phone", { required: "Phone number is required" })} />

                    {/* Country */}
                    <PasswordInput type="text" placeholder="Country" error={errors.country} register={register("country", { required: "Country is required" })} />

                    {/* Buttons */}
                    <div className="flex gap-3 pt-2">

                        <Button type="button" text="Cancel" onEdit={onClose} />

                        <button
                            type="submit"
                            className="w-full py-2 rounded-xl bg-green-600 text-white transition flex items-center justify-center hover:bg-green-700"
                        >
                            Save Changes
                        </button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfilePopUp