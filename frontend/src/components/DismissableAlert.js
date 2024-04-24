import React, { useState } from "react";

const DismissibleAlert = ({ message, onClose, isCorrect }) => {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <>
      {showAlert && isCorrect && (
        <div className="bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md mb-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-lg">
              <button
                onClick={onClose}
                className="text-green-500 hover:text-green-700 focus:outline-none"
              >
                <svg
                  className="fill-current h-6 w-6 mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.414 10l4.293-4.293a1 1 0 1 0-1.414-1.414L10 8.586l-4.293-4.293a1 1 0 1 0-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 1 0 1.414 1.414L10 11.414l4.293 4.293a1 1 0 1 0 1.414-1.414L11.414 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div>
              <p className="text-sm">{message}</p>
            </div>
          </div>
        </div>
      )}

      {showAlert && !isCorrect && (
        <div className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md mb-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-lg">
              <button
                onClick={onClose}
                className="text-red-500 hover:text-red-700 focus:outline-none"
              >
                <svg
                  className="fill-current h-6 w-6 mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.414 10l4.293-4.293a1 1 0 1 0-1.414-1.414L10 8.586l-4.293-4.293a1 1 0 1 0-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 1 0 1.414 1.414L10 11.414l4.293 4.293a1 1 0 1 0 1.414-1.414L11.414 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div>
              <p className="text-sm">{message}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DismissibleAlert;
