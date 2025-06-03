import Users from './Users'
import FavRoutes from './FavRoutes'

export default function initAssociations() {
  // Asociación uno a muchos entre Users y FavRoutes
  Users.hasMany(FavRoutes, {
    foreignKey: 'id_user',
    as: 'favRoutes' // Alias para la relación
  })

  FavRoutes.belongsTo(Users, {
    foreignKey: 'id_user',
    as: 'user' // Alias para la relación inversa
  })
}
