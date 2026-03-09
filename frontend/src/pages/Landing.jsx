import React, { useContext } from 'react'
import Navbar from '../component/layouts/Navbar'
import PageWrapper from '../component/ui/wrappers/PageWrapper'
import CategoryCard from '../component/ui/cards/CategoryCard'
import { Smartphone, Users, Wallet } from 'lucide-react'
import AppLayoutWrapper from '../component/ui/wrappers/AppLayoutWrapper'
import PasswordCard from '../component/ui/cards/PasswordCard'
import Footer from '../component/layouts/Footer'
import { PasswordContext } from '../context/PasswordContext'
import helpers from '../utils/helpers'
import DisplayPasswords from '../component/layouts/DisplayPasswords'


const Landing = () => {

    const { useFilterPasswords } = helpers;
    const { socialVault, appVault, walletVault } = useFilterPasswords();

    const { passwords, results } = useContext(PasswordContext)

    const displayPasswords = results.length > 0 ? results : passwords;

    const recentlyAdded = displayPasswords?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6)

    return (
        <AppLayoutWrapper>

            <Navbar />
            <div className='flex-1'>

                {/* password Caterories */}
                <div className="w-full bg-[#9046CF]/10 rounded-b-lg pb-6">
                    <PageWrapper>
                        <h1 className='text-3xl font-bold py-6'>Passwords Category</h1>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <CategoryCard icon={Users} title="Social" count={socialVault?.length || 0} />
                            <CategoryCard icon={Smartphone} title="Apps" count={appVault?.length || 0} />
                            <CategoryCard icon={Wallet} title="Wallets" count={walletVault?.length || 0} />
                        </div>
                    </PageWrapper>
                </div>

                {/* all passwords */}
                <div className="w-full bg-white">
                    <PageWrapper>
                        <h2 className="font-bold text-3xl py-6">My Passwords</h2>

                        {/* Top 6 Recent Passwords */}
                        <DisplayPasswords vaults={recentlyAdded} />

                    </PageWrapper>
                </div>
            </div>
            <Footer />
        </AppLayoutWrapper>
    )
}

export default Landing 
