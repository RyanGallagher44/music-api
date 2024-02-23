import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";


const Playlist = () => {
    const [tracks, setTracks] = useState(undefined)
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
            setTracks(data)
            setLoading(false)
    }
    fetchData()
}, [])

if (loading) {
    return <Loading />
} else {
    return (
        <div className="mt-36">
            {tracks.map((track) => {
                return (
                    <div>
                    <div>
                    
                    </div>
                   <div>
                {track.artists.map((artist) => {
                    return (
                        <div>
                        {artist.name}: {track.name}
                        </div>
                    )
                })}
                    </div>
                   {track.album.images.map((image) => {
                    return (
                        <div>
                        <img
                          alt={image.name}
                          className="transform transition duration-500 group-hover:scale-105 object-cover rounded-full"
                          src={image.url[0]}
                        />
                        </div>
                    )
                   })}
                    </div>
                )
            })}
        </div>
    )
}
}
export default Playlist
