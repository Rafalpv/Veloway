import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const FavRoutes = sequelize.define(
  'FavRoutes',
  {
    id_fav_route: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id_user'
      }
    },
    idRoute: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'FavRoutes', // Nombre de la tabla
    timestamps: true, // createdAt y updatedAt
    indexes: [
      {
        unique: true,
        fields: ['idUser', 'idRoute'] // Asegura que un usuario no pueda tener la misma ruta favorita más de una vez
      }
    ]
  }
)

FavRoutes.associate = (models) => {
  FavRoutes.belongsTo(models.Users, {
    foreignKey: 'id_user'
  })
}

export default FavRoutes
