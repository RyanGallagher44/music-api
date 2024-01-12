import axios from "axios"
import {useState, useEffect} from "react"
import { Link } from "react-router-dom"

export default function Artists() {
    const [artist, setArtist] = useState("")
    const [artistData, setArtistData] = useState([])

    const handleSubmitArtist = async (e) => {
        e.preventDefault();

        if (artist === "") {
            return;   
        }

        const {data} = await axios.post("http://localhost:3030/artist/search", {
            searchTerm: artist,
            accessToken:localStorage.getItem("access_token")
        })
        setArtistData(data.artists.items)
        console.log(data.artists.items)
    }

    return (
        <div className="m-36">
            {/* <button className="text-spotify-black bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-spotify-green hover:text-white" onClick={handleSubmitArtist}>
            search: 
            </button> */}
            {/* <input type="text" className="border" onChange={(e) => setArtist(e.target.value)} value = {artist}/> */}
            <form>   
                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input onChange={(e) => setArtist(e.target.value)} value = {artist} type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search artists..." required />
                    <button type="submit" onClick={handleSubmitArtist} class="text-spotify-black absolute end-2.5 bottom-2.5 dark:bg-spotify-green hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-spotify-green dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>
            {/* <div>
                {artistData.map((artist) => {
                    return (
                        <div>
                            {artist.name}
                        </div>
                    )
                })}
            </div> */}
            {artistData.length > 0 && 
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
                    {artistData.map((artist) => {
                        return(
                            <Link to={`/artist/${artist.id}`}>
                                <div key={artist.id}>
                                    <div className="col-span-1 justify-center items-center flex">
                                        {artist.images.length > 0 &&
                                            <img
                                                className="transform transition duration-500 hover:scale-105 w-72 h-72 object-cover rounded-full"
                                                src={artist.images[0].url}
                                                alt=""
                                            />
                                        }
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            }
        </div>
    )
}