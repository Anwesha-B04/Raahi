import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Search, 
  Navigation, 
  Clock, 
  Bus,
  Star,
  ArrowRight,
  Timer,
  Users,
  Route
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import busIcon from "@/assets/bus-icon.png";
import { useState } from "react";
import Map from "@/components/Map";

const CommuterDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for buses
  const nearbyBuses = [
    {
      id: "PB-01-123",
      route: "Chandigarh - Ludhiana",
      currentStop: "Sector 17",
      nextStop: "Sector 22",
      eta: "5 min",
      occupancy: "Moderate",
      status: "On Time"
    },
    {
      id: "PB-02-456",
      route: "Amritsar - Jalandhar", 
      currentStop: "Bus Stand",
      nextStop: "Civil Lines",
      eta: "12 min",
      occupancy: "High",
      status: "Delayed"
    },
    {
      id: "PB-03-789",
      route: "Patiala - Mohali",
      currentStop: "Railway Station",
      nextStop: "IT Park",
      eta: "8 min",
      occupancy: "Low",
      status: "On Time"
    }
  ];

  const savedRoutes = [
    {
      id: 1,
      name: "Home to Office",
      from: "Sector 34, Chandigarh",
      to: "IT Park, Mohali",
      buses: ["PB-01-123", "PB-03-789"],
      duration: "45 min"
    },
    {
      id: 2,
      name: "Office to Mall",
      from: "IT Park, Mohali",
      to: "Elante Mall, Chandigarh",
      buses: ["PB-02-456"],
      duration: "30 min"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={busIcon} alt="Raahi Logo" className="w-10 h-10" />
            <div>
              <h1 className="text-xl font-bold">Raahi Commuter</h1>
              <p className="text-sm text-muted-foreground">Welcome back!</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate('/login')}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="track" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="track" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Track
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Search
            </TabsTrigger>
            <TabsTrigger value="routes" className="flex items-center gap-2">
              <Navigation className="w-4 h-4" />
              Routes
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Schedule
            </TabsTrigger>
          </TabsList>

          {/* Live Tracking Tab */}
          <TabsContent value="track" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Map Section */}
              <div className="lg:col-span-2">
                <Map />
              </div>

              {/* Nearby Buses */}
              <div>
                <Card className="shadow-card border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bus className="w-5 h-5 text-primary" />
                      Nearby Buses
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {nearbyBuses.map((bus) => (
                      <div key={bus.id} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-sm">{bus.id}</h4>
                          <Badge 
                            variant={bus.status === "On Time" ? "default" : "destructive"}
                            className="text-xs"
                          >
                            {bus.eta}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{bus.route}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">
                            {bus.currentStop} → {bus.nextStop}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {bus.occupancy}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Search Tab */}
          <TabsContent value="search" className="space-y-6">
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-primary" />
                  Search Buses & Routes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Input 
                    placeholder="Search by bus number, route, or destination..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="default">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {nearbyBuses.map((bus) => (
                    <Card key={bus.id} className="p-4 hover:shadow-primary transition-all duration-300">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">{bus.id}</h4>
                        <Badge variant="outline">{bus.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{bus.route}</p>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center gap-2">
                          <Timer className="w-3 h-3" />
                          <span>ETA: {bus.eta}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-3 h-3" />
                          <span>Occupancy: {bus.occupancy}</span>
                        </div>
                      </div>
                      <Button size="sm" className="w-full mt-3">
                        Track This Bus
                      </Button>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Routes Tab */}
          <TabsContent value="routes" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Route Planner */}
              <Card className="shadow-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Navigation className="w-5 h-5 text-primary" />
                    Plan Your Route
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">From</label>
                      <Input placeholder="Enter starting location" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">To</label>
                      <Input placeholder="Enter destination" />
                    </div>
                    <Button variant="hero" className="w-full">
                      <Route className="w-4 h-4 mr-2" />
                      Find Routes
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Saved Routes */}
              <Card className="shadow-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-primary" />
                    Saved Routes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {savedRoutes.map((route) => (
                    <div key={route.id} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-sm">{route.name}</h4>
                        <Badge variant="outline" className="text-xs">{route.duration}</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-2">
                          <span>{route.from}</span>
                          <ArrowRight className="w-3 h-3" />
                          <span>{route.to}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-xs">
                          Buses: {route.buses.join(", ")}
                        </div>
                        <Button size="sm" variant="outline">
                          Use Route
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Bus Timetables
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {nearbyBuses.map((bus) => (
                    <div key={bus.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">{bus.id} - {bus.route}</h4>
                        <Badge variant="outline">Today's Schedule</Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="font-medium">Next Departure</p>
                          <p className="text-muted-foreground">{bus.eta}</p>
                        </div>
                        <div>
                          <p className="font-medium">Frequency</p>
                          <p className="text-muted-foreground">Every 15 min</p>
                        </div>
                        <div>
                          <p className="font-medium">First Bus</p>
                          <p className="text-muted-foreground">5:30 AM</p>
                        </div>
                        <div>
                          <p className="font-medium">Last Bus</p>
                          <p className="text-muted-foreground">11:00 PM</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CommuterDashboard;