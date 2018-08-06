const { router, get, post } = require("microrouter");
const microCors = require("micro-cors");
const cors = microCors({ allowMethods: ["GET"] });

const {
  Home,
  List,
  Latest,
  MangaInfo,
  Chapters,
  Search
} = require("./endpoints/endpoints");
const connectMiddleware = require("./sideEffects/connectMiddleware");

connectMiddleware();

module.exports = cors(
  router(
    get("/", Home),
    get("/list/:start/:limit", List),
    get("/latest/:start/:limit", Latest),
    get("/mangaInfo/:mangaId", MangaInfo),
    get("/chapter/:chapterId", Chapters),
    post("/search", Search)
  )
);
