import React from 'react'

const Button = ({ type, text, onEdit }) => {
    return (
        <button
            type={type}
            onClick={onEdit}
            className="px-5 py-2 bg-[#9046CF] text-white rounded-lg hover:bg-[#7e3bb3] transition font-medium">{text}</button>
    )
}

export default Button
