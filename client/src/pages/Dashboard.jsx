import { createSwapy } from 'swapy'
import { useEffect, useRef, useState, useContext } from 'react'
import { UsersContext } from '../context/UsersContext'

const ContentDashboardSecond = ({ length, type }) => (
  <div className='flex items-center'>
    <h4 className='flex items-baseline space-x-2'>
      <span className='text-6xl md:text-7xl font-bold'>{length}</span>
      <p className="text-4xl md:text-4xl font-semibold">{type}</p>
    </h4>
  </div>
)

const initWidgets = () => [
  { id: 'Usuarios', color: 'blueButton', mainContent: 'DashboardUsers', mainContainer: false, secondContent: <ContentDashboardSecond length={0} type="Usuarios" /> },
  { id: 'Rutas', color: 'greenButton', mainContent: 'DashboardRoutes', mainContainer: false, secondContent: <ContentDashboardSecond length={0} type="Rutas" /> },
  { id: 'Retos', color: 'gold', mainContent: 'DashboardChallenges', mainContainer: false, secondContent: <ContentDashboardSecond length={0} type="Retos" /> }
]

function Dashboard() {
  const swapy = useRef(null)
  const container = useRef(null)
  const { users } = useContext(UsersContext)

  // TODO: Sustituir por datos reales de rutas y retos cuando estén en el contexto
  const [rutas, setRutas] = useState([])
  const [retos, setRetos] = useState([])

  const [mainContain, setMainContain] = useState('Arrastrar un widget aquí')
  const [widgets, setWidgets] = useState(initWidgets)

  useEffect(() => {
    setWidgets((prevWidgets) =>
      prevWidgets.map((widget) => ({
        ...widget,
        secondContent: <ContentDashboardSecond
          length={widget.id === 'Usuarios' ? users.length : widget.id === 'Rutas' ? rutas.length : retos.length}
          type={widget.id}
        />
      }))
    )
  }, [users.length, rutas.length, retos.length])

  useEffect(() => {
    if (container.current) {
      swapy.current = createSwapy(container.current)

      swapy.current.onSwap((event) => {
        const mainSlot = event.newSlotItemMap.asObject.mainSlot
        setWidgets((prevWidgets) =>
          prevWidgets.map((widget) => ({
            ...widget,
            mainContainer: widget.id === mainSlot
          }))
        )
        setMainContain(mainSlot === 'mainSlot' ? 'Arrastrar un widget aquí' : mainSlot)
      })
    }

    return () => swapy.current?.destroy()
  }, [])

  return (
    <div ref={container} className="grid grid-cols-5 grid-rows-5 h-screen w-screen">
      <aside className="col-span-1 row-span-4 flex flex-col gap-2 h-full">
        {widgets.map((slot) => (
          <div key={slot.id} data-swapy-slot={slot.id} className="flex-1 flex mx-6 my-6">
            <div
              data-swapy-item={slot.id}
              className={`bg-${slot.color} p-4 flex items-center justify-center w-full rounded-3xl border-2 border-black`}
            >
              <div className="text-3xl font-bold">
                {slot.mainContainer ? slot.mainContent : slot.secondContent}
              </div>
            </div>
          </div>
        ))}
      </aside>

      <section className="col-start-2 col-span-4 row-span-4 text-white flex mr-5 my-6">
        <div data-swapy-slot='mainSlot' className="flex-1 flex">
          <div
            data-swapy-item='mainSlot'
            className='w-full h-full flex items-center justify-center rounded-3xl border-2 border-black'
          >
            <div className="text-3xl font-bold">{mainContain}</div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
