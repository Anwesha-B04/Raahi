import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Bus } from "lucide-react";
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
          <div className="h-96 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/20">
            <div className="text-center space-y-4">
              <MapPin className="w-16 h-16 text-primary mx-auto" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Interactive Map Loading...</h3>
                <p className="text-muted-foreground mb-4">
                  Punjab bus tracking system will be displayed here
                </p>
                <Badge variant="secondary">Map Integration in Progress</Badge>
              </div>
            </div>
            
            {/* Bus location indicators */}
            <div className="absolute inset-4 pointer-events-none">
              {busesToShow.slice(0, 3).map((bus, index) => (
                <div
                  key={bus.id}
                  className="absolute flex items-center gap-2 bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm border"
                  style={{
                    top: `${20 + index * 25}%`,
                    left: `${15 + index * 20}%`,
                  }}
                >
                  <Bus className="w-4 h-4 text-primary" />
                  <div className="text-xs">
                    <p className="font-medium">{bus.id}</p>
                    <p className="text-muted-foreground">{bus.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="absolute top-2 left-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs z-10">
            <div className="flex items-center gap-1">
              <Bus className="w-3 h-3 text-primary" />
              <span>Preparing live tracking...</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Map;