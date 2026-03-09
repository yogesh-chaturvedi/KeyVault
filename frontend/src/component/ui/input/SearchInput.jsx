import React from 'react'

const SearchInput = ({ type, placeholder, icon: Icon, value, onchange }) => {
    return (

        <div className="relative w-full max-w-md">
            <input
                onChange={onchange}
                value={value}
                type={type}
                placeholder={placeholder}
                className="w-full py-3 pl-4 pr-10 rounded-md outline-none text-sm"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                <Icon size={20} />
            </button>
        </div>

    )
}

export default SearchInput
