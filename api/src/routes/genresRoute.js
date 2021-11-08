const { Router } = require("express");
const { Genre } = require("../db");

const router = Router();

router.get("/", (req, res) => {
  Genre.findAll()
    .then((result) => res.json(result))
    .catch((err) => console.log("genresRoute: Error 1", err)); // In case it breaks
});

module.exports = router;
