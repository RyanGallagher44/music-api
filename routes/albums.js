import axios from "axios";
import { Router } from "express";

const router = Router();

const mapValueToKey = (value) => {
  return ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][
    value
  ];
};

const millisToMinutesAndSeconds = (millis) => {
  let minutes = Math.floor(millis / 60000);
  let seconds = ((millis % 60000) / 1000).toFixed(0);
  return seconds === 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

const addToFeatureValues = (features, data) => {
  features.acousticness += data.acousticness;
  features.danceability += data.danceability;
  features.duration += data.duration_ms;
  features.energy += data.energy;
  features.instrumentalness += data.instrumentalness;
  features.key += data.key;
  features.liveness += data.liveness;
  features.loudness += data.loudness;
  features.mode += data.mode;
  features.speechiness += data.speechiness;
  features.tempo += data.tempo;
  features.timeSignature += data.time_signature;
  features.valence += data.valence;

  return features;
};

const reformatFeatures = (features, numTracks) => {
  Object.keys(features).forEach((key) => {
    features[key] /= numTracks;
  });
  features.acousticness *= 100;
  features.danceability *= 100;
  features.energy *= 100;
  features.instrumentalness *= 100;
  features.liveness *= 100;
  features.loudness *= 100;
  features.speechiness *= 100;
  features.valence *= 100;
  features.key = mapValueToKey(Math.round(features.key));
  features.duration = millisToMinutesAndSeconds(features.duration);
  features.timeSignature = Math.round(features.timeSignature);
  features.mode = Math.round(features.mode);

  return features;
};

router.post("/:id/audio-analysis", async (req, res) => {
  const id = req.params.id;
  const accessToken = req.body.accessToken;
  const { data } = await axios.get(
    `https://api.spotify.com/v1/albums/${id}/tracks?market=US`,
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    },
  );
  const trackIds = [];
  data.items.forEach((track) => {
    trackIds.push(track.id);
  });
  let features = {
    acousticness: 0,
    danceability: 0,
    duration: 0,
    energy: 0,
    instrumentalness: 0,
    key: 0,
    liveness: 0,
    loudness: 0,
    mode: 0,
    speechiness: 0,
    tempo: 0,
    timeSignature: 0,
    valence: 0,
  };
  for (let i = 0; i < trackIds.length; i++) {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/audio-features/${trackIds[i]}`,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      },
    );
    features = addToFeatureValues(features, data);
  }
  features = reformatFeatures(features, trackIds.length);
  res.json(features);
});

export default router;
