import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [userData, setUserData] = useState(undefined);
  const [userFollowingData, setUserFollowingData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const token =
    searchParams.get("token") || localStorage.getItem("access_token"); // Get token from URL or local storage

  useEffect(() => {
    if (token) {
      localStorage.setItem("access_token", token);

      const fetchData = async () => {
        try {
          const { data } = await axios.get("https://api.spotify.com/v1/me", {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          localStorage.setItem("spotify-profile", JSON.stringify(data));
          setUserData(data);
          const data2 = await axios.get(
            "https://api.spotify.com/v1/me/following?type=artist",
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            },
          );
          setUserFollowingData(data2.data.artists.items);
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [token]);

  const handleClick = async () => {
    window.location.href = "http://localhost:3030/auth/login";
  };

  return (
    <div>
      {!token && (
        <button
          id="spotify"
          type="button"
          onClick={handleClick}
          className="h-12 w-12 transform m-36 rounded-full border-2 border-green-500 bg-white text-2xl text-green-500 duration-500 hover:-translate-y-3 hover:bg-green-500 hover:text-white"
        >
          <i className="fab fa-spotify"></i>
        </button>
      )}
      {token && !loading && (
        <div>
          <h1 className="mt-36 font-gotham">
            Welcome, {userData.display_name}
          </h1>
          {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
                  {userFollowingData.map((artist) => (
                      <div key={artist.id}>
                          <div className="col-span-1 justify-center items-center flex">
                              <img
                                  className="transform transition duration-500 hover:scale-105 w-72 h-72 object-cover rounded-full"
                                  src={artist.images[0].url}
                                  alt=""
                              />
                          </div>
                      </div>
                  ))}
              </div> */}
        </div>
      )}
    </div>
  );
};

export default Login;
