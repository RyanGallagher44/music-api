import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const Playlists = () => {
  const [playlists, setPlaylists] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.post(
        `http://localhost:3030/user/playlists`,
        {
          id: JSON.parse(localStorage.getItem("spotify-profile")).id,
        },
      );
      console.log(data);
      setPlaylists(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="mt-36">
        {playlists.map((playlist) => {
          return (
            <div>
              <Link to={`/playlist/${playlist.name}`}>{playlist.name}</Link>
            </div>
          );
        })}
      </div>
    );
  }
};
export default Playlists;
