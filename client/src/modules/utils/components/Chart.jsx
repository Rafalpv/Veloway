import { useRef, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler)

const ElevationChart = ({ elevation, totalKms }) => {
  const numPoints = elevation.length
  const distances = Array.from({ length: numPoints }, (_, i) =>
    +(i * totalKms / (numPoints - 1)).toFixed(2)
  )

  const chartRef = useRef(null)

  const minElevation = Math.min(...elevation)
  const maxElevation = Math.max(...elevation)

  // Redondeo para rango y ticks
  const yMin = Math.floor(minElevation / 50) * 50
  const yMax = Math.ceil(maxElevation / 50) * 50

  console.log(elevation)

  useEffect(() => {
    const chart = chartRef.current
    if (!chart) return
    const ctx = chart.ctx
    const gradient = ctx.createLinearGradient(0, 0, 0, chart.height)
    gradient.addColorStop(1, 'rgba(34, 139, 34, 1)') // verde bosque suave arriba
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.5)') // transparente abajo
    chart.data.datasets[0].backgroundColor = gradient
    chart.update()
  }, [elevation])

  const chartData = {
    labels: distances || elevation.map((_, i) => i),
    datasets: [
      {
        data: elevation,
        fill: true,
        backgroundColor: 'rgba(34, 139, 34, 1)',
        borderColor: 'rgba(34, 139, 34, 1)',
        borderWidth: 1.5,
        pointRadius: 0,
        tension: 0.4
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 10,
        bottom: 30,
        left: 40,
        right: 20
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Distancia (km)',
          color: '#555',
          font: { size: 14, weight: 'bold' }
        },
        ticks: {
          maxRotation: 0,
          callback: (val, index) => distances ? distances[index].toFixed(1) : val
        },
        grid: {
          display: false
        }
      },
      y: {
        min: yMin,
        max: yMax,
        display: true,
        title: {
          display: true,
          text: 'Elevación (m)',
          color: '#555',
          font: { size: 14, weight: 'bold' }
        },
        ticks: {
          stepSize: 50,
          callback: value => `${value} m`
        },
        grid: {
          color: 'rgba(0,0,0,0.1)'
        }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        mode: 'nearest',
        intersect: false,
        callbacks: {
          label: ctx => {
            const elevationVal = ctx.parsed.y
            const distVal = ctx.label
            return `Kilómetro ${distVal} - Elevación ${elevationVal.toFixed(2)}m`
          }
        },
        backgroundColor: 'rgba(34, 139, 34, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        cornerRadius: 4,
        padding: 8
      }
    },
    elements: {
      point: { radius: 0 }
    }
  }

  return (
    <div className='w-full h-full border-2 border-t-black bg-slate-200 pt-2'>
      <Line ref={chartRef} data={chartData} options={chartOptions} />
    </div>
  )
}

export default ElevationChart
