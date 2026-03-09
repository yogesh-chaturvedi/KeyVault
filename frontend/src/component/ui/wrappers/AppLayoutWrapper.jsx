import React from 'react'

const AppLayoutWrapper = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            {children}
        </div>
    )
}

export default AppLayoutWrapper
