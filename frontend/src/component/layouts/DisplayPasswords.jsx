import React, { useContext } from 'react'
import PasswordCard from '../ui/cards/PasswordCard'
import helpers from '../../utils/helpers'
import { useNavigate } from 'react-router-dom';
import { PasswordContext } from '../../context/PasswordContext';


const DisplayPasswords = ({ vaults }) => {
    const { getSiteName } = helpers;
    const { loading } = useContext(PasswordContext)
    const navigate = useNavigate();

    return (

        <div className='relative'>

            {loading && (
                <div className="absolute inset-0 bg-white/60 flex justify-center items-center z-10">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-600 border-t-transparent"></div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {vaults?.length !== 0 ? vaults?.map((item) => {
                    return (<PasswordCard key={item._id} onClick={() => { navigate(`/viewPassword/${item._id}`) }} image={`https://www.google.com/s2/favicons?sz=128&domain_url=https://${getSiteName(item.site)}.com`} siteName={item.site} userName={item.userName} />)
                }) : (<div className="flex flex-col items-center justify-center py-3 text-center">
                    <h2 className="text-2xl font-bold text-gray-700">No Passwords Yet</h2>
                    <p className="text-gray-400 mt-2 text-sm">Looks empty here. Add your first password to keep it safe.</p>
                </div>)}

            </div>
        </div>
    )
}

export default DisplayPasswords
