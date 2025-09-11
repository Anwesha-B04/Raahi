import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Bus } from "lucide-react";

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
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState(localStorage.getItem('mapbox_token') || '');
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      // Center on Punjab, India
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [75.3412, 31.1471], // Chandigarh coordinates
        zoom: 10,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );

      map.current.on('load', () => {
        setIsMapLoaded(true);
        addBusMarkers();
      });

      // Save token to localStorage
      localStorage.setItem('mapbox_token', mapboxToken);

    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  const addBusMarkers = () => {
    if (!map.current || !isMapLoaded) return;

    // Sample bus locations for Punjab
    const sampleBuses = [
      { id: "PB-01-123", lat: 31.1471, lng: 75.3412, route: "Chandigarh - Ludhiana", status: "On Time" },
      { id: "PB-02-456", lat: 31.6340, lng: 74.8723, route: "Amritsar - Jalandhar", status: "Delayed" },
      { id: "PB-03-789", lat: 30.7333, lng: 76.7794, route: "Patiala - Mohali", status: "On Time" },
    ];

    const busesToShow = buses.length > 0 ? buses : sampleBuses;

    busesToShow.forEach((bus) => {
      // Create custom marker element
      const el = document.createElement('div');
      el.className = 'bus-marker';
      el.style.backgroundImage = 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMgMTNIMjFWMTlIMTlWMjFIMTdWMTlIN1YyMUg1VjE5SDNWMTNaIiBmaWxsPSIjRkY2NzAwIi8+CjxwYXRoIGQ9Ik0zIDEzVjdINUw3IDNIMTdME19VN0gyMVYxM0gzWiIgZmlsbD0iI0ZGNjcwMCIvPgo8Y2lyY2xlIGN4PSI3IiBjeT0iMTciIHI9IjIiIGZpbGw9IiMzMzMiLz4KPGNpcmNsZSBjeD0iMTciIGN5PSIxNyIgcj0iMiIgZmlsbD0iIzMzMyIvPgo8L3N2Zz4K)';
      el.style.width = '32px';
      el.style.height = '32px';
      el.style.backgroundSize = 'contain';
      el.style.backgroundRepeat = 'no-repeat';
      el.style.cursor = 'pointer';

      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-2">
          <h4 class="font-semibold text-sm">${bus.id}</h4>
          <p class="text-xs text-muted-foreground">${bus.route}</p>
          <p class="text-xs mt-1">Status: <span class="font-medium ${bus.status === 'On Time' ? 'text-green-600' : 'text-red-600'}">${bus.status}</span></p>
        </div>
      `);

      // Add marker to map
      new mapboxgl.Marker(el)
        .setLngLat([bus.lng, bus.lat])
        .setPopup(popup)
        .addTo(map.current!);
    });
  };

  useEffect(() => {
    if (mapboxToken && !map.current) {
      initializeMap();
    }

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  useEffect(() => {
    if (isMapLoaded) {
      addBusMarkers();
    }
  }, [buses, isMapLoaded]);

  if (!mapboxToken) {
    return (
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Map Configuration Required
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            To view the live bus tracking map, please enter your Mapbox public token below.
          </p>
          <div className="space-y-3">
            <Input
              placeholder="Enter your Mapbox public token"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
            />
            <Button 
              onClick={initializeMap}
              disabled={!mapboxToken.trim()}
              className="w-full"
            >
              Load Map
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Get your free Mapbox token at{' '}
            <a 
              href="https://mapbox.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              mapbox.com
            </a>
          </p>
        </CardContent>
      </Card>
    );
  }

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
          <div ref={mapContainer} className="h-96 rounded-lg shadow-lg" />
          <div className="absolute top-2 left-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs">
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