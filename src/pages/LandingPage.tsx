import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Search, Shield, Users, BarChart3 } from "lucide-react";
import { InfiniteSlider } from "@/components/core/infinite-slider";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import busIcon from "@/assets/bus-icon.png";
import heroBg from "@/assets/hero-bg.jpg";

const LandingPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const features = [
    {
      icon: MapPin,
      title: t('feature.realTimeTracking'),
      description: t('feature.realTimeTrackingDesc')
    },
    {
      icon: Clock,
      title: t('feature.smartSchedules'),
      description: t('feature.smartSchedulesDesc')
    },
    {
      icon: Search,
      title: t('feature.routePlanning'),
      description: t('feature.routePlanningDesc')
    },
    {
      icon: Shield,
      title: t('feature.reliableService'),
      description: t('feature.reliableServiceDesc')
    },
    {
      icon: Users,
      title: t('feature.multiUser'),
      description: t('feature.multiUserDesc')
    },
    {
      icon: BarChart3,
      title: t('feature.fleetAnalytics'),
      description: t('feature.fleetAnalyticsDesc')
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
  <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50 animate-slide-in-down">
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
              variant="outline" 
              onClick={() => navigate('/login')}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
            >
              {t('header.login')}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
  <section className="relative py-20 overflow-hidden animate-zoom-in">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
              {t('landing.title').split('Small Cities').map((part, index) => (
                index === 0 ? (
                  <span key={index}>{part}</span>
                ) : (
                  <span key={index} className="inline-block animate-shimmer bg-gradient-hero bg-clip-text text-transparent" style={{backgroundSize:'200% 100%',backgroundImage:'var(--gradient-hero)'}}>
                    Small Cities
                    {part}
                  </span>
                )
              ))}
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay:'0.2s'}}>
              {t('landing.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{animationDelay:'0.4s'}}>
              <Button 
                size="lg" 
                variant="hero"
                onClick={() => navigate('/login')}
                className="text-lg px-8 py-6 transition-all duration-300 hover:scale-110 hover:shadow-primary"
              >
                {t('landing.getStarted')}
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:shadow-primary"
              >
                {t('landing.learnMore')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-16 animate-fade-in">
            <h3 className="text-3xl font-bold mb-4">
              {t('landing.featuresTitle')}
            </h3>
            <p className="text-muted-foreground text-lg">
              {t('landing.featuresSubtitle')}
            </p>
          </div>

          {/* Features Slider Section */}
          <div className="mb-16">
            <InfiniteSlider speedOnHover={8} gap={32}>
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center min-w-[260px] max-w-xs mx-4 p-6 bg-card rounded-xl shadow-card border-0 group hover:scale-110 hover:shadow-primary transition-all duration-300 animate-zoom-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4 group-hover:animate-bounce-in animate-float">
                    <feature.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h4 className="text-xl font-semibold mb-3 text-center animate-fade-in-up" style={{animationDelay:'0.2s'}}>{feature.title}</h4>
                  <p className="text-muted-foreground text-center animate-fade-in-up" style={{animationDelay:'0.3s'}}>{feature.description}</p>
                </div>
              ))}
            </InfiniteSlider>
          </div>
        </div>
      </section>

      {/* Mission Section */}
  <section className="py-20 animate-fade-in-up">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-in-left">
                <h3 className="text-3xl font-bold mb-6">
                  {t('mission.title')}
                </h3>
                <p className="text-muted-foreground text-lg mb-6">
                  {t('mission.description')}
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 animate-fade-in animate-stagger-1">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                      <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{t('mission.reduceWaitTimes')}</h4>
                      <p className="text-muted-foreground">{t('mission.reduceWaitTimesDesc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 animate-fade-in animate-stagger-2">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                      <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{t('mission.optimizeRoutes')}</h4>
                      <p className="text-muted-foreground">{t('mission.optimizeRoutesDesc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 animate-fade-in animate-stagger-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                      <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{t('mission.empowerAuthorities')}</h4>
                      <p className="text-muted-foreground">{t('mission.empowerAuthoritiesDesc')}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative animate-slide-in-right">
                <div className="w-80 h-80 bg-gradient-hero rounded-full opacity-20 absolute -top-10 -right-10 animate-float" />
                <Card className="shadow-card relative z-10 animate-scale-in">
                  <CardContent className="p-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2 animate-bounce-in">1000+</div>
                      <p className="text-muted-foreground mb-4">{t('stats.busesReady')}</p>
                      <div className="text-4xl font-bold text-accent mb-2 animate-bounce-in animate-stagger-1">50+</div>
                      <p className="text-muted-foreground mb-4">{t('stats.cities')}</p>
                      <div className="text-4xl font-bold text-primary mb-2 animate-bounce-in animate-stagger-2">24/7</div>
                      <p className="text-muted-foreground">{t('stats.monitoring')}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
  <section className="py-20 bg-gradient-hero animate-zoom-in">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto animate-scale-in">
            <h3 className="text-3xl font-bold text-primary-foreground mb-6">
              {t('cta.title')}
            </h3>
            <p className="text-primary-foreground/80 text-lg mb-8">
              {t('cta.description')}
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate('/login')}
              className="text-lg px-8 py-6 transition-all duration-300 hover:scale-105"
            >
              {t('cta.startJourney')}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
  <footer className="py-12 border-t bg-card/50 animate-fade-in-up">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0 animate-slide-in-left">
              <img src={busIcon} alt="Raahi Logo" className="w-8 h-8" />
              <span className="text-lg font-semibold">Raahi</span>
            </div>
            <div className="text-muted-foreground text-center md:text-right animate-slide-in-right">
              <p>{t('footer.copyright')}</p>
              <p className="text-sm mt-1">{t('footer.tagline')}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;