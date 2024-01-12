import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import PlayTrack from "./PlayTrack";

const Artist = () => {
  const [tracks, setTracks] = useState(undefined);
  const [albums, setAlbums] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [hoveredTrack, setHoveredTrack] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      let { data } = await axios.post(
        `http://localhost:3030/artist/${id}/top-tracks`,
        {
          accessToken: localStorage.getItem("access_token"),
        },
      );
      setTracks(data.tracks);
      console.log(data);
      const moreData = await axios.post(
        `http://localhost:3030/artist/${id}/albums?market=US`,
        {
          accessToken: localStorage.getItem("access_token"),
        },
      );
      setAlbums(moreData.data.items);
      console.log(moreData.data);
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
    return <div className="m-36">loading</div>;
  } else {
    return (
      <div className="m-36">
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
