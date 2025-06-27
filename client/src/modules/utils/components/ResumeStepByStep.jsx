import { useState } from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

const ResumeStepsByLeg = ({ leg, index }) => {
  const [infoSteps, setInfoSteps] = useState(false)

  return (
    <div key={index} className='p-4 border rounded-lg bg-gray-100 shadow-md'>
      {/* Encabezado con la flecha alineada a la derecha */}
      <div className='flex justify-between items-center'>
        <div>
          <p className='text-md font-semibold text-gray-800'>
            {leg.start_address} → {leg.end_address}
          </p>
          <p className='text-sm text-gray-600'>
            {leg.distance.text} | {leg.duration.text}
          </p>
        </div>
        <MdOutlineKeyboardArrowDown
          size={30}
          className={`cursor-pointer transition-transform ${infoSteps ? 'rotate-180' : ''
            }`}
          onClick={() => setInfoSteps(!infoSteps)}
        />
      </div>

      {/* Lista de pasos con animación */}
      {infoSteps && (
        <ul className='mt-3 bg-white p-3 rounded-md shadow-md border border-gray-200'>
          {leg.steps.map((step, stepIndex) => (
            <li key={stepIndex} className='text-sm text-gray-700 mb-1 border-l-4 border-blue-500 pl-2'>
              {step.html_instructions.replace(/<[^>]+>/g, '')}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ResumeStepsByLeg
