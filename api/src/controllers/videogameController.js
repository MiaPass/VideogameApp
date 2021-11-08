const axios = require("axios");
const { Videogame, Genre, Platform } = require("../db");

const { API_KEY } = process.env;

const getById = async (id) => {
  try {
    // console.log(id);
    if (!typeof id === "number") {
      let dbData = await Videogame.findOne({
        where: {
          id: id,
        },
        include: Genre,
        include: Platform,
      });
      var result = dbData;
      return result;
    } else {
      const apiData = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );
      const apiResult = apiData.data;
      if (!apiResult) {
        console.log("No videogame with that id was found. "); // Random msg in my mind
      } else if (apiResult) {
        const descriptionFromApi = apiResult.description;
        var description = descriptionFromApi.replace(/<[^>]*>?/g, "");
        var game = {
          key: apiResult.id,
          id: apiResult.id,
          name: apiResult.name,
          image: apiResult.background_image,
          genres: apiResult.genres,
          description: description,
          released: apiResult.released,
          rating: apiResult.rating,
          platforms: apiResult.platforms.map((g) => g.platform.name),
        };
        console.log(game);
        return game;
      }
    }
  } catch (err) {
    console.log("videogameController: Error 1", err); // In case it breaks
  }
};

const createVideogame = async (
  name,
  description,
  releaseDate,
  rating,
  genres,
  platforms,
  image
) => {
  try {
    console.log(genres);
    console.log(platforms);
    const createGame = await Videogame.create({
      name: name,
      description: description,
      releaseDate: releaseDate,
      rating: rating,
      image: image,
    });
    const genre = genres?.map(async (e) => {
      const genreName = await Genre.findOne({ where: { name: e[0] } });
      createGame.addGenres(genreName);
    });
    const platform = platforms?.map(async (e) => {
      const platformName = await Platform.findOne({ where: { name: e[0] } });
      createGame.addGenres(platformName);
    });
    await Promise.all(genre, platform);
  } catch (err) {
    console.log("videogameController: Error 2", err); // In case it breaks
  }
};

module.exports = { getById, createVideogame };
