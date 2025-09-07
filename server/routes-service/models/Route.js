import mongoose from 'mongoose'

const MarkerSchema = new mongoose.Schema({
  markerId: {
    type: Number,
    required: true,
    unique: true // Si quieres garantizar que no se repitan IDs
  },
  position: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  }
}, { _id: false })

const StepSchema = new mongoose.Schema({
  distance: {
    text: { type: String, required: true },
    value: { type: Number, required: true }
  },
  duration: {
    text: { type: String, required: true },
    value: { type: Number, required: true }
  },
  end_location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  html_instructions: { type: String, required: true },
  polyline: {
    points: { type: String, required: true }
  },
  start_location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  travel_mode: { type: String, required: true }

}, { _id: false })

// Esquema para cada "leg" (ruta completa de un segmento)
const LegSchema = new mongoose.Schema({
  distance: {
    text: { type: String, required: true },
    value: { type: Number, required: true }
  },
  duration: {
    text: { type: String, required: true },
    value: { type: Number, required: true }
  },
  end_address: { type: String, required: true },
  end_location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  start_address: { type: String, required: true },
  start_location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  steps: [StepSchema] // Array de pasos
}, { _id: false })

const RouteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  markers: [MarkerSchema],
  distance: { type: Number, required: true }, // en metros
  time: { type: Number, required: true }, // en segundos
  privacity: {
    type: String,
    enum: ['public', 'private'],
    default: 'public'
  },
  polyline: {
    type: [
      {
        lat: {
          type: Number,
          required: true
        },
        lng: {
          type: Number,
          required: true
        }
      }
    ],
    required: true
  },
  elevation: {
    type: [Number],
    default: []
  },
  isRoundTrip: {
    type: Boolean,
    default: false
  },
  steps: [LegSchema],
  traffic_speed_entry: { type: [String], default: [] }, // traffic_speed_entry vacío
  via_waypoint: { type: [String], default: [] }, // via_waypoint vacío
  owner: {
    creatorID: { type: Number, required: true },
    nickname: { type: String, required: true }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

RouteSchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  next()
})

export default mongoose.model('Route', RouteSchema)
