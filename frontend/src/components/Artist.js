import React from 'react';
import { useParams } from 'react-router-dom';
import {useEffect} from 'react'
import {useState} from "react"
import axios from "axios"

const Artist = () => {
    const [artist, setArtist] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const { id } = useParams();
    useEffect(() => {
        async function fetchData() {
          let {data} = await axios.post(`http://localhost:3030/artist/${id}`, {
                accessToken:localStorage.getItem("access_token")
                
            })
            setArtist(data)
            console.log(data)
            setLoading(false)
        }
        fetchData()
    },[id])
    if (loading) {
        return (
            <div className="m-36">
                loading
            </div>
        );
    } else {
        return (
        <div className="m-36">
        {id}
    </div>
); 
    }
    

};

export default Artist;