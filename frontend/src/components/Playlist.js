import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

const Playlist = () => {
  const [tracks, setTracks] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const { name } = useParams();
  const millisToMinutesAndSeconds = (millis) => {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return seconds === 60
      ? minutes + 1 + ":00"
      : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.post(
        `http://localhost:3030/user/playlist/tracks/${name}`,
        {
          userId: JSON.parse(localStorage.getItem("spotify-profile")).id,
          accessToken: localStorage.getItem("access_token"),
        }
      );
      console.log(data);
      setTracks(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="mt-36">
        {tracks.map((track) => {
          return (
            <div>
              <div></div>
              <div>
                {track.artists.map((artist) => {
                  return (
                    <div>
                      {track.name}: {artist.name}{" "}
                      {millisToMinutesAndSeconds(track.duration_ms)}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};
export default Playlist;
