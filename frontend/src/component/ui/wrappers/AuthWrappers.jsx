import React from 'react'

const AuthWrappers = ({ children }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
            {children}
        </div>
    )
}

export default AuthWrappers