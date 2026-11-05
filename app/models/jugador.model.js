module.exports = (sequelize, Sequelize) => {

    const Jugador = sequelize.define("jugador", {
        id_jugador: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        dorsal: {
            type: Sequelize.INTEGER,
        },

      sueldo: {
    type: Sequelize.DECIMAL(10, 2)
},
        ingreso: {
            type: Sequelize.DATE
        },
        status: {
            type: Sequelize.BOOLEAN
        }
    });

    return Jugador;
};