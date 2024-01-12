import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import ReactPlayer from "react-player";

const Track = () => {
    const [loading, setLoading] = useState(true);
    const [track, setTrack] = useState(undefined);
    const [playerReady, setPlayerReady] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        async function fetchData () {
            try {
                const { data } = await axios.post(`http://localhost:3030/track/${id}`, {
                    accessToken: localStorage.getItem('access_token')
                });
                console.log(data);
                setTrack(data);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [id]);

    const handlePlayerReady = () => {
        setPlayerReady(true);
    }

    if (loading) {
        return (<div>Loading...</div>);
    } else {
        return (
            <div className="mt-32">
                {track.preview_url &&
                        <ReactPlayer
                            url={track.preview_url}
                            playing={true}
                            loop={true}
                            width="100%"
                            height="50px"
                            onReady={handlePlayerReady}
                        />
                }
            </div>
        );
    }
};

export default Track;