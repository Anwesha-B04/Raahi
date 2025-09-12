import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import busIcon from "@/assets/bus-icon.png";

const LoginSelection = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const userTypes = [
    {
      id: "commuter",
      title: t('login.commuter'),
      description: t('login.commuterDesc'),
      icon: Users,
      features: ["Live bus tracking", "Route planning", "Bus schedules", "Real-time alerts"],
      route: "/dashboard/commuter"
    },
    {
      id: "lta",
      title: t('login.authority'),
      description: t('login.authorityDesc'),
      icon: Shield,
      features: ["Fleet monitoring", "Driver analytics", "Route optimization", "Performance reports"],
      route: "/dashboard/lta"
    },
    {
      id: "municipal",
      title: t('login.municipal'),
      description: t('login.municipalDesc'),
      icon: Building2,
      features: ["City-wide analytics", "Policy support", "Public reports", "Service quality metrics"],
      route: "/dashboard/municipal"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm animate-fade-in">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 animate-slide-in-left">
            <img src={busIcon} alt="Raahi Logo" className="w-10 h-10" />
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Raahi
            </h1>
          </div>
          <div className="flex items-center gap-4 animate-slide-in-right">
            <LanguageSwitcher />
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="transition-all duration-300 hover:scale-105"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">
              {t('login.title')}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('login.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {userTypes.map((userType, index) => (
              <Card 
                key={userType.id} 
                className={`shadow-card hover:shadow-primary transition-all duration-300 cursor-pointer group border-0 hover:scale-105 animate-scale-in animate-stagger-${index + 1}`}
                onClick={() => navigate(userType.route)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce-in">
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
                    className="w-full transition-all duration-300 hover:scale-105" 
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
        </div>
      </main>
    </div>
  );
};

export default LoginSelection;