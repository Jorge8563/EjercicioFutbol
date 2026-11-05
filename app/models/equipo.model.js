module.exports = (sequelize, Sequelize) => {

    const Equipo = sequelize.define("equipo", {
        id_equipo: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_jugador: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        nombre_club: {
            type: Sequelize.STRING
        }
    }, {
        tableName: "equipos",
        timestamps: false
    });

    return Equipo;
};