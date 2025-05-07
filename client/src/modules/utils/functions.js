export const formatearTiempo = (segundos) => {
  const minutosTotales = Math.floor(segundos / 60)
  const horas = Math.floor(minutosTotales / 60)
  const minutos = minutosTotales % 60

  if (horas === 0) return `${minutos} min`
  if (minutos === 0) return `${horas} h`
  return `${horas} h ${minutos} min`
}

export const formatearDistancia = (metros) => {
  if (metros < 1000) {
    return `${metros} m`
  }
  const kilometros = (metros / 1000).toFixed(2)
  return `${kilometros} km`
}
