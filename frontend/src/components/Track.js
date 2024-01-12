import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

const Track = () => {
    const [loading, setLoading] = useState(true);
    const [track, setTrack] = useState(undefined);
    const { id } = useParams();

    useEffect(() => {
        async function fetchData () {
            try {
                const { data } = await axios.get(`http://localhost:3030/track/${id}`, {
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

    if (loading) {
        return (<div>Loading...</div>);
    } else {
        return (
            <div>Loaded</div>
        );
    }
};

export default Track;