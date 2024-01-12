import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {useEffect} from 'react'
import {useState} from "react"
import axios from "axios"
import Track from "./Track";

const Artist = () => {
    const [tracks, setTracks] = useState(undefined)
    const [albums, setAlbums] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [hoveredTrack, setHoveredTrack] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
          let {data} = await axios.post(`http://localhost:3030/artist/${id}/top-tracks`, {
                accessToken:localStorage.getItem("access_token")
    
            })
            setTracks(data.tracks)
            console.log(data)
          const moreData = await axios.post(`http://localhost:3030/artist/${id}/albums?market=US`, {
                accessToken:localStorage.getItem("access_token")
            })
            setAlbums(moreData.data.items)
            console.log(moreData.data)
            setLoading(false)
        }
        fetchData()
    },[id])

    const handleTrackHover = (id) => {
        setHoveredTrack(id);
    };

    const handleTrackLeave = () => {
        setHoveredTrack(null);
    };

    if (loading) {
        return (
            <div className="m-36">
                loading
            </div>
        );
    } else {
        return (
        
        <div className="m-36">
        {/* {id} */}
        <h1>Top Tracks</h1>
            {tracks.map((track) => {
                return (
                    <div key={track.id}>
                        <div className="img">
                          <img onMouseOver={() => handleTrackHover(track.id)} onMouseLeave={handleTrackLeave} className="transform transition duration-500 hover:scale-105 object-cover rounded-full" src={track.album.images[0].url} />
                        </div>
                           {track.name}
                        <div>
                          {track.album.release_date.split("-")[0]}
                        </div>
                        {hoveredTrack === track.id && <Track id={track.id} />}
                    </div>
                );
            })}
            {albums.map((album) => {
                return (
                <div>
                <div className="img">
                    <img className="rounded-full" src={album.images[0].url} />
                </div>
                {album.name}
                <div>
               {album.release_date.split("-")[0]}
               </div>
               </div>
                )
            })}

    </div>


    
        
    
); 
    }
    

};

export default Artist;