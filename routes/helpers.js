import axios from "axios";

const spotify = async (endpoint, accessToken) => {
  const { data } = await axios.get(`https://api.spotify.com/v1${endpoint}`, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
  return data;
};

const mapValueToKey = (value) => {
  return ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][
    value
  ];
};

const millisToMinutesAndSeconds = (millis) => {
  let minutes = Math.floor(millis / 60000);
  let seconds = ((millis % 60000) / 1000).toFixed(0);
  return seconds == 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

export { spotify };
