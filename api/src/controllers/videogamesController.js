const axios = require("axios");
const { Videogame, Genre, Platform } = require("../db");

const { API_KEY } = process.env;

const getAll = async () => {
  try {
    let result = [];
    let dbData = await Videogame.findAll(
      {
        include: Genre,
      },
      {
        include: Platform,
      }
    );
    result = [...dbData];

    let i = 1;
    let apiData = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}`
    );
    while (i < 6) {
      i++;
      const response = apiData.data.results;
      const apiResult = response.map((game) => {
        return {
          key: game.id,
          id: game.id,
          name: game.name,
          genres: game.genres,
          released: game.released,
          image: game.background_image,
          rating: game.rating,
          platforms: game.platforms.map((g) => g.platform.name),
        };
      });
      result = [...result, ...apiResult];
      apiData = await axios.get(apiData.data.next);
    }
    return result;
  } catch (err) {
    console.log("videogamesController: Error 1, ", err); // In case it breaks
  }
};

const getByName = async (name) => {
  try {
    let dbData = await Videogame.findAll({
      include: Genre,
    });
    if (dbData.length) {
      var dbCoincident = dbData.filter((g) =>
        g.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    const apiData = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`
    );
    const apiResult = apiData.data.results;
    let apiCoincident = apiResult.map((games) => {
      return {
        key: games.id,
        id: games.id,
        name: games.name,
        genres: games.genres,
        released: games.released,
        image: games.background_image,
        rating: games.rating,
        platforms: games.platforms.map((g) => g.platform.name),
        genres: games.genres,
      };
    });

    var result = [];
    if (dbCoincident && apiCoincident)
      result = [...dbCoincident, ...apiCoincident.splice(0, 15)];
    if (!dbCoincident) result = [...apiCoincident.splice(0, 15)];
    if (!apiCoincident) result = [...dbCoincident];

    if (result) {
      return result;
    } else {
      console.log("No videogame with that name was found. "); // Random msg in my mind
    }
  } catch (err) {
    console.log("videogamesController: Error 2, ", err); // In case it breaks
  }
};

module.exports = { getAll, getByName };
