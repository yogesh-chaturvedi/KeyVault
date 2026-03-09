import React, { useContext, useEffect, useState } from 'react'
import AppLayoutWrapper from '../component/ui/wrappers/AppLayoutWrapper'
import PageWrapper from '../component/ui/wrappers/PageWrapper'
import Navbar from '../component/layouts/Navbar'
import Footer from '../component/layouts/Footer'
import PasswordInput from '../component/ui/input/PasswordInput'
import { useForm } from "react-hook-form"
import { addPassword, fetchSinglePassword, editPassword } from '../services/passwords.services'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { generatePassword } from '../utils/passwordGenerator'
import CategorySelect from '../component/ui/input/CategorySelect'

const AddPassword = () => {

    const { id } = useParams();
    const isEditMode = Boolean(id);
    const [showPassword, setShowPassword] = useState(false)

    const [pass, setPass] = useState(null)

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm()

    async function onSubmit(data) {
        if (isEditMode) {
            try {
                const response = await editPassword(data, id)
                if (response.success) {
                    toast.success("Updated Successdully")
                }
            }
            catch (error) {
                console.error("editPassword failed", error);
                toast.error(error.response.data.message)
            }
        }
        else {
            console.log("add password clicked", data)
            try {
                const response = await addPassword(data);
                console.log("success", response)
                if (response.success) {
                    toast.success("Password Saved Successfully")
                    reset();
                }
            }
            catch (error) {
                console.error("add password failed", error)
                toast.error(error.response.data.message)
            }
        }
    }

    async function getSinglePassword() {
        if (!id) return;
        try {
            const response = await fetchSinglePassword(id);

            if (response.success) {
                setPass(response.data)
                reset();
            }

        }
        catch (error) {
            console.error('getSinglePassword edit mode failed', error);
        }

    }
    useEffect(() => {
        if (isEditMode && id) {
            getSinglePassword();
        }
    }, [isEditMode, id])


    useEffect(() => {
        if (isEditMode && pass) {
            reset({
                site: pass.site,
                password: pass.password,
                siteUrl: pass.siteUrl,
                userName: pass.userName,
                category: pass.category,
            })
        }

    }, [isEditMode, pass, reset])


    function handleGenerate() {
        const newPassword = generatePassword({
            length: 16,
            uppercase: true,
            lowercase: true,
            numbers: true,
            symbols: true
        })

        setValue("password", newPassword, { shouldValidate: true });
    }

    return (
        <AppLayoutWrapper>
            <Navbar />
            <div className='flex-1'>
                <PageWrapper>
                    <div className="w-full mx-auto bg-white rounded-2xl shadow-xl p-8">

                        {/* Big Heading */}
                        <h1 className="text-4xl font-bold text-center mb-3">
                            Save Your Password
                        </h1>

                        <p className="text-gray-500 text-center mb-6">
                            Add and manage your credentials securely.
                        </p>

                        <form onSubmit={handleSubmit(onSubmit)}>

                            {/* Site Name */}
                            <PasswordInput lable="App / Website Name" type="text" placeholder="Instagram" error={errors.site} register={register("site", { required: "Site name is required" })} />

                            {/* Site URL */}
                            <PasswordInput lable="Site URL" type="url" placeholder="URL" error={errors.siteUrl} register={register("siteUrl", { required: "Site Url is required" })} />

                            <div className='flex items-center gap-5 flex-1'>

                                {/* Username */}
                                <PasswordInput lable="UserName" type="text" placeholder="userName" error={errors.userName} register={register("userName", { required: "userName is required" })} />

                                {/* categorey */}
                                <CategorySelect label="Category" error={errors.category} register={register("category", { required: "Category is required" })} />

                            </div>
                            {/* Password */}
                            <div className='flex items-center gap-2'>
                                <div className='relative z-1 flex-1'>

                                    <PasswordInput lable="Password" type={showPassword ? "text" : "password"} placeholder="************" error={errors.password} register={register("password", { required: "Password is required", minLength: { value: 5, message: "Password must be at least 5 characters long" } })} />

                                    {/* show hide button */}
                                    <button type='button' onClick={() => { setShowPassword(!showPassword) }} className='text-blue-400 absolute right-0 top-0'>{showPassword ? "Hide Password" : "Show Password"}</button>

                                </div>

                                {/* generator */}
                                <button
                                    type='button'
                                    onClick={() => { handleGenerate() }}
                                    className="px-4 py-2 mt-1 bg-[#9046CF] text-white font-medium rounded-lg shadow-md hover:bg-[#7e3bb3] active:scale-95 transition-all duration-200"
                                >Generate Password</button>

                            </div>

                            {/* Button */}
                            <button
                                type='submit'
                                className="w-[20%] bg-black text-white py-3 rounded-lg hover:opacity-90 transition">
                                {isEditMode ? "Edit Password" : "Save Password"}
                            </button>
                        </form>

                        {/* Extra filler content */}
                        <div className="mt-8 text-center text-xs text-gray-400">
                            Your data is encrypted and protected.
                        </div>

                    </div>
                </PageWrapper>
            </div>
            <Footer />
        </AppLayoutWrapper>
    )
}

export default AddPassword
