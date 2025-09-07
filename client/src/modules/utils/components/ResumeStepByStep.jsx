import { useState } from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

const ResumeStepsByLeg = ({ leg, index }) => {
  const [infoSteps, setInfoSteps] = useState(false)

  return (
    <div key={index} className='p-4 border rounded-lg bg-surface-light dark:bg-surface-dark shadow-md border-theme-light dark:border-theme-dark'>

      {/* Encabezado con la flecha alineada a la derecha */}
      <div className='flex justify-between items-center'>
        <div>
          <p className='text-md font-semibold text-text-light dark:text-text-dark'>
            {leg.start_address} → {leg.end_address}
          </p>
          <p className='text-sm text-theme-light dark:text-accent-dark'>
            {leg.distance.text} | {leg.duration.text}
          </p>
        </div>
        <MdOutlineKeyboardArrowDown
          size={30}
          className={`cursor-pointer transition-transform text-primary-light dark:text-primary-dark ${infoSteps ? 'rotate-180' : ''}`}
          onClick={() => setInfoSteps(!infoSteps)}
        />
      </div>

      {/* Lista de pasos con animación */}
      {infoSteps && (
        <ul className='mt-3 p-3 rounded-md shadow-md border bg-surface-light dark:bg-surface-dark border-theme-light dark:border-theme-dark'>
          {leg.steps.map((step, stepIndex) => (
            <li key={stepIndex} className='text-sm text-text-light dark:text-text-dark mb-1 border-l-4 border-secondary-light dark:border-secondary-dark pl-2'>
              {step.html_instructions.replace(/<[^>]+>/g, '')}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ResumeStepsByLeg
