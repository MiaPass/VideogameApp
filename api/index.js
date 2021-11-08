//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const axios = require("axios");
const { Genre, Platform } = require("./src/db");

const { API_KEY } = process.env;

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  try {
    const apiGenres = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const apiResults = apiGenres.data.results;
    const genres = apiResults.map((e) => {
      return { name: e.name };
    });
    for (let i = 0; i < genres.length; i++) {
      Genre.findOrCreate({
        where: {
          name: genres[i].name,
        },
      });
    }
    const apiPlatforms = await axios.get(
      `https://api.rawg.io/api/platforms/lists/parents?key=${API_KEY}`
    );
    const apiResult = apiPlatforms.data.results;
    const allPlatforms = [];
    apiResult.map((p) => {
      p.platforms.map((e) => {
        allPlatforms.push({ name: e.name });
      });
    });

    for (let i = 0; i < allPlatforms.length; i++) {
      Platform.findOrCreate({
        where: {
          name: allPlatforms[i].name,
        },
      });
    }
  } catch (err) {
    console.log("indexApi: Error 1, ", err);
  }
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
