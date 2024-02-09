import React, { useEffect, useState } from "react";
import axios from "axios"
import Loading from "./Loading"

const CreatePlaylistModal = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playlists, setPlaylists] = useState(undefined)
  const [loading, setLoading] = useState[true]


  
  useEffect(() => {
    async function fetchPlaylists() {
        const { data } = axios.get(`http://localhost:3030/user/playlists`, {
            userId: JSON.parse(localStorage.getItem("spotify-profile")).id,
        })
        setPlaylists(data)
        setLoading(false)
    }
    fetchPlaylists()
  }, [id]);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddToPlaylist = async (playlistName) => {
    await  axios.post(`http://localhost:3030/user/playlist/add`, {
        userId: JSON.parse(localStorage.getItem("spotify-profile")).id,
        playlistName: playlistName,
        trackId: id
      });

    setIsModalOpen(!isModalOpen);
  };
  if (loading) {
    return (
        <Loading/>
    )
  } else {
  return (

    <div>
      <button
        data-modal-target="crud-modal"
        data-modal-toggle="crud-modal"
        className={`${
          isModalOpen && "hidden"
        } h-10 w-10 transform rounded-full text-xl text-gray-500 duration-500 hover:scale-125`}
        type="button"
        onClick={handleModalToggle}
      >
        <i className="fas fa-music"></i>
      </button>
      <div
        id="crud-modal"
        tabIndex="-1"
        aria-hidden="true"
        className={`${
          isModalOpen ? "fixed" : "hidden"
        } overflow-y-auto overflow-x-hidden top-0 right-0 bottom-0 left-0 flex items-center justify-center w-full h-full md:inset-0 z-10`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-spotify-black">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add to Playlist
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
                    Select Playlist
                  </label>
                </div>
              </div>
              {playlists.map((playlist) => {
                  <button
                  onClick={() => handleAddToPlaylist(playlist.name)}
                  className="bg-spotify-green duration-75 hover:scale-105 text-gray-800 py-2 px-4 rounded-full inline-flex items-center text-center font-medium"
                  >
                {playlist.name}
              </button>
            })}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
};
};

export default CreatePlaylistModal;
