const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const videogamesRoute = require("./videogamesRoute");
const videogameRoute = require("./videogameRoute");
const platformRoute = require("./platformRoute");
const genresRoute = require("./genresRoute");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogames", videogamesRoute);
router.use("/videogame", videogameRoute);
router.use("/platforms", platformRoute);
router.use("/genres", genresRoute);

module.exports = router;
