// Simple Express server for live bus tracking
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Sample Punjab-style bus data (id, name, lat, lng, speed, currentStop, nextStop, eta)
let buses = [
  { id: 'PB-01-123', name: 'Chandigarh Express', lat: 31.1471, lng: 75.3412, speed: 40, currentStop: 'Jalandhar', nextStop: 'Ludhiana', eta: '5 min' },
  { id: 'PB-02-456', name: 'Amritsar Deluxe', lat: 31.6340, lng: 74.8723, speed: 38, currentStop: 'Amritsar', nextStop: 'Batala', eta: '8 min' },
  { id: 'PB-03-789', name: 'Patiala Rapid', lat: 30.3398, lng: 76.3869, speed: 45, currentStop: 'Patiala', nextStop: 'Rajpura', eta: '12 min' },
  { id: 'PB-04-012', name: 'Ludhiana Metro', lat: 30.9000, lng: 75.8573, speed: 42, currentStop: 'Ludhiana', nextStop: 'Khanna', eta: '7 min' },
  { id: 'PB-05-345', name: 'Mohali Cityliner', lat: 30.7046, lng: 76.7179, speed: 37, currentStop: 'Mohali', nextStop: 'Chandigarh', eta: '10 min' },
  { id: 'PB-06-678', name: 'Bathinda Cruiser', lat: 30.2110, lng: 74.9455, speed: 50, currentStop: 'Bathinda', nextStop: 'Barnala', eta: '15 min' },
  { id: 'PB-07-901', name: 'Ferozepur Flyer', lat: 30.9257, lng: 74.6131, speed: 36, currentStop: 'Ferozepur', nextStop: 'Faridkot', eta: '9 min' },
  { id: 'PB-08-234', name: 'Pathankot Runner', lat: 32.2654, lng: 75.6520, speed: 48, currentStop: 'Pathankot', nextStop: 'Gurdaspur', eta: '13 min' },
  { id: 'PB-09-567', name: 'Hoshiarpur Shuttle', lat: 31.5324, lng: 75.9128, speed: 41, currentStop: 'Hoshiarpur', nextStop: 'Phagwara', eta: '11 min' },
  { id: 'PB-10-890', name: 'Moga Express', lat: 30.8165, lng: 75.1711, speed: 39, currentStop: 'Moga', nextStop: 'Ludhiana', eta: '14 min' }
];

// Simulate GPS movement (keep buses spaced out)
setInterval(() => {
  buses = buses.map(bus => {
    // Move each bus more noticeably in a random direction, but keep them spaced out
    const deltaLat = (Math.random() - 0.5) * 0.05; // Much larger spread for visible movement
    const deltaLng = (Math.random() - 0.5) * 0.05;
    return {
      ...bus,
      lat: Math.max(29.5, Math.min(32.5, bus.lat + deltaLat)),
      lng: Math.max(73.5, Math.min(76.5, bus.lng + deltaLng)),
      eta: `${Math.max(1, Math.round(Math.random() * 15))} min`
    };
  });
}, 3000); // Update every 3 seconds

// API endpoint to get all buses
app.get('/api/buses', (req, res) => {
  // Add current location string for each bus
  const busesWithLocation = buses.map(bus => ({
    ...bus,
    currentLocation: `${bus.currentStop} (${bus.lat.toFixed(3)}, ${bus.lng.toFixed(3)})`
  }));
  res.json(busesWithLocation);
});

// API endpoint to get nearby buses (optional, by lat/lng & radius)
app.get('/api/nearby-buses', (req, res) => {
  const { lat, lng, radius = 5 } = req.query;
  if (!lat || !lng) return res.status(400).json({ error: 'lat and lng required' });
  const R = 6371; // Earth radius in km
  const toRad = deg => deg * Math.PI / 180;
  const d = (lat1, lng1, lat2, lng2) => {
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  };
  const result = buses.filter(bus => d(Number(lat), Number(lng), bus.lat, bus.lng) <= radius);
  res.json(result);
});

app.listen(PORT, () => console.log(`Bus tracking backend running on port ${PORT}`));
