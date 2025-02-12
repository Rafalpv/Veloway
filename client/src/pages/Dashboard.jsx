import { createSwapy } from 'swapy'
import { useEffect, useRef, useState } from 'react'

const Widgets = [
  { id: 'usuarios', title: 'Usuarios', color: 'blueButton', mainContent: 'DashboardUsers', mainContainer: false },
  { id: 'rutas', title: 'Rutas', color: 'greenButton', mainContent: 'DashboardRoutes', mainContainer: false },
  { id: 'retos', title: 'Retos', color: 'gold', mainContent: 'DashboardChallenges', mainContainer: false }
]

function Dashboard() {
  const swapy = useRef(null)
  const container = useRef(null)
  const [mainContain, setMainContain] = useState('Arrastrar un widget aquí')

  useEffect(() => {
    // If container element is loaded
    if (container.current) {
      swapy.current = createSwapy(container.current)

      // Your event listeners
      swapy.current.onSwap((event) => {
        const mainSlot = event.newSlotItemMap.asObject.mainSlot
        Widgets.forEach((widget) => {
          widget.id === mainSlot ? widget.mainContainer = true : widget.mainContainer = false
        })
        if (mainSlot === 'mainSlot') {
          setMainContain('Arrastrar un widget aquí')
        } else {
          setMainContain(mainSlot)
        }
      })
    }
    return () => {
      // Destroy the swapy instance on component destroy
      swapy.current?.destroy()
    }
  }, [])

  return (
    <div ref={container} className="grid grid-cols-5 grid-rows-5 h-screen w-screen">
      {/* Sidebar con elementos A, B, C, D */}
      <aside className="col-span-1 row-span-4 flex flex-col gap-2 h-full">
        {Widgets.map((slot, index) => (
          <div key={slot.id} data-swapy-slot={slot.id} className="flex-1 flex mx-6 my-6">
            <div data-swapy-item={slot.id} className={`bg-${slot.color} p-4 flex items-center justify-center w-full rounded-3xl border-2
            border-black`}>
              <div className="text-3xl font-bold">{slot.mainContainer ? slot.mainContent : slot.title}</div>
            </div>
          </div>
        ))}
      </aside>

      {/* Contenido principal con el elemento E */}
      <section className="col-start-2 col-span-4 row-span-4 text-white flex mr-5 my-6">
        <div data-swapy-no-drag></div>
        <div data-swapy-slot='mainSlot' className="flex-1 flex">
          <div data-swapy-item='mainSlot' className='w-full h-full flex items-center justify-center rounded-3xl border-2
            border-black'>
            <div className="text-3xl font-bold">{mainContain}</div>
          </div>
        </div>
      </section>
    </div>

  )
}

export default Dashboard
