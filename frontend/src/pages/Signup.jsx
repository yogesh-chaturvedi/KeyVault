import React from 'react'
import { useForm } from "react-hook-form"
import { Mail, Lock, User, EyeOff, Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthWrappers from '../component/ui/wrappers/AuthWrappers';
import AuthInput from '../component/ui/input/AuthInput';
import AuthButton from '../component/ui/buttons/AuthButton';
import { signupUser } from '../services/auth.services';
import { toast } from 'react-toastify';
import { useState } from 'react';

const Signup = () => {

    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(true)
    const [showMPassword, setShowMPassword] = useState(true)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
    } = useForm()


    const onSubmit = async (data) => {
        try {
            const response = await signupUser(data);
            if (response.success) {
                toast.success("Signup Successful 🎉");
            }
            navigate('/login')
        }
        catch (error) {
            console.error("Signup failed:", error.response?.data?.message)
            toast.error(error.response?.data?.message)
        }
    }


    return (

        <AuthWrappers>
            <div className="w-full max-w-md bg-[#020617] border border-slate-800 rounded-2xl shadow-xl p-8">

                {/* Heading */}
                <h1 className="text-2xl font-bold text-white text-center">
                    Create your account
                </h1>
                <p className="text-slate-400 text-sm text-center mt-2">
                    Welcome 👋 Let’s get you started
                </p>

                {/* Form */}
                <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>

                    {/* Name */}
                    <AuthInput label="Name" icon={User} type="text" placeholder="John Doe" error={errors.name} register={register("name", { required: 'Name is required' })} />

                    {/* Email */}
                    <AuthInput label="Email" icon={Mail} type="email" placeholder="you@example.com" error={errors.email} register={register("email", { required: 'Email is required' })} />
                    <div className='relative'>
                        {/* Password */}
                        <AuthInput label="Password" icon={Lock} type={showPassword ? "password" : "text"} placeholder="••••••••" error={errors.password} register={register("password", { required: 'Password is required', minLength: { value: 5, message: "Password must be at least 5 characters long" } })} />
                        <button
                            type='button'
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-gray-500 hover:text-white absolute top-11 right-2"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {/* Master Password */}
                    <div className='relative'>
                        <AuthInput label="Master Password" icon={Lock} type={showMPassword ? "password" : "text"} placeholder="Master Password" error={errors.masterPassword} register={register("masterPassword", { required: 'Master Password is required', minLength: { value: 5, message: "Master Password must be at least 5 characters long" } })} />
                        <button
                            type='button'
                            onClick={() => setShowMPassword(!showMPassword)}
                            className="text-gray-500 hover:text-white absolute top-11 right-2"
                        >
                            {showMPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {/* Button */}
                    <AuthButton type="submit" text="Sign Up" isDisabled={!isValid} />
                </form>

                {/* Login text */}
                <p className="text-sm text-slate-400 text-center mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-blue-500 hover:text-blue-400 font-medium"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </AuthWrappers>
    )
}

export default Signup
