import React, { useContext, useEffect, useState } from 'react'
import AppLayoutWrapper from '../component/ui/wrappers/AppLayoutWrapper'
import Navbar from '../component/layouts/Navbar'
import PageWrapper from '../component/ui/wrappers/PageWrapper'
import Button from '../component/ui/buttons/Button'
import Footer from '../component/layouts/Footer'
import EditProfilePopUp from '../component/layouts/EditProfilePopUp'
import { AuthContext } from '../context/AuthContext'
import { passwordStats } from '../services/passwords.services'

const Profile = () => {

    const [editProfile, setEditProfile] = useState(false)
    const { user } = useContext(AuthContext)

    const [stats, setStats] = useState(null);

    async function getStats() {
        try {
            const response = await passwordStats();
            if (response.success) {
                setStats(response.stats);
            }
        }
        catch (error) {
            console.error("getStats failed", error)
        }
    }
    useEffect(() => {
        getStats();
    }, [])

    const strong = stats?.find(s => s._id === "strong")?.count || 0;
    const weak = stats?.find(s => s._id === "weak")?.count || 0;
    const medium = stats?.find(s => s._id === "medium")?.count || 0;


    return (
        <AppLayoutWrapper>
            <Navbar />
            <div className="flex-1">
                <PageWrapper>
                    <div className="min-h-[calc(100vh-100px)] bg-gray-50 p-6 rounded-2xl">
                        <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-md">

                            {/* Left Side - User Info */}
                            <div className="flex items-center gap-5">

                                {/* Profile Image */}
                                <img
                                    src={user?.profileImage?.url || "/default-avatar.png"}
                                    alt="user"
                                    className="w-24 h-24 rounded-full object-cover border-4 border-[#9046CF]"
                                />

                                {/* Name + Email */}
                                <div>
                                    <h2 className="text-2xl font-bold">{user.name}</h2>
                                    <p className="text-gray-500 text-sm">{user.email}</p>
                                </div>

                            </div>

                            {/* Right Side - Edit Button */}
                            <Button text="Edit Profile" onEdit={() => setEditProfile(true)} />

                        </div>

                        {/* Passwords Strength */}
                        <div className="w-full bg-white rounded-2xl shadow-md p-6 flex justify-between mt-10">

                            {/* Strong */}
                            <div className="flex flex-col items-center flex-1">
                                <span className="text-green-600 font-semibold text-lg">
                                    Strong
                                </span>
                                <span className="text-2xl font-bold mt-1">
                                    {strong}
                                </span>
                            </div>


                            {/* Medium */}
                            <div className="flex flex-col items-center flex-1">
                                <span className="text-red-600 font-semibold text-lg">
                                    Medium
                                </span>
                                <span className="text-2xl font-bold mt-1">
                                    {medium}
                                </span>
                            </div>


                            {/* Weak */}
                            <div className="flex flex-col items-center flex-1">
                                <span className="text-yellow-500 font-semibold text-lg">
                                    Weak
                                </span>
                                <span className="text-2xl font-bold mt-1">
                                    {weak}
                                </span>
                            </div>

                        </div>

                        {/* Text */}
                        <div className="w-full bg-[#3E92CC]/10 rounded-2xl shadow-md p-6 flex items-center justify-between mt-10">
                            <p className='text-[#130F26]/70'>These results are bassed of your last security scan.</p>
                        </div>

                        {/* edit profile */}
                        {editProfile && <EditProfilePopUp isOpen={editProfile} onClose={() => { setEditProfile(false) }} />}

                    </div>
                </PageWrapper>
            </div>
            <Footer />
        </AppLayoutWrapper>
    )
}

export default Profile
