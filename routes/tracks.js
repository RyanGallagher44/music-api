import { Router } from "express";
import { spotify } from "./helpers.js";

const router = Router();
function getRandomSearch() {
  // A list of all characters that can be chosen.
  const characters = "abcdefghijklmnopqrstuvwxyz";

  // Gets a random character from the characters string.
  const randomCharacter = characters.charAt(
    Math.floor(Math.random() * characters.length),
  );
  let randomSearch = "";

  // Places the wildcard character at the beginning, or both beginning and end, randomly.
  switch (Math.round(Math.random())) {
    case 0:
      randomSearch = randomCharacter + "%25";
      break;
    case 1:
      randomSearch = "%25" + randomCharacter + "%25";
      break;
  }

  return randomSearch;
}

function sortTracksByPopularity(data) {
  return data.tracks.items.sort((a, b) => b.popularity - a.popularity);
}

router.post("/search/:term", async (req, res) => {
  const { accessToken } = req.body;
  const { term } = req.params;

  const data = await spotify(
    `/search?q=${term}&type=track&limit=5&market=US`,
    accessToken,
  );

  return res.json(data);
});

router.post("/search", async (req, res) => {
  const { accessToken } = req.body;
  let random = Math.floor(Math.random() * 1001);
  const data = await spotify(
    `/search?q=${getRandomSearch()}&type=track&offset=${random}&limit=50&market=US`,
    accessToken,
  );

  const sortedData = sortTracksByPopularity(data);

  res.json({
    tracks: {
      items: [sortedData[0]],
    },
  });
});

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { accessToken } = req.body;
  const data = await spotify(`/tracks/${id}`, accessToken);
  res.json(data);
});

export default router;
