import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Search, Shield, Users, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import busIcon from "@/assets/bus-icon.png";
import heroBg from "@/assets/hero-bg.jpg";

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: MapPin,
      title: "Real-Time Tracking",
      description: "Track buses live with GPS precision for accurate arrival times"
    },
    {
      icon: Clock,
      title: "Smart Schedules",
      description: "View comprehensive timetables and plan your journey efficiently"
    },
    {
      icon: Search,
      title: "Route Planning",
      description: "Find the best routes between any two points in the city"
    },
    {
      icon: Shield,
      title: "Reliable Service",
      description: "Built for small cities with optimized low-bandwidth performance"
    },
    {
      icon: Users,
      title: "Multi-User Platform",
      description: "Designed for commuters, transport authorities, and municipal corporations"
    },
    {
      icon: BarChart3,
      title: "Fleet Analytics",
      description: "Comprehensive monitoring and reporting for transport authorities"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={busIcon} alt="Raahi Logo" className="w-10 h-10" />
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Raahi
            </h1>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate('/login')}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Login
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Smart Public Transport for{" "}
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Small Cities
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Real-time bus tracking, route planning, and efficient public transport 
              management designed specifically for Punjab's growing cities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="hero"
                onClick={() => navigate('/login')}
                className="text-lg px-8 py-6"
              >
                Get Started Today
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">
              Everything You Need for Smart Transit
            </h3>
            <p className="text-muted-foreground text-lg">
              Comprehensive features designed to transform public transportation 
              in small cities across Punjab.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card hover:shadow-primary transition-all duration-300 border-0">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">
                  Our Mission: Connecting Punjab's Cities
                </h3>
                <p className="text-muted-foreground text-lg mb-6">
                  Raahi bridges the digital gap in public transportation for small cities 
                  and tier-2 towns across Punjab. We provide real-time tracking solutions 
                  that work efficiently even in low-bandwidth environments.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                      <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Reduce Wait Times</h4>
                      <p className="text-muted-foreground">Accurate arrival predictions help commuters plan better</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                      <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Optimize Routes</h4>
                      <p className="text-muted-foreground">Smart algorithms find the best paths for every journey</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                      <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Empower Authorities</h4>
                      <p className="text-muted-foreground">Comprehensive analytics for better fleet management</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-hero rounded-full opacity-20 absolute -top-10 -right-10 animate-float" />
                <Card className="shadow-card relative z-10">
                  <CardContent className="p-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2">1000+</div>
                      <p className="text-muted-foreground mb-4">Buses Ready to Track</p>
                      <div className="text-4xl font-bold text-accent mb-2">50+</div>
                      <p className="text-muted-foreground mb-4">Cities Across Punjab</p>
                      <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                      <p className="text-muted-foreground">Real-Time Monitoring</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-primary-foreground mb-6">
              Ready to Transform Your Commute?
            </h3>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Join thousands of commuters and transport authorities already using Raahi 
              to make public transport more efficient and reliable.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate('/login')}
              className="text-lg px-8 py-6"
            >
              Start Your Journey
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-card/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <img src={busIcon} alt="Raahi Logo" className="w-8 h-8" />
              <span className="text-lg font-semibold">Raahi</span>
            </div>
            <div className="text-muted-foreground text-center md:text-right">
              <p>© 2024 Raahi. Connecting Punjab's Cities.</p>
              <p className="text-sm mt-1">Built for small cities, designed for growth.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;