import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";


const Playlists = () => {
    const [playlists, setPlaylists] = useState(undefined)
    const [loading, setLoading] = useState(true)
    
useEffect(() => {
    async function fetchData () {
        const { data } = await axios.post(
            `http://localhost:3030/user/playlists`, {
                id: JSON.parse(localStorage.getItem("spotify-profile")).id,
            }
            )
            console.log(data)
            setPlaylists(data)
            setLoading(false)
    }
    fetchData()
}, [])

if (loading) {
    return <Loading />
} else {
    return (
        <div className="mt-36">
        {playlists.map((playlist) => {
            return (
                <div>
                    {playlist.name}
                </div>
            )
        })}
        </div>
    )
}
}
export default Playlists
