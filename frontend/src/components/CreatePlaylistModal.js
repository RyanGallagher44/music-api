import React, { useState } from "react";

const CreatePlaylistModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddPlaylist = (e) => {
    e.preventDefault();

    setIsModalOpen(!isModalOpen);
    setPlaylistName("");
    console.log(playlistName);
  };

  return (
    <div>
      <button
        data-modal-target="crud-modal"
        data-modal-toggle="crud-modal"
        className={`${
          isModalOpen && "hidden"
        } bg-spotify-green duration-75 hover:scale-105 text-gray-800 py-2 px-4 rounded-full inline-flex items-center text-center`}
        type="button"
        onClick={handleModalToggle}
      >
        <svg
          className="fill-current w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M3 2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm1 3v10h12V5H4zm2 2h8v2H6V7zm0 4h8v2H6v-2z" />
        </svg>
        <span>Create Playlist</span>
      </button>
      <div
        id="crud-modal"
        tabIndex="-1"
        aria-hidden="true"
        className={`${
          isModalOpen ? "fixed" : "hidden"
        } overflow-y-auto overflow-x-hidden top-0 right-0 bottom-0 left-0 flex items-center justify-center w-full h-full md:inset-0`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-spotify-black">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create Playlist
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal"
                onClick={handleModalToggle}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    for="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Playlist Name
                  </label>
                  <input
                    value={playlistName}
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:border-spotify-black"
                    placeholder="Enter playlist name..."
                    required=""
                    onChange={(e) => setPlaylistName(e.target.value)}
                  />
                </div>
              </div>
              <button
                onClick={handleAddPlaylist}
                className="bg-spotify-green duration-75 hover:scale-105 text-gray-800 py-2 px-4 rounded-full inline-flex items-center text-center font-medium"
              >
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Add Playlist
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
