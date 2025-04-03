import { useMapMarkers } from '../context/MapMarkersContext'
import { useMarkersContext } from '../pages/CreateRoute'
import { RiPinDistanceFill } from 'react-icons/ri'
import { FcClock } from 'react-icons/fc'

const TimeDistanceInfo = () => {
  const { totalKms, totalTime } = useMapMarkers()
  const { listVisible } = useMarkersContext()

  return (
    <div className={`flex ${listVisible ? '' : 'flex-col'} items-center justify-center gap-8 font-poppins text-lg p-4 bg-white  rounded-xl shadow-lg border border-gray-200`}>
      {/* Distancia */}
      <span className="flex flex-col items-center font-semibold text-gray-700">
        <RiPinDistanceFill className="text-3xl text-blue-500" />
        <span className="text-blue-600 text-xl">{totalKms} km</span>
      </span>

      {/* Tiempo */}
      <span className="flex flex-col items-center font-semibold text-gray-700">
        <FcClock className="text-3xl" />
        <span className="text-green-600 text-xl">
          {totalTime.hours > 0 && `${totalTime.hours} h `}
          {totalTime.minutes >= 0 && `${totalTime.minutes} min `}
        </span>
      </span>
    </div>
  )
}

export default TimeDistanceInfo
