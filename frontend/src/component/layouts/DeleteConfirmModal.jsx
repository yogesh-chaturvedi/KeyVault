import { Trash2, X } from "lucide-react";

function DeleteConfirmModal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white w-full max-w-md rounded-2xl shadow-xl p-6 z-10 animate-fadeIn">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <X size={20} />
                </button>

                {/* Icon */}
                <div className="flex items-center justify-center w-14 h-14 mx-auto rounded-full bg-red-100">
                    <Trash2 className="text-red-600" size={24} />
                </div>

                {/* Content */}
                <div className="text-center mt-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Delete Password?
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Are you sure you want to delete <span className="font-medium">Vault</span>?
                        This action cannot be undone.
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="flex-1 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteConfirmModal;