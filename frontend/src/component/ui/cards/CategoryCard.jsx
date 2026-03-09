import React from "react";

const CategoryCard = ({ icon: Icon, title, count }) => {
    return (
        <div className="w-full max-w-sm bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">

            {/* Icon + Title */}
            <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-[#9046CF]/10">
                    <Icon size={24} className="text-[#9046CF]" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">
                    {title}
                </h3>
            </div>

            {/* Password count */}
            <p className="text-sm text-gray-600">
                {count} passwords
            </p>
        </div>
    );
};

export default CategoryCard;

