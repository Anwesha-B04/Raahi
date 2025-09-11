import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Bus } from "lucide-react";

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom bus icon
const busIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMgMTNIMjFWMTlIMTlWMjFIMTdWMTlIN1YyMUg1VjE5SDNWMTNaIiBmaWxsPSIjRkY2NzAwIi8+CjxwYXRoIGQ9Ik0zIDEzVjdINUw3IDNIMTdMMTkgN0gyMVYxM0gzWiIgZmlsbD0iI0ZGNjcwMCIvPgo8Y2lyY2xlIGN4PSI3IiBjeT0iMTciIHI9IjIiIGZpbGw9IiMzMzMiLz4KPGNpcmNsZSBjeD0iMTciIGN5PSIxNyIgcj0iMiIgZmlsbD0iIzMzMyIvPgo8L3N2Zz4K',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

interface MapProps {
  buses?: Array<{
    id: string;
    lat: number;
    lng: number;
    route: string;
    status: string;
  }>;
}

const Map: React.FC<MapProps> = ({ buses = [] }) => {
  // Sample bus locations for Punjab
  const sampleBuses = [
    { id: "PB-01-123", lat: 31.1471, lng: 75.3412, route: "Chandigarh - Ludhiana", status: "On Time" },
    { id: "PB-02-456", lat: 31.6340, lng: 74.8723, route: "Amritsar - Jalandhar", status: "Delayed" },
    { id: "PB-03-789", lat: 30.7333, lng: 76.7794, route: "Patiala - Mohali", status: "On Time" },
    { id: "PB-04-012", lat: 31.4260, lng: 75.2550, route: "Ludhiana - Bathinda", status: "On Time" },
    { id: "PB-05-345", lat: 30.9010, lng: 75.8573, route: "Mohali - Zirakpur", status: "Delayed" },
  ];

  const busesToShow = buses.length > 0 ? buses : sampleBuses;

  return (
    <Card className="shadow-card border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          Live Bus Tracking
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="h-96 rounded-lg overflow-hidden shadow-lg">
            <MapContainer
              center={[31.1471, 75.3412]}
              zoom={10}
              style={{ height: '100%', width: '100%' }}
              className="z-0"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {busesToShow.map((bus) => (
                <Marker
                  key={bus.id}
                  position={[bus.lat, bus.lng]}
                  icon={busIcon}
                >
                  <Popup>
                    <div className="p-2">
                      <h4 className="font-semibold text-sm">{bus.id}</h4>
                      <p className="text-xs text-muted-foreground">{bus.route}</p>
                      <p className="text-xs mt-1">
                        Status: <span className={`font-medium ${bus.status === 'On Time' ? 'text-green-600' : 'text-red-600'}`}>
                          {bus.status}
                        </span>
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
          
          <div className="absolute top-2 left-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs z-10">
            <div className="flex items-center gap-1">
              <Bus className="w-3 h-3 text-primary" />
              <span>Live tracking active</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Map;