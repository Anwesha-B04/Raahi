import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import busIcon from "@/assets/bus-icon.png";

const LoginSelection = () => {
  const navigate = useNavigate();

  const userTypes = [
    {
      id: "commuter",
      title: "Commuter",
      description: "Track buses, plan routes, and get real-time updates",
      icon: Users,
      features: ["Live bus tracking", "Route planning", "Bus schedules", "Real-time alerts"],
      route: "/dashboard/commuter"
    },
    {
      id: "lta",
      title: "Local Transport Authority",
      description: "Monitor fleet, analyze performance, and manage operations",
      icon: Shield,
      features: ["Fleet monitoring", "Driver analytics", "Route optimization", "Performance reports"],
      route: "/dashboard/lta"
    },
    {
      id: "municipal",
      title: "Municipal Corporation",
      description: "City-wide oversight and policy management",
      icon: Building2,
      features: ["City-wide analytics", "Policy support", "Public reports", "Service quality metrics"],
      route: "/dashboard/municipal"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={busIcon} alt="Raahi Logo" className="w-10 h-10" />
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Raahi
            </h1>
          </div>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Choose Your Access Type
            </h2>
            <p className="text-xl text-muted-foreground">
              Select the option that best describes your role to access the appropriate dashboard
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {userTypes.map((userType) => (
              <Card 
                key={userType.id} 
                className="shadow-card hover:shadow-primary transition-all duration-300 cursor-pointer group border-0"
                onClick={() => navigate(userType.route)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <userType.icon className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">{userType.title}</CardTitle>
                  <CardDescription className="text-base">
                    {userType.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3 mb-6">
                    {userType.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full" 
                    variant="default"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(userType.route);
                    }}
                  >
                    Access Dashboard
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Card className="max-w-2xl mx-auto shadow-card border-0">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Need Help?</h3>
                <p className="text-muted-foreground mb-4">
                  Not sure which access type is right for you? Contact your local transport 
                  authority or municipal corporation for guidance on accessing the Raahi platform.
                </p>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginSelection;