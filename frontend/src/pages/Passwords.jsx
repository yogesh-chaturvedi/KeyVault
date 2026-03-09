import React from 'react'
import AppLayoutWrapper from '../component/ui/wrappers/AppLayoutWrapper'
import Navbar from '../component/layouts/Navbar'
import PageWrapper from '../component/ui/wrappers/PageWrapper'
import { Plus } from 'lucide-react'
import Footer from '../component/layouts/Footer'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { PasswordContext } from '../context/PasswordContext'
import { useState } from 'react'
import DisplayPasswords from '../component/layouts/DisplayPasswords'


const Passwords = () => {

    const navigate = useNavigate();

    const { passwords, results } = useContext(PasswordContext)

    const [filterCategory, setFilterCategory] = useState("All");
    const [sortType, setSortType] = useState("newest");

    let processedPasswords = results && results.length > 0 ? results : passwords || [];

    // FILTER
    if (filterCategory !== "All") {
        processedPasswords = processedPasswords.filter(
            (item) => item.category === filterCategory
        );
    }

    // SORT
    if (sortType === "newest") {
        processedPasswords = [...processedPasswords].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
    }

    if (sortType === "oldest") {
        processedPasswords = [...processedPasswords].sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
    }

    if (sortType === "az") {
        processedPasswords = [...processedPasswords].sort((a, b) =>
            a.site.localeCompare(b.site)
        );
    }

    return (
        <AppLayoutWrapper>
            <Navbar />
            <div className='flex-1'>
                <PageWrapper>
                    <div className=' min-h-[calc(100vh-200px)] bg-gray-50 p-6 rounded-2xl'>

                        <div className="flex gap-4 mb-6">

                            {/* Filter */}
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="border rounded-lg px-3 py-2"
                            >
                                <option value="All">All</option>
                                <option value="Social">Social</option>
                                <option value="App">App</option>
                                <option value="Wallet">Wallet</option>
                            </select>

                            {/* Sort */}
                            <select
                                value={sortType}
                                onChange={(e) => setSortType(e.target.value)}
                                className="border rounded-lg px-3 py-2"
                            >
                                <option value="newest">Newest</option>
                                <option value="oldest">Oldest</option>
                                <option value="az">A-Z</option>
                            </select>

                        </div>

                        {/* All Passwords */}
                        <div className=' min-h-[calc(100vh-200px)] bg-white p-6 rounded-2xl shadow-md'>
                            <h2 className='text-3xl font-bold py-4'>Passwords</h2>

                            {/* All Passwords */}
                            <DisplayPasswords vaults={processedPasswords} />
                        </div>

                        {/* button */}
                        <button
                            onClick={() => { navigate('/passwords-add') }}
                            className="flex fixed bottom-14 right-36 z-50 items-center justify-center w-12 h-12 rounded-full bg-[#9046CF] text-white shadow-md hover:bg-[#7e3bb3] transition">
                            <Plus size={22} />
                        </button>
                    </div>
                </PageWrapper>
            </div >
            <Footer />
        </AppLayoutWrapper >
    )
}

export default Passwords
