import React from 'react';
import { Zoom } from 'react-awesome-reveal';

interface CustomModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
    isOpen,
    onClose,
    children
}) => {
    const handleClose = () => {
        onClose && onClose();
    };

    const overlayStyles = isOpen ? 'fixed inset-0 bg-black/50  z-50' : 'hidden';

    const modalStyles = isOpen
        ? 'fixed inset-0 flex items-center justify-center z-50 '
        : 'hidden';

    return (
        <div className={overlayStyles}>
            <div className={modalStyles}>
                <Zoom>
                    <div className="relative bg-slate-900 bg-opacity-100 rounded-lg shadow-lg p-8 mx-4 md:mx-0">
                        {/* Close button */}

                        <button
                            onClick={handleClose}
                            className="absolute top-0 right-0 btn btn-circle btn-outline btn-info btn-sm"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                        {/* Modal content */}
                        <div className="">{children}</div>
                    </div>
                </Zoom>
            </div>
        </div>
    );
};

export default CustomModal;
