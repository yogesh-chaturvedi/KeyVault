import React from 'react'

const PasswordInput = ({ lable, type, placeholder, error, register }) => {
    return (
        <div className='mb-5'>

            <div>
                <label className="block text-sm font-medium mb-2">
                    {lable}
                </label>
                <input
                    type={type}
                    placeholder={placeholder}
                    {...register}
                    className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
            </div>
            {
                error && (
                    <p className="text-xs text-red-500 mt-1">
                        {error.message}
                    </p>
                )
            }
        </div>
    )
}

export default PasswordInput
