const db = require("../models");
const Equipo = db.equipo;
const Jugador = db.jugador;
const Op = db.Sequelize.Op;

 
exports.create = (req, res) => {

    if (!req.body.nombre_club || !req.body.id_jugador) {
        res.status(400).send({
            message: "El nombre del club y el ID del jugador son obligatorios"
        });
        return;
    }

    const equipo = {
        id_jugador: req.body.id_jugador,
        nombre_club: req.body.nombre_club
    };

    Equipo.create(equipo)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al crear el equipo"
            });
        });
};


 
exports.findAll = (req, res) => {

    const nombre_club = req.query.nombre_club;

    var condition = nombre_club
        ? { nombre_club: { [Op.iLike]: `%${nombre_club}%` } }
        : null;

    Equipo.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al consultar equipos"
            });
        });
};

 
exports.findOne = (req, res) => {

    const id = req.params.id;

    Equipo.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: "Equipo no encontrado con ID=" + id
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al consultar equipo con ID=" + id
            });
        });
};

 
exports.update = (req, res) => {

    const id = req.params.id;

    const cambios = {};

    if (req.body.id_jugador !== undefined) {
        cambios.id_jugador = req.body.id_jugador;
    }

    if (req.body.nombre_club !== undefined) {
        cambios.nombre_club = req.body.nombre_club;
    }

    if (Object.keys(cambios).length === 0) {
        return res.status(400).send({
            message: "No se enviaron campos para modificar"
        });
    }

    Equipo.update(cambios, {
        where: { id_equipo: id }
    })
        .then(num => {
            if (num[0] === 1) {
                res.send({
                    message: "Equipo actualizado correctamente"
                });
            } else {
                res.status(404).send({
                    message: "No se encontró el equipo con ID=" + id
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al modificar equipo"
            });
        });
};

 
exports.delete = (req, res) => {

    const id = req.params.id;

    Equipo.destroy({
        where: { id_equipo: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Equipo eliminado correctamente"
                });
            } else {
                res.status(404).send({
                    message: "No se encontró el equipo con ID=" + id
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al eliminar equipo"
            });
        });
};
 
exports.findAllStatus = (req, res) => {

    Equipo.findAll({
        include: [{
            model: Jugador,
            where: { status: true }
        }]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al consultar equipos"
            });
        });
};