import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Bus, Navigation } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

  // Convert lat/lng to relative positions on the map (simplified)
  const getPosition = (lat: number, lng: number) => {
    // Punjab bounds approximately: lat 29.5-32.5, lng 73.5-76.5
    const latPercent = ((lat - 29.5) / (32.5 - 29.5)) * 100;
    const lngPercent = ((lng - 73.5) / (76.5 - 73.5)) * 100;
    return {
      top: `${Math.max(5, Math.min(95, 95 - latPercent))}%`, // Invert Y axis
      left: `${Math.max(5, Math.min(95, lngPercent))}%`
    };
  };

  return (
    <Card className="shadow-card border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          Live Bus Tracking - Punjab
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Map background */}
          <div className="h-96 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-lg border-2 border-muted-foreground/10 relative overflow-hidden">
            
            {/* Grid lines for map effect */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(8)].map((_, i) => (
                <div key={`v-${i}`} className="absolute h-full w-px bg-muted-foreground" style={{ left: `${(i + 1) * 12.5}%` }} />
              ))}
              {[...Array(6)].map((_, i) => (
                <div key={`h-${i}`} className="absolute w-full h-px bg-muted-foreground" style={{ top: `${(i + 1) * 16.66}%` }} />
              ))}
            </div>

            {/* City labels */}
            <div className="absolute top-4 left-4 text-xs font-medium text-muted-foreground">Amritsar</div>
            <div className="absolute top-12 right-8 text-xs font-medium text-muted-foreground">Jalandhar</div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground">Chandigarh</div>
            <div className="absolute bottom-8 left-8 text-xs font-medium text-muted-foreground">Patiala</div>
            <div className="absolute bottom-4 right-4 text-xs font-medium text-muted-foreground">Ludhiana</div>

            {/* Bus markers */}
            {busesToShow.map((bus) => {
              const position = getPosition(bus.lat, bus.lng);
              return (
                <div
                  key={bus.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={position}
                >
                  {/* Bus icon */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    bus.status === 'On Time' ? 'bg-green-500' : 'bg-red-500'
                  } text-white shadow-lg transition-transform hover:scale-110`}>
                    <Bus className="w-4 h-4" />
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background border rounded-lg p-2 shadow-lg min-w-48 z-10">
                    <div className="text-sm font-semibold">{bus.id}</div>
                    <div className="text-xs text-muted-foreground">{bus.route}</div>
                    <div className="text-xs mt-1">
                      Status: <span className={`font-medium ${bus.status === 'On Time' ? 'text-green-600' : 'text-red-600'}`}>
                        {bus.status}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Compass */}
            <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm p-2 rounded-lg">
              <Navigation className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
          
          <div className="absolute bottom-2 left-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs z-10">
            <div className="flex items-center gap-1">
              <Bus className="w-3 h-3 text-primary" />
              <span>Live tracking active • {busesToShow.length} buses</span>
            </div>
          </div>

          {/* Legend */}
          <div className="absolute bottom-2 right-2 bg-background/90 backdrop-blur-sm p-2 rounded text-xs space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>On Time</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Delayed</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Map;