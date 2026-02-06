import { Router } from "express";
import axios from "axios";
import { spotify } from "./helpers.js";

const router = Router();
async function deezerPreviewFor(name, artist) {
  try {
    const q = `track:\"${name}\" artist:\"${artist}\"`;
    const url = `https://api.deezer.com/search?q=${encodeURIComponent(q)}&limit=5`;
    const { data } = await axios.get(url);
    if (data && data.data && data.data.length) {
      const item = data.data.find((d) => d.preview);
      if (item) return item.preview;
    }
  } catch (e) {}
  return null;
}
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

  // attach embed_url fallback for items with null preview_url
  await Promise.all(
    (data.tracks.items || []).map(async (item) => {
      if (!item.preview_url) {
        // try Deezer preview first
        const artist = item.artists && item.artists[0] ? item.artists[0].name : "";
        const deezerPreview = await deezerPreviewFor(item.name, artist);
        if (deezerPreview) {
          item.preview_url = deezerPreview;
          return;
        }

        try {
          const oe = await axios.get(
            `https://open.spotify.com/oembed?url=https://open.spotify.com/track/${item.id}`,
          );
          const m = /src=\"([^\"]+)\"/.exec(oe.data.html || "");
          item.embed_url = (m && m[1]) || `https://open.spotify.com/embed/track/${item.id}`;
        } catch (e) {
          item.embed_url = `https://open.spotify.com/embed/track/${item.id}`;
        }
      }
    }),
  );

  return res.json(data);
});

router.post("/search", async (req, res) => {
  const { accessToken } = req.body;
  const limit = 50;
  // Spotify search supports offsets up to 1000 — ensure offset + limit <= 1000
  const maxOffset = Math.max(0, 1000 - limit);
  let random = Math.floor(Math.random() * (maxOffset + 1));
  const data = await spotify(
    `/search?q=${getRandomSearch()}&type=track&offset=${random}&limit=${limit}&market=US`,
    accessToken,
  );

  const sortedData = sortTracksByPopularity(data);

  let chosen = sortedData[0];

  // If preview_url is null, try to find a playable preview via a targeted search
    if (!chosen.preview_url) {
    try {
      const name = encodeURIComponent(chosen.name);
      const artist = chosen.artists && chosen.artists[0] ? chosen.artists[0].name : "";

      // First try: track name + artist via Spotify
      let fallback = await spotify(
        `/search?q=track:${name}%20artist:${encodeURIComponent(artist)}&type=track&limit=1&market=US`,
        accessToken,
      );

      if (fallback && fallback.tracks && fallback.tracks.items && fallback.tracks.items[0] && fallback.tracks.items[0].preview_url) {
        chosen = fallback.tracks.items[0];
      } else {
        // Second try: search by track name only on Spotify
        fallback = await spotify(
          `/search?q=${name}&type=track&limit=5&market=US`,
          accessToken,
        );

        if (fallback && fallback.tracks && fallback.tracks.items) {
          const withPreview = fallback.tracks.items.find((t) => t.preview_url);
          if (withPreview) chosen = withPreview;
        }
      }

      // Third: try Deezer for a preview mp3
      if (!chosen.preview_url) {
        const deezerPreview = await deezerPreviewFor(chosen.name, artist);
        if (deezerPreview) chosen.preview_url = deezerPreview;
      }
      } catch (e) {
      // ignore fallback errors and return original chosen
    }
  }

  // if chosen still lacks preview_url, attach embed_url via oEmbed
  if (!chosen.preview_url) {
    try {
      const oe = await axios.get(
        `https://open.spotify.com/oembed?url=https://open.spotify.com/track/${chosen.id}`,
      );
      const m = /src=\"([^\"]+)\"/.exec(oe.data.html || "");
      chosen.embed_url = (m && m[1]) || `https://open.spotify.com/embed/track/${chosen.id}`;
    } catch (e) {
      chosen.embed_url = `https://open.spotify.com/embed/track/${chosen.id}`;
    }
  }

  res.json({ tracks: { items: [chosen] } });
});

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { accessToken } = req.body;
  const data = await spotify(`/tracks/${id}`, accessToken);
  // if preview_url is null, attach embed_url via oEmbed as a fallback
  if (!data.preview_url) {
    // try Deezer first
    const artist = data.artists && data.artists[0] ? data.artists[0].name : "";
    const deezerPreview = await deezerPreviewFor(data.name, artist);
    if (deezerPreview) {
      data.preview_url = deezerPreview;
    } else {
      try {
        const oe = await axios.get(
          `https://open.spotify.com/oembed?url=https://open.spotify.com/track/${id}`,
        );
        const m = /src=\"([^\"]+)\"/.exec(oe.data.html || "");
        data.embed_url = (m && m[1]) || `https://open.spotify.com/embed/track/${id}`;
      } catch (e) {
        data.embed_url = `https://open.spotify.com/embed/track/${id}`;
      }
    }
  }

  res.json(data);
});

export default router;
