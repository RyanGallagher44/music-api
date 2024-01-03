import axios from "axios"
import {useState} from "react"



export default function Artists() {
    const [artist, setArtist] = useState("")
    const [artistData, setArtistData] = useState([])

    const handleSubmitArtist = async () => {
        const {data} = await axios.post("http://localhost:3030/artist/search", {
            searchTerm: artist,
            accessToken:localStorage.getItem("access_token")
        })
        setArtistData(data.artists.items)
        console.log(data.artists.items)
    }

    



    return (
        <div className="m-36">
            <button className="text-spotify-black bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-spotify-green hover:text-white" onClick={handleSubmitArtist}>
            search: 
            </button>
            <input type="text" className="border" onChange={(e) => setArtist(e.target.value)} value = {artist}/>
            {artistData.length > 0 && 
            <div>
                {artistData.map((artist) => {
                    return (
                        <div>
                            {artist.name}
                            {artist.genres}
                        </div>
                    )
                })}
            </div>
            }
        </div>
    )
}