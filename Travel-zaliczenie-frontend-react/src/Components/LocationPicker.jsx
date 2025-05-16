import L from "leaflet";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const customMarker = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [35, 35],
    iconAnchor: [17, 34],
    popupAnchor: [0, -34],
});


const LocationPicker = ({ lat, lng, onLocationSelect}) => {
    const MapClickHandler = ({ onClick }) => {
        useMapEvents({
            click: (e) => {
                onLocationSelect(e.latlng.lat, e.latlng.lng)
            },
        });
        return null;
    };

    return (
        <>
        <MapContainer center={[lat || 52.2298, lng || 21.0118]} zoom={13} className="relative justify-end items-end h-[500px] w-[500px] rounded">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[lat, lng]} icon={customMarker} />
            <MapClickHandler />
        </MapContainer>
        </>
    )    

}

export default LocationPicker