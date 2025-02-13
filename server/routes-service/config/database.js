import moongose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({ path: './routes-service/.env' })

console.log(process.env.MONGODB_URI)

const connectDB = async () => {
  try {
    await moongose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('✅ MongoDB conectada')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

export default connectDB
