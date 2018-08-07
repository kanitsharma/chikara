//Imports
const responseGenerator = require("../sideEffects/responseGenerator");
const requestData = require("../sideEffects/requestData");
const { mangaInfoURL, chapterURL } = require("../sideEffects/urls");
const getListFromDB = require("../promises/getList");
const getLatestFromDb = require("../promises/getLatest");
const { searchManga } = require("../promises/searchManga");
const { json } = require("micro");

const Home = _ => "Welcome to mangaflux-api";

const List = async (req, res) => {
  const Data = await getListFromDB(req.params.start, req.params.limit);
  return responseGenerator(res, Data);
};

const Latest = async (req, res) => {
  const Data = await getLatestFromDb(req.params.start, req.params.limit);
  return responseGenerator(res, Data);
};

const MangaInfo = async (req, res) => {
  const Data = await requestData(mangaInfoURL + req.params.mangaId);
  return responseGenerator(res, Data);
};

const Chapters = async (req, res) => {
  const Data = await requestData(chapterURL + req.params.chapterId);
  return responseGenerator(res, Data);
};

const Search = async (req, res) => {
  const a = await json(req);
  const b = await searchManga(a.keywords);
  return responseGenerator(res, b);
};

module.exports = { Home, List, Latest, MangaInfo, Chapters, Search };
