import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import PlayTrack from "./PlayTrack";

const Album = () => {
  const [loading, setLoading] = useState(true);
  const [audioAnalysis, setAudioAnalysis] = useState(undefined);
  const { id } = useParams();
  const [albumTracks, setalbumTracks] = useState(undefined);
  const [hoveredTrack, setHoveredTrack] = useState(undefined);
  const millisToMinutesAndSeconds = (millis) => {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return seconds === 60
      ? minutes + 1 + ":00"
      : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.post(
          `http://localhost:3030/album/${id}/audio-analysis`,
          {
            accessToken: localStorage.getItem("access_token"),
          },
        );
        setAudioAnalysis(data);
        const moreData = await axios.post(`http://localhost:3030/album/${id}`, {
          accessToken: localStorage.getItem("access_token"),
        });
        console.log(moreData.data);
        setalbumTracks(moreData.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);
  const handleTrackHover = (id) => {
    setHoveredTrack(id);
  };

  const handleTrackLeave = () => {
    setHoveredTrack(null);
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="m-36">
        <ul className="font-gotham text-left mb-12">
          <li>Average Track Duration: {audioAnalysis.duration}</li>
          <li>Average Key: {audioAnalysis.key}</li>
          <li>Average Tempo: {Math.round(audioAnalysis.tempo)} BPM</li>
          <li>Average Mode: {audioAnalysis.mode === 1 ? "Major" : "Minor"}</li>
          <li>Average Time Signature: {audioAnalysis.timeSignature}/4</li>
          <li>Acousticness Level: {audioAnalysis.acousticness.toFixed(1)}%</li>
          <li>Danceability Level: {audioAnalysis.danceability.toFixed(1)}%</li>
          <li>Energy Level: {audioAnalysis.energy.toFixed(1)}%</li>
          <li>Loudness Level: {audioAnalysis.loudness.toFixed(1)} dB</li>
          <li>
            Instrumentalness Level: {audioAnalysis.instrumentalness.toFixed(1)}%
          </li>
          <li>Liveness Level: {audioAnalysis.liveness.toFixed(1)}%</li>
          <li>Speechiness Level: {audioAnalysis.speechiness.toFixed(1)}%</li>
          <li>Valence Level: {audioAnalysis.valence.toFixed(1)}%</li>
        </ul>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {albumTracks.items.map((track) => {
            return (
              <div
                className="flex items-center space-x-4 rtl:space-x-reverse hover:bg-spotify-green p-4 rounded-2xl font-gotham text-gray-900 dark:text-gray-900"
                onMouseOver={() => handleTrackHover(track.id)}
                onMouseLeave={handleTrackLeave}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-left">{track.name}</p>
                  <p className="text-sm text-left">
                    {millisToMinutesAndSeconds(track.duration_ms)}
                  </p>
                </div>
                <div className="items-center">{track.track_number}</div>
                {hoveredTrack === track.id && <PlayTrack id={track.id} />}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default Album;
