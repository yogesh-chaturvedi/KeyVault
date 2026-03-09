import React from "react";

const CategorySelect = ({ label, error, register }) => {
    const categories = [
        'Social',
        'App',
        'Wallet'
    ];

    return (
        <div className="mb-5">
            <label className="block text-sm font-medium mb-2 ">
                {label}
            </label>

            <select
                {...register}
                className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black ${error ? "border-red-500 focus:ring-red-500" : ""
                    }`}
            >
                <option value="">Select Category</option>

                {categories.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>

            {error && (
                <p className="text-xs text-red-500 mt-1">
                    {error.message}
                </p>
            )}
        </div>
    );
};

export default CategorySelect;