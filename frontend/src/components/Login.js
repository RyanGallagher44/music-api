import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [userData, setUserData] = useState(undefined);
    const [userFollowingData, setUserFollowingData] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get('token');
    
    useEffect(() => {
        localStorage.setItem('access_token', searchParams.get('token'));

        const fetchData = async () => {
            try {
                const { data } = await axios.get('https://api.spotify.com/v1/me', {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });
                setUserData(data);

                const data2 = await axios.get('https://api.spotify.com/v1/me/following?type=artist', {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });
                setUserFollowingData(data2.data.artists.items);
                console.log(data2.data.artists.items);
                
                setLoading(false);
            } catch (e) {
                setLoading(false);
            }
        };

        if (token) {
            fetchData();
        }
    }, [token]);

    const handleClick = async () => {
        window.location.href = 'http://localhost:3030/auth/login';
    };

    if (loading) {
        return(
            <div>Loading...</div>
        );
    } else {
        return(
            <div>
                {!token &&
                    <button id="spotify" type="button" onClick={handleClick} class="h-12 w-12 transform m-36 rounded-full border-2 border-green-500 bg-white text-2xl text-green-500 duration-500 hover:-translate-y-3 hover:bg-green-500 hover:text-white">
                        <i class="fab fa-spotify"></i>
                    </button>
                }   
                {!(!userData) &&
                    <div>
                        <h1 class="mt-36">Welcome, {userData.display_name}</h1>
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
                            {userFollowingData.map((artist) => {
                                return(
                                    <div>
                                        <div class="col-span-1 justify-center items-center flex">
                                            <img class="transform transition duration-500 hover:scale-105 w-72 h-72 object-cover rounded-full" src={artist.images[0].url} alt="" />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                }
            </div>
        );
    }
};

export default Login;