import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Activity = sequelize.define(
  'Activity',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_ruta: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nameRoute: {
      type: DataTypes.STRING,
      allowNull: false
    },
    distancia: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    tiempoMovimiento: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    velocidadMedia: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    potenciaMedia: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    potenciaMaxima: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    desnivelPositivo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    desnivelNegativo: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    tableName: 'Activities',
    timestamps: true // createdAt y updatedAt
  }
)

export default Activity
