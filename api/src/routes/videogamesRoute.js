const { Router } = require("express");
const { getAll, getByName } = require("../controllers/videogamesController");

const router = Router();

router.get("/all", (req, res) => {
  getAll()
    // console.log(result);
    .then((result) => res.json(result))
    .catch((err) => console.log("videogamesRoute: Error 1", err)); // In case it breaks
});

router.get("/", (req, res) => {
  const { name } = req.query;
  getByName(name)
    .then((result) => res.json(result))
    .catch((err) => console.log("videogamesRoute: Error 2", err)); // In case it breaks
});

module.exports = router;
