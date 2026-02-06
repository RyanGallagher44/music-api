import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";

const PlayTrack = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [track, setTrack] = useState(undefined);
  const [playerReady, setPlayerReady] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.post(`http://localhost:3030/track/${id}`, {
          accessToken: localStorage.getItem("access_token"),
        });
        setTrack(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const handlePlayerReady = () => {
    setPlayerReady(true);
  };

  if (loading) {
    return <div></div>;
  }

  return (
    <div>
      {track && track.preview_url && (
        <ReactPlayer
          url={track.preview_url}
          playing={true}
          loop={true}
          width="0px"
          height="0px"
          volume={0.5}
          onReady={handlePlayerReady}
        />
      )}

      {/* skip embed-only tracks: no UI shown when preview is missing */}
    </div>
  );
};

export default PlayTrack;
