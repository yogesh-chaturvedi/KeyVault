import React, { useContext } from 'react'
import { useForm } from "react-hook-form"
import { Mail, Lock, EyeOff, Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthWrappers from '../component/ui/wrappers/AuthWrappers';
import AuthInput from '../component/ui/input/AuthInput';
import AuthButton from '../component/ui/buttons/AuthButton';
import { loginUser } from '../services/auth.services';
import { toast } from "react-toastify";
import { AuthContext } from '../context/AuthContext';
import { useState } from 'react';


const Login = () => {


    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(true)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()


    const onSubmit = async (data) => {
        try {
            const response = await loginUser(data);
            setUser(response.user)
            if (response.success) {
                toast.success("Login Successful 🎉");
            }
            navigate('/vaultLocked')
        }
        catch (error) {
            console.error("Login failed:", error.response?.data?.message)
            toast.error(error.response?.data?.message)
        }
    }

    return (

        <AuthWrappers>
            <div className="w-full max-w-md bg-[#020617] border border-slate-800 rounded-2xl shadow-xl p-8">

                {/* Heading */}
                <h1 className="text-2xl font-bold text-white text-center">
                    Welcome back
                </h1>
                <p className="text-slate-400 text-sm text-center mt-2">
                    Login to your account 🔐
                </p>

                {/* Form */}
                <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>

                    {/* Email */}
                    <AuthInput label='Email' icon={Mail} type='email' placeholder="you@example.com" error={errors.email} register={register("email", { required: 'Email is required' })} />

                    {/* Password */}
                    <div className='relative'>
                        <AuthInput label='Password' icon={Lock} type={showPassword ? "password" : "text"} placeholder="••••••••" error={errors.password} register={register("password", { required: 'Password is required', minLength: { value: 5, message: "Password must be at least 5 characters long" } })} />
                        <button
                            type='button'
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-gray-500 hover:text-white absolute top-11 right-2"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {/* Button */}
                    <AuthButton type="submit" text="Login" />
                </form>

                {/* Signup text */}
                <p className="text-sm text-slate-400 text-center mt-6">
                    Don’t have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-blue-500 hover:text-blue-400 font-medium"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </AuthWrappers>
    );
};

export default Login
