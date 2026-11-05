module.exports = app => {
    const equipo = require("../controllers/equipo.controller.js");
    var router = require("express").Router();

    // CREAR EQUIPO
    router.post("/create", equipo.create);

    // CONSULTAR TODOS LOS EQUIPOS
    router.get("/", equipo.findAll);

    // CONSULTAR EQUIPOS DE JUGADORES ACTIVOS
    router.get("/activos", equipo.findAllStatus);

    // CONSULTAR EQUIPO POR ID
    router.get("/:id", equipo.findOne);

    // ACTUALIZAR EQUIPO
    router.put("/update/:id", equipo.update);

    // ELIMINAR EQUIPO
    router.delete("/:id", equipo.delete);

    app.use("/api/equipo", router);
};