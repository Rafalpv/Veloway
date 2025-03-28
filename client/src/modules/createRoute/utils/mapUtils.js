import L from 'leaflet'

export const createIcon = (index, markerId, selectedMarker) => {
  return L.divIcon({
    html: `<div style="
      background-color: ${index === 0 ? 'green' : 'blue'};
      color: white; 
      width: 20px; 
      height: 20px; 
      border-radius: 50%; 
      ${selectedMarker === markerId ? 'padding: 10px; border: 2px solid black; font-size: 15px;' : 'font-size: 13px;'}
      display: flex; 
      align-items: center; 
      justify-content: center;
      font-weight: bold;"
    >${index === 0 ? '&#9658;' : index}</div>`,
    className: '',
    iconSize: [10, 10],
    iconAnchor: [10, 10]
  })
}
