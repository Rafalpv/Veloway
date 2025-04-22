import mongoose from 'mongoose'

const MarkerSchema = new mongoose.Schema({
  markerId: { type: Number, required: true },
  position: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  }
}, { _id: false })

const StepSchema = new mongoose.Schema({
  instruction: { type: String, required: true },
  distance: { type: Number, required: true }, // en metros
  duration: { type: Number, required: true }, // en segundos
  position: {
    lat: { type: Number },
    lng: { type: Number }
  }
}, { _id: false })

const RouteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String }, // opcional
  markers: [MarkerSchema],
  distance: { type: Number, required: true }, // en metros
  duration: { type: Number, required: true }, // en segundos
  isRoundTrip: { type: Boolean, required: true },
  polyline: { type: String, required: true }, // formato codificado (recomendado para mapas)
  steps: [StepSchema],
  elevations: {
    type: [Number], // altitudes en metros
    default: []
  },
  creatorID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

RouteSchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  next()
})

export default mongoose.model('Route', RouteSchema)
