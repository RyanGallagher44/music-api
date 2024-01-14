import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import PlayTrack from "./PlayTrack";
import numeral from "numeral";

const Artist = () => {
  const [artist, setArtist] = useState(undefined);
  const [tracks, setTracks] = useState(undefined);
  const [albums, setAlbums] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [hoveredTrack, setHoveredTrack] = useState(undefined);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.post(
        `http://localhost:3030/artist/${id}/top-tracks`,
        {
          accessToken: localStorage.getItem("access_token"),
        },
      );
      setTracks(data.tracks);
      const albumData = await axios.post(
        `http://localhost:3030/artist/${id}/albums?market=US`,
        {
          accessToken: localStorage.getItem("access_token"),
        },
      );
      setAlbums(albumData.data.items);
      const artistData = await axios.post(
        `http://localhost:3030/artist/${id}`,
        {
          accessToken: localStorage.getItem("access_token"),
        },
      );
      setArtist(artistData.data);
      console.log(artistData.data);
      setLoading(false);
    }

    fetchData();
  }, [id]);

  const handleTrackHover = (id) => {
    setHoveredTrack(id);
  };

  const handleTrackLeave = () => {
    setHoveredTrack(null);
  };

  if (loading) {
    return (
      <div className="mt-72" role="status">
        <svg
          aria-hidden="true"
          className="inline w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-spotify-green"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col left-0">
        <div className="relative">
          <div className="absolute left-0 mr-4">
            <img
              src={artist.images[0].url}
              width="650px"
              height="650px"
              className="rounded-r-full shadow-2xl"
              alt={artist.name}
            />
          </div>
          <div className="w-[calc(100%-300px)] h-[700px] bg-spotify-green rounded-bl-full ml-auto text-white mt-4 flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold mb-2">{artist.name}</h2>
            <p>{numeral(artist.followers.total).format("0.0a")} followers</p>
            <div className="flex flex-col gap-2 mt-4">
              {artist.genres.map((genre) => {
                return (
                  <span className="bg-spotify-black text-white px-3 py-1 rounded-full">
                    {genre}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
        <div className="m-16">
          <h2 className="text-gray-900 font-bold text-left mb-4 text-2xl">
            Top Tracks
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tracks.map((track) => {
              return (
                <div
                  key={track.id}
                  className="relative group overflow-hidden rounded-full"
                >
                  <div>
                    <img
                      alt={track.name}
                      className="transform transition duration-500 group-hover:scale-105 object-cover rounded-full"
                      src={track.album.images[0].url}
                    />
                  </div>
                  <div
                    onMouseOver={() => handleTrackHover(track.id)}
                    onMouseLeave={handleTrackLeave}
                    className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 animate-glow"
                  >
                    <p className="text-white text-lg font-bold">{track.name}</p>
                    <p className="text-white text-sm">
                      {track.album.release_date.split("-")[0]}
                    </p>
                  </div>
                  {hoveredTrack === track.id && <PlayTrack id={track.id} />}
                </div>
              );
            })}
          </div>
        </div>
        {/*    {albums.map((album) => {*/}
        {/*        return (*/}
        {/*        <div>*/}
        {/*        <div className="img">*/}
        {/*            <img className="rounded-full" src={album.images[0].url} />*/}
        {/*        </div>*/}
        {/*        {album.name}*/}
        {/*        <div>*/}
        {/*       {album.release_date.split("-")[0]}*/}
        {/*       </div>*/}
        {/*       </div>*/}
        {/*        )*/}
        {/*    })}*/}
      </div>
    );
  }
};

export default Artist;
