import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";

const Game = () => {
    const [track, setTrack] = useState(undefined)
    const [loading, setLoading] = useState(true)


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

if (loading) {
    return <Loading />
} else {
    return (
        <div className="mt-32">
            <div>
            {track.tracks.items[0].name}
            </div>
            <div>
            {track.tracks.items[0].artists[0].name}
            </div>

        </div>
    )
}
}

export default Game
