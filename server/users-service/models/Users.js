import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Users = sequelize.define(
  'Users',
  {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    level: {
      type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
      allowNull: false
    }
  },
  {
    tableName: 'Users', // Nombre de la tabla
    timestamps: true // createdAt y updatedAt
  }
)

export default Users
