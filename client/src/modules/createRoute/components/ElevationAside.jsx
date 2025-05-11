import { useRef, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler } from 'chart.js'
import { useMapMarkers } from '../context/MapMarkersContext'
import { useMarkersContext } from '../pages/CreateRoute'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler)

const ElevationChart = () => {
  const chartRef = useRef(null)
  const { route } = useMapMarkers()
  const { elevationSiderVisible } = useMarkersContext()

  const minElevation = Math.min(...route.elevation)
  const maxElevation = Math.max(...route.elevation)
  const yMin = Math.floor(minElevation / 100) * 100
  const yMax = Math.ceil(maxElevation / 100) * 100

  // Crear degradado al montar el componente
  useEffect(() => {
    const chart = chartRef.current
    if (!chart) return
    const ctx = chart.ctx
    const gradient = ctx.createLinearGradient(0, 0, 0, 400)
    gradient.addColorStop(0, 'rgba(75, 34, 67, 0.5)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 1)')
    chart.data.datasets[0].backgroundColor = gradient
    chart.update()
  }, [route.elevation])

  const chartData = {
    labels: route.elevation.map((_, index) => index),
    datasets: [
      {
        data: route.elevation,
        fill: true,
        backgroundColor: 'rgba(75, 34, 67, 1)', // Será reemplazado por el gradiente
        borderColor: 'rgba(19, 34, 67, 1)',
        borderWidth: 1.5,
        pointRadius: 0,
        tension: 0.3
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 0
      }
    },
    scales: {
      x: {
        display: false
      },
      y: {
        min: yMin,
        max: yMax,
        display: true, // <-- ahora se muestra el eje Y
        ticks: {
          stepSize: 100, // ajusta según rango; puedes usar 50 si hay poco espacio
          callback: (value) => `${value} m`
        },
        grid: {
          drawTicks: true,
          drawOnChartArea: true, // ahora se dibujan las líneas horizontales también
          color: 'rgba(0, 0, 0, 0.4)'
        }
      }

    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `Elevación: ${tooltipItem.raw} m`
        }
      }
    }
  }

  return (
    <div className={`w-full transition-all duration-300 border-2 border-t-black bg-slate-200 ${elevationSiderVisible ? 'h-1/5' : 'hidden'}`}>
      <Line ref={chartRef} data={chartData} options={chartOptions} />
    </div>
  )
}

export default ElevationChart
