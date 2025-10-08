import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import './map.scss'
import Pin from "../../components/pin/Pin";

function Map({items}){
    return (
    <MapContainer center={items.length === 1 ? [items[0].latitude,items[0].longitude] : [19.0724, 72.8997]} zoom={12} scrollWheelZoom={true} className = 'map'>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {items.map(item=>(
        <Pin item={item} key={item.id}/>
    ))}
  </MapContainer>
    )
}

export default Map