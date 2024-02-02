import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import PlayTrack from "./PlayTrack";
import numeral from "numeral";
import Loading from "./Loading";

const Artist = () => {
  const [artist, setArtist] = useState(undefined);
  const [tracks, setTracks] = useState(undefined);
  const [albums, setAlbums] = useState(undefined);
  const [user, setUser] = useState(undefined);
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

  async function fetchUser() {
    const { data } = await axios.get(
      `http://localhost:3030/user/${JSON.parse(localStorage.getItem("spotify-profile")).id}`,
    );
    setUser(data);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const handleTrackHover = (id) => {
    setHoveredTrack(id);
  };

  const handleTrackLeave = () => {
    setHoveredTrack(null);
  };

  const handleLike = async (artistId) => {
    await axios.post(`http://localhost:3030/user/artist/like`, {
      userId: JSON.parse(localStorage.getItem("spotify-profile")).id,
      artistId: artistId,
    });
    fetchUser();
  };

  const handleUnlike = async (artistId) => {
    await axios.post(`http://localhost:3030/user/artist/unlike`, {
      userId: JSON.parse(localStorage.getItem("spotify-profile")).id,
      artistId: artistId,
    });
    fetchUser();
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="flex flex-col left-0">
        <div className="md:relative">
          <div className="md:absolute left-0 md:mr-4">
            <img
              src={artist.images[0].url}
              className="md:rounded-r-full shadow-2xl w-full h-full md:object-cover"
              alt={artist.name}
            />
          </div>
          <div className="md:w-[calc(100%-300px)] md:h-[700px] p-4 bg-spotify-green md:rounded-bl-full ml-auto text-white md:mt-4 flex flex-col justify-center items-end">
            <h2 className="text-2xl font-bold mb-2 font-gotham mr-12">
              {artist.name}
            </h2>
            <div className="flex">
              {!user.artists.includes(artist.id) && (
                <button
                  id="like"
                  type="button"
                  onClick={() => handleLike(artist.id)}
                  className="h-10 w-10 transform mr-2 rounded-full border-2 border-green-500 bg-white text-xl text-green-500 duration-500 hover:bg-white hover:scale-125"
                >
                  <i className="fas fa-heart"></i>
                </button>
              )}
              {user.artists.includes(artist.id) && (
                <button
                  id="unlike"
                  type="button"
                  onClick={() => handleUnlike(artist.id)}
                  className="h-10 w-10 transform mr-2 rounded-full border-2 border-green-500 bg-white text-xl text-red-500 duration-500 hover:bg-white hover:scale-125"
                >
                  <i className="fas fa-heart"></i>
                </button>
              )}
              <p className="font-gotham mr-12 m-auto">
                {numeral(artist.followers.total)
                  .format("0.0a")
                  .replace("m", "M")
                  .replace("k", "K")
                  .replace("b", "B")}{" "}
                followers
              </p>
            </div>
            <div className="flex flex-col gap-2 mt-4 mr-12">
              {artist.genres.map((genre) => {
                return (
                  <span className="bg-spotify-black text-white px-4 py-2 rounded-full font-gotham">
                    {genre}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="m-16">
            <h2 className="text-gray-900 font-bold text-left mb-4 text-2xl font-gotham">
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
                      <p className="text-white text-sm font-bold font-gotham">
                        {track.name}
                      </p>
                      <p className="text-white text-xs font-gotham">
                        {track.album.release_date.split("-")[0]}
                      </p>
                    </div>
                    {hoveredTrack === track.id && <PlayTrack id={track.id} />}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="m-16">
            <h2 className="text-gray-900 font-bold text-left mb-4 text-2xl font-gotham">
              Discography
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {albums.map((album) => {
                return (
                  <Link to={`/album/${album.id}`}>
                    <div
                      key={album.id}
                      className="relative group overflow-hidden rounded-full"
                    >
                      <div>
                        <img
                          alt={album.name}
                          className="transform transition duration-500 group-hover:scale-105 object-cover rounded-full"
                          src={album.images[0].url}
                        />
                      </div>
                      <div
                        // onMouseOver={() => handleTrackHover(track.id)}
                        // onMouseLeave={handleTrackLeave}
                        className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 animate-glow"
                      >
                        <p className="text-white text-sm font-bold font-gotham">
                          {album.name}
                        </p>
                        <p className="text-white text-xs font-gotham">
                          {album.release_date.split("-")[0]}
                        </p>
                      </div>
                      {/*{hoveredTrack === track.id && <PlayTrack id={track.id}/>}*/}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Artist;
