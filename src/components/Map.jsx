import { Icon } from "leaflet";
import CustomIcon from "../images/icon-location.svg";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

export const Map = ({ getLat, getLon }) => {
  const customIcon = new Icon({
    iconUrl: CustomIcon,
    iconSize: [45, 55],
  });

  return (
    <MapContainer
      key={`${getLat}-${getLon}`}
      center={[getLat, getLon]}
      zoom={15}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[`${getLat}`, `${getLon}`]} icon={customIcon}>
        <Popup>
          <p>This is your location</p>
        </Popup>
      </Marker>
    </MapContainer>
  );
};
