import L from 'leaflet'

export const createIcon = (index, markerId, selectedMarker) => {
  return L.divIcon({
    html: `<div style="
      background-color: ${index === 0 ? 'green' : 'blue'};
      color: white; 
      width: 25px; 
      height: 25px; 
      border-radius: 50%; 
      ${selectedMarker === markerId ? 'padding: 15px; border: 3px solid black; font-size: 20px;' : 'font-size: 13px;'}
      display: flex; 
      align-items: center; 
      justify-content: center;
      font-weight: bold;"
    >${index === 0 ? '&#9658;' : index}</div>`,
    className: '',
    iconSize: [15, 15],
    iconAnchor: [15, 15]
  })
}
