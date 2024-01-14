import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

const Album = () => {
  const [loading, setLoading] = useState(true);
  const [audioAnalysis, setAudioAnalysis] = useState(undefined);
  const { id } = useParams();

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
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="m-36">
        <ul className="font-gotham text-left">
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
      </div>
    );
  }
};

export default Album;
