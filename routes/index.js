import authRoutes from "./auth.js";
import artistRoutes from "./artists.js";
import trackRoutes from "./tracks.js";
import albumRoutes from "./albums.js";

const constructorMethod = (app) => {
  app.use("/auth", authRoutes);
  app.use("/artist", artistRoutes);
  app.use("/track", trackRoutes);
  app.use("/album", albumRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "This route does not exist" });
  });
};

export default constructorMethod;
