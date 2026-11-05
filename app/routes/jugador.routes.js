module.exports = app => {
    const jugador = require("../controllers/jugador.controller.js");
    var router = require("express").Router();

    // CREAR
    router.post("/create", jugador.create);

    // CONSULTAR TODOS
    router.get("/", jugador.findAll);

    // CONSULTAR JUGADORES ACTIVOS
    router.get("/activos", jugador.findAllStatus);

    // CONSULTAR POR ID
    router.get("/:id", jugador.findOne);

    // ACTUALIZAR
    router.put("/update/:id", jugador.update);

    // ELIMINAR POR ID
    router.delete("/:id", jugador.delete);

    app.use("/api/jugador", router);
};

//private static final String BASE_URL =
    //    "http://localhost:8081/api/jugador";