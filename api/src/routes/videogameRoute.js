const { Router } = require("express");
const {
  getById,
  createVideogame,
} = require("../controllers/videogameController");

const router = Router();

router.get("/", (req, res) => {
  const { id } = req.query;
  getById(id)
    .then((result) => res.json(result))
    .catch((err) => console.log("videogameRoute: Error 1", err)); // In case it breaks
});

router.post("/", async (req, res) => {
  const { name, description, releaseDate, rating, genres, platforms, image } =
    req.body;

  createVideogame(
    name,
    description,
    releaseDate,
    rating,
    genres,
    platforms,
    image
  )
    .then(() => res.json({ msg: "Game Created" }))
    .catch((err) => console.log(err));
});

module.exports = router;
