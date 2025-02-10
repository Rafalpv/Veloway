import L from 'leaflet'

export const createNumberIcon = (index) => {
  return L.divIcon({
    html: `<div style="
      background-color: #333; 
      color: white; 
      width: 30px; 
      height: 30px; 
      border-radius: 50%; 
      display: flex; 
      align-items: center; 
      justify-content: center;
      font-size: 16px;
      font-weight: bold;
      border: 1px solid yellow;
    ">${index}</div>`,
    className: '',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  })
}
