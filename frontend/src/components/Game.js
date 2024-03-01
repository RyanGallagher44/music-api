import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import ReactPlayer from "react-player";

const Game = () => {
    const [track, setTrack] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [playerReady, setPlayerReady] = useState(false);


useEffect(() => {
    async function fetchData() {
        const { data } = await axios.post("http://localhost:3030/track/search", {
            accessToken: localStorage.getItem("access_token")
        })
        console.log(data)
        setTrack(data)
        setLoading(false)
    }
    fetchData()
}, [])

const handlePlayerReady = () => {
    setPlayerReady(true);
  };

if (loading) {
    return <Loading />
} else {
    return (
        <div className="mt-32">
            <div>
            {track.tracks.items[0].preview_url  && (
          <ReactPlayer
            url={track.tracks.items[0].preview_url}
            playing={true}
            loop={true}
            width="0px"
            height="0px"
            onReady={handlePlayerReady}
          />
        )}
            </div>
            <div>
            {track.tracks.items[0].artists[0].name}
            </div>

            <div>
               {track.tracks.items[0].name}
            </div>

        </div>
    )
}
}

export default Game
