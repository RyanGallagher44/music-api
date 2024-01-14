import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SearchArtists() {
  const [artist, setArtist] = useState("");
  const [artistData, setArtistData] = useState([]);

  const handleSubmitArtist = async (e) => {
    e.preventDefault();

    if (artist === "") {
      return;
    }

    const { data } = await axios.post("http://localhost:3030/artist/search", {
      searchTerm: artist,
      accessToken: localStorage.getItem("access_token"),
    });
    setArtistData(data.artists.items);
  };

  return (
    <div className="m-36">
      <form>
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            onChange={(e) => setArtist(e.target.value)}
            value={artist}
            type="search"
            id="default-search"
            className="block font-gotham w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Search artists..."
            required
          />
          <button
            type="submit"
            onClick={handleSubmitArtist}
            className="text-spotify-black font-gotham absolute end-2.5 bottom-2.5 dark:bg-spotify-green hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-spotify-green dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
      {artistData.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {artistData.map((artist) => {
            return (
              <Link to={`/artist/${artist.id}`}>
                <div
                  key={artist.id}
                  className="relative group overflow-hidden rounded-full"
                >
                  <div className="col-span-1 justify-center items-center flex">
                    {artist.images.length > 0 && (
                      <img
                        className="transform transition duration-500 group-hover:scale-105 rounded-full"
                        src={artist.images[0].url}
                        alt=""
                      />
                    )}
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 animate-glow">
                    <p className="text-white text-lg font-bold font-gotham">
                      {artist.name}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
