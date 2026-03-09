import React from "react";

const PasswordCard = ({ image, siteName, userName, onClick }) => {
    return (

        <div
            onClick={onClick}
            className="w-full flex items-center justify-between bg-white border rounded-xl px-4 py-3 hover:shadow-sm transition cursor-pointer">

            {/* Left: Image + Site info */}
            <div className="flex items-center gap-4">
                <img
                    src={image}
                    alt={siteName}
                    className="w-12 h-12 rounded-lg object-cover"
                />

                <div>
                    <h3 className="font-bold text-gray-800">
                        {siteName}
                    </h3>
                    <p className="text-sm text-gray-500">
                        {userName}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PasswordCard
