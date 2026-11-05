// Cargamos el archivo de configuración que contiene los datos de conexión a la base de datos
const dbConfig = require("../config/db.config.js");

// Importamos Sequelize, el ORM que nos permite trabajar con PostgreSQL como objetos JS
const Sequelize = require("sequelize");

// Creamos una instancia de Sequelize con los parámetros de conexión, incluyendo SSL para NeonDB
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,            // Dirección del servidor (host) de la base de datos
  dialect: dbConfig.dialect,      // El tipo de base de datos, en este caso 'postgres'

  // Configuraciones específicas del dialecto (PostgreSQL), incluyendo la conexión segura SSL
  dialectOptions: {
    ssl: {
      require: true,              // Indica que la conexión debe usar SSL obligatoriamente
      rejectUnauthorized: false   // Acepta certificados autofirmados o no verificados (útil en entornos no productivos)
    }
  },

  // Configuración del pool de conexiones para optimizar el rendimiento
  pool: {
    max: dbConfig.pool.max,       // Máximo de conexiones simultáneas
    min: dbConfig.pool.min,       // Mínimo de conexiones
    acquire: dbConfig.pool.acquire, // Tiempo máximo para obtener una conexión antes de lanzar error
    idle: dbConfig.pool.idle      // Tiempo que una conexión puede estar inactiva antes de ser liberada
  }
});

// Creamos un objeto `db` que exportaremos para acceder a Sequelize y los modelos desde otras partes del proyecto
const db = {};

// Asignamos la clase Sequelize al objeto `db`, útil si se requiere usar métodos del ORM manualmente
db.Sequelize = Sequelize;

db.sequelize = sequelize;

// Importamos el modelo de proveedor (con su propio nombre)
db.jugador = require("./jugador.model.js")(sequelize, Sequelize);
db.equipo = require("./equipo.model.js")(sequelize, Sequelize);

db.jugador.hasMany(db.equipo, {
    foreignKey: "id_jugador"
});

db.equipo.belongsTo(db.jugador, {
    foreignKey: "id_jugador"
});
;

module.exports = db;