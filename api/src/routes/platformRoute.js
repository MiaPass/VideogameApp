const { Router } = require("express");
const { Platform } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  Platform.findAll()
    .then((result) => res.json(result))
    .catch((err) => console.log("platformRoute: Error 1", err)); // In case it breaks
});

module.exports = router;
