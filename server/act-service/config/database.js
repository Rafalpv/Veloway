import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config({ path: './act-service/.env' })

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT,
  logging: false
})

const testConnection = async () => {
  try {
    await sequelize.sync()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

testConnection()

export default sequelize
