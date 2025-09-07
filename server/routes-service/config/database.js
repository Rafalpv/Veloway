import moongose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({ path: './routes-service/.env' })

const connectDB = async () => {
  try {
    await moongose.connect(process.env.MONGODB_URI)
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

export default connectDB
