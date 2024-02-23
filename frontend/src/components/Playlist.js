import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";


const Playlist = () => {
    const [track, setTrack] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const { name } = useParams();

useEffect(() => {
    async function fetchData () {
        const { data } = await axios.post(
            `http://localhost:3030/user/playlist/tracks/${name}`, 
            {
                userId: JSON.parse(localStorage.getItem("spotify-profile")).id,
                accessToken: localStorage.getItem("access_token")
            },
            )
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
        <div className="mt-36">
            
        </div>
    )
}
}
export default Playlist
