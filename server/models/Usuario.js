import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

sequelize.define(
  'Usuario',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    contrasenia: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'Usuarios', // Nombre de la tabla
    timestamps: true // createdAt y updatedAt
  }
)
