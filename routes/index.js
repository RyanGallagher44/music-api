import authRoutes from "./auth.js";
import artistRoutes from "./artists.js";
import trackRoutes from "./tracks.js";
import albumRoutes from "./albums.js";
import userRoutes from "./users.js";

const constructorMethod = (app) => {
  app.use("/auth", authRoutes);
  app.use("/artist", artistRoutes);
  app.use("/track", trackRoutes);
  app.use("/album", albumRoutes);
  app.use("/user", userRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "This route does not exist" });
  });
};

export default constructorMethod;
