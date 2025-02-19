import L from 'leaflet'

export const createNumberIcon = (index) => {
  return L.divIcon({
    html: `<div style="
      background-color: ${index === 0 ? 'green' : 'blue'};
      color: white; 
      width: 25px; 
      height: 25px; 
      border-radius: 50%; 
      display: flex; 
      align-items: center; 
      justify-content: center;
      font-size: 13px;
      font-weight: bold;
    ">${index === 0 ? '&#9658;' : index}</div>`,
    className: '',
    iconSize: [15, 15],
    iconAnchor: [15, 15]
  })
}
