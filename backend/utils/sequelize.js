const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  "proyecto_alonsomauricio",
  "coderhouse-scorpion",
  "coderhouse",
  {
    host: "localhost",
    dialect: "mysql",
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importa y define los modelos
db.Empresa = require("../models/empresa")(sequelize, DataTypes);
db.Envergadura = require("../models/envergadura")(sequelize, DataTypes);
db.Rubro = require("../models/rubro")(sequelize, DataTypes); 
db.Banco = require("../models/banco")(sequelize, DataTypes); 
db.Rrhh = require("../models/rrhh")(sequelize, DataTypes); 
db.Asesor = require("../models/asesor")(sequelize, DataTypes); 
db.Contacto = require("../models/contacto")(sequelize, DataTypes);
db.Representante = require("../models/representante")(sequelize, DataTypes);
db.Programa = require("../models/programa")(sequelize, DataTypes);
db.Ratio = require("../models/ratio")(sequelize, DataTypes);
db.Localizacion = require("../models/localizacion")(sequelize, DataTypes);

db.Dep = require("../models/dep")(sequelize, DataTypes);
db.Sector = require("../models/sector")(sequelize, DataTypes);
db.Linea = require("../models/linea")(sequelize, DataTypes); 
db.Estado = require("../models/estado")(sequelize, DataTypes); 
db.Ciudad = require("../models/ciudad")(sequelize, DataTypes);
db.Provincia = require("../models/provincia")(sequelize, DataTypes); 
db.Pais = require("../models/pais")(sequelize, DataTypes); 


//Se definen las asociaciones
db.Empresa.associate(db);
db.Asesor.associate(db);
db.Rubro.associate(db);
db.Programa.associate(db);
db.Localizacion.associate(db);
db.Representante.associate(db);


module.exports = db;
