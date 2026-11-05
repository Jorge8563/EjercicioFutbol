const db = require("../models");
const Jugador = db.jugador;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
  
  if (!req.body.nombre) {
    res.status(400).send({  
      message: "El nombre no puede estar vacío"
    });
    return;
  }

  const jugador = {
    nombre: req.body.nombre,
    dorsal: req.body.dorsal,
    sueldo: req.body.sueldo,
    ingreso: req.body.ingreso,
    status: req.body.status ? req.body.status : false
  };

  
  Jugador.create(jugador)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al crear el jugador"
      });
    });
};

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

   Jugador.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving jugador."
            });
        });
};


exports.findOne = (req, res) => {
    const id = req.params.id;

   Jugador.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving proovedor with id=" + id
            });
        });
};


exports.update = (req, res) => {
    const id = req.params.id;

    Jugador.update(req.body, {
        where: { id_jugador: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Jugador was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update jugador with id=${id}. Maybe jugador was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
    console.error("Error al actualizar:", err);

    res.status(500).send({
        message: err.message
    });
});
};
 
exports.delete = (req, res) => {
    const id = req.params.id;
    
    Jugador.destroy({
        where: { id_jugador: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Jugador was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Jugador with id=${id}. El Jugador no fue encontado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete jugador with id=" + id
            });
        });
};
exports.findAllStatus = (req, res) => {
    Jugador.findAll({
        where: { status: true }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};