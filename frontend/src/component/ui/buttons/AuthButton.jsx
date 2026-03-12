import React from 'react'

const AuthButton = ({ type, text }) => {
    return (
        <button
            type={type}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
            {text}
        </button>
    )
}

export default AuthButton
