import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Loading from "./Loading";
import ReactPlayer from "react-player";

const Game = () => {
  const [track, setTrack] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [playerReady, setPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [seconds, setSeconds] = useState(1);
  const [userInput, setUserinput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const playerRef = useRef();

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.post("http://localhost:3030/track/search", {
        accessToken: localStorage.getItem("access_token"),
      });
      console.log(data);
      setTrack(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handlePlayerReady = () => {
    setPlayerReady(true);
  };

  const handleProgress = (progress) => {
    if (progress.playedSeconds > seconds) {
      setIsPlaying(false);
      playerRef.current.seekTo(0);
    }
  };

  const handleAddTime = () => {
    setSeconds(seconds + 1)
  }

  const handleChange = (e) => {
    setUserinput(e.target.value)
  };

 const handleGuess = (e) => {
    e.preventDefault();
    console.log(userInput)
    console.log(track.tracks.items[0].name)
    if (userInput === track.tracks.items[0].name){
     setIsCorrect(true)
    }
   
  };

  if (loading) {
    return <Loading />;
  } else {
    return (

      <div className="mt-32 text-center">
        {/* <div>{track.tracks.items[0].name}</div>
        <div>{track.tracks.items[0].artists[0].name}</div> */}
        <div className="text-center">
          {track.tracks.items[0].preview_url && (
            <ReactPlayer
              ref={playerRef}
              controls={true}
              playing={isPlaying}
              url={track.tracks.items[0].preview_url}
              onReady={handlePlayerReady}
              onProgress={handleProgress}
            />
          )}

        <form onSubmit={handleGuess}>
            
          <input type="search" onChange={handleChange}/>

          <button type="submit">

            Guess
          </button>
            {isCorrect && 
            <div>
            Correct
            </div>
            }

            </form>
        
        <button type="" onClick={handleAddTime}>
            Add Time
        </button>
           </div>
        </div>


    
      
    );
  }
};

export default Game;
