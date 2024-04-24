import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Loading from "./Loading";
import ReactPlayer from "react-player";
import ProgressCircle from "./ProgressCircle";
import DismissibleAlert from "./DismissableAlert";

const Game = () => {
  const [track, setTrack] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [playerReady, setPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [seconds, setSeconds] = useState(1);
  const [userInput, setUserInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [suggestedGuesses, setSuggestedGuesses] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [guessMessage, setGuessMessage] = useState("");
  const playerRef = useRef();

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.post("http://localhost:3030/track/search", {
        accessToken: localStorage.getItem("access_token"),
      });

      if (!data.tracks.items[0].preview_url) window.location.reload();

      setTrack(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handlePlayerReady = () => {
    setPlayerReady(true);
  };

  const handleProgress = (progress) => {
    setTimeElapsed(progress.playedSeconds);
    if (progress.playedSeconds > seconds) {
      setIsPlaying(false);
      playerRef.current.seekTo(0);
    }
  };

  const handleAddTime = () => {
    setSeconds(seconds + 2);
  };

  const handleChange = async (e) => {
    setUserInput(e.target.value);

    const { data } = await axios.post(
      `http://localhost:3030/track/search/${e.target.value}`,
      {
        accessToken: localStorage.getItem("access_token"),
      },
    );

    setSuggestedGuesses(data.tracks.items);
  };

  const handleGuess = (e) => {
    e.preventDefault();

    if (userInput.toLowerCase() === track.tracks.items[0].name.toLowerCase()) {
      setIsCorrect(true);
      setGuessMessage(
        `You got it! It was ${track.tracks.items[0].name} by ${track.tracks.items[0].artists[0].name}!`,
      );
    } else {
      setGuessMessage("You're a dumbass. That's WRONG!");
      handleAddTime();
    }

    setShowAlert(true);
  };

  const handleSkip = () => {
    setIsCorrect(true);
    setGuessMessage(
      `You're a fuckin' idiot! It was ${track.tracks.items[0].name} by ${track.tracks.items[0].artists[0].name}!`,
    );
    setShowAlert(true);
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="m-36 text-center">
        {/*<div>{track.tracks.items[0].name}</div>*/}
        {/*<div>{track.tracks.items[0].artists[0].name}</div>*/}
        {track.tracks.items[0].preview_url && (
          <ReactPlayer
            ref={playerRef}
            controls={true}
            playing={isPlaying}
            url={track.tracks.items[0].preview_url}
            onReady={handlePlayerReady}
            onProgress={handleProgress}
            width="0px"
            height="0px"
          />
        )}

        {showAlert && (
          <DismissibleAlert
            isCorrect={isCorrect}
            message={guessMessage}
            onClose={() => {
              setShowAlert(false);
              if (isCorrect) {
                window.location.reload();
              }
            }}
          />
        )}

        <div className="justify-center text-center">
          <ProgressCircle timeElapsed={timeElapsed} maxSeconds={seconds} />
        </div>

        <div className="flex font-gotham text-center justify-center">
          <button
            data-modal-target="crud-modal"
            data-modal-toggle="crud-modal"
            className="m-12 bg-spotify-green duration-75 hover:scale-105 text-gray-800 py-2 px-4 rounded-full inline-flex items-center text-center"
            type="button"
            onClick={() => setIsPlaying(true)}
          >
            <svg
              height="20px"
              id="Layer_1"
              version="1.1"
              viewBox="0 0 512 512"
              width="20px"
            >
              <path d="M405.2,232.9L126.8,67.2c-3.4-2-6.9-3.2-10.9-3.2c-10.9,0-19.8,9-19.8,20H96v344h0.1c0,11,8.9,20,19.8,20  c4.1,0,7.5-1.4,11.2-3.4l278.1-165.5c6.6-5.5,10.8-13.8,10.8-23.1C416,246.7,411.8,238.5,405.2,232.9z" />
            </svg>
            <span>Play</span>
          </button>
          {seconds + 2 <= 30 && (
            <button
              data-modal-target="crud-modal"
              data-modal-toggle="crud-modal"
              className="m-12 bg-spotify-green duration-75 hover:scale-105 text-gray-800 py-2 px-4 rounded-full inline-flex items-center text-center"
              type="button"
              onClick={handleAddTime}
            >
              <svg
                height="20px"
                id="Layer_1"
                version="1.1"
                viewBox="0 0 50 50"
                width="20px"
              >
                <rect fill="none" height="50" width="50" />
                <line
                  fill="none"
                  stroke="#000000"
                  stroke-miterlimit="10"
                  stroke-width="4"
                  x1="9"
                  x2="41"
                  y1="25"
                  y2="25"
                />
                <line
                  fill="none"
                  stroke="#000000"
                  stroke-miterlimit="10"
                  stroke-width="4"
                  x1="25"
                  x2="25"
                  y1="9"
                  y2="41"
                />
              </svg>
              <span>Add Time ({seconds + 2}s)</span>
            </button>
          )}
          <button
            data-modal-target="crud-modal"
            data-modal-toggle="crud-modal"
            className="m-12 bg-spotify-green duration-75 hover:scale-105 text-gray-800 py-2 px-4 rounded-full inline-flex items-center text-center"
            type="button"
            onClick={handleSkip}
          >
            <svg
              height="20"
              viewBox="0 0 48 48"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 36l17-12-17-12v24zm20-24v24h4V12h-4z" />
              <path d="M0 0h48v48H0z" fill="none" />
            </svg>
            <span>Skip</span>
          </button>
        </div>

        <form onSubmit={handleGuess}>
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Guess
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              onChange={handleChange}
              value={userInput}
              type="search"
              id="default-search"
              className="block font-gotham w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter track..."
              required
            />
            {suggestedGuesses.length > 0 && (
              <ul className="absolute left-0 z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-600">
                {suggestedGuesses.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 cursor-pointer font-gotham dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setUserInput(suggestion.name)}
                  >
                    {suggestion.name}
                  </li>
                ))}
              </ul>
            )}
            <button
              type="submit"
              className="text-spotify-black font-gotham absolute end-2.5 bottom-2.5 dark:bg-spotify-green hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-spotify-green dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Guess
            </button>
          </div>
        </form>
      </div>
    );
  }
};

export default Game;
