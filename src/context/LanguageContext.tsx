import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi' | 'pa' | 'mr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations = {
  en: {
    // Header
    'header.login': 'Login',
    
    // Landing Page
    'landing.title': 'Smart Public Transport for Small Cities',
    'landing.subtitle': 'Real-time bus tracking, route planning, and efficient public transport management designed specifically for Punjab\'s growing cities.',
    'landing.getStarted': 'Get Started Today',
    'landing.learnMore': 'Learn More',
    'landing.featuresTitle': 'Everything You Need for Smart Transit',
    'landing.featuresSubtitle': 'Comprehensive features designed to transform public transportation in small cities across Punjab.',
    
    // Features
    'feature.realTimeTracking': 'Real-Time Tracking',
    'feature.realTimeTrackingDesc': 'Track buses live with GPS precision for accurate arrival times',
    'feature.smartSchedules': 'Smart Schedules',
    'feature.smartSchedulesDesc': 'View comprehensive timetables and plan your journey efficiently',
    'feature.routePlanning': 'Route Planning',
    'feature.routePlanningDesc': 'Find the best routes between any two points in the city',
    'feature.reliableService': 'Reliable Service',
    'feature.reliableServiceDesc': 'Built for small cities with optimized low-bandwidth performance',
    'feature.multiUser': 'Multi-User Platform',
    'feature.multiUserDesc': 'Designed for commuters, transport authorities, and municipal corporations',
    'feature.fleetAnalytics': 'Fleet Analytics',
    'feature.fleetAnalyticsDesc': 'Comprehensive monitoring and reporting for transport authorities',
    
    // Mission
    'mission.title': 'Our Mission: Connecting Punjab\'s Cities',
    'mission.description': 'Raahi bridges the digital gap in public transportation for small cities and tier-2 towns across Punjab. We provide real-time tracking solutions that work efficiently even in low-bandwidth environments.',
    'mission.reduceWaitTimes': 'Reduce Wait Times',
    'mission.reduceWaitTimesDesc': 'Accurate arrival predictions help commuters plan better',
    'mission.optimizeRoutes': 'Optimize Routes',
    'mission.optimizeRoutesDesc': 'Smart algorithms find the best paths for every journey',
    'mission.empowerAuthorities': 'Empower Authorities',
    'mission.empowerAuthoritiesDesc': 'Comprehensive analytics for better fleet management',
    
    // Stats
    'stats.busesReady': 'Buses Ready to Track',
    'stats.cities': 'Cities Across Punjab',
    'stats.monitoring': 'Real-Time Monitoring',
    
    // CTA
    'cta.title': 'Ready to Transform Your Commute?',
    'cta.description': 'Join thousands of commuters and transport authorities already using Raahi to make public transport more efficient and reliable.',
    'cta.startJourney': 'Start Your Journey',
    
    // Footer
    'footer.copyright': '© 2024 Raahi. Connecting Punjab\'s Cities.',
    'footer.tagline': 'Built for small cities, designed for growth.',
    
    // Dashboard
    'dashboard.track': 'Track',
    'dashboard.search': 'Search',
    'dashboard.routes': 'Routes',
    'dashboard.schedule': 'Schedule',
    'dashboard.liveTracking': 'Live Bus Tracking - Punjab',
    'dashboard.nearbyBuses': 'Nearby Buses',
    'dashboard.searchBuses': 'Search buses and routes...',
    'dashboard.routePlanner': 'Route Planner',
    'dashboard.from': 'From',
    'dashboard.to': 'To',
    'dashboard.savedRoutes': 'Saved Routes',
    'dashboard.busSchedules': 'Bus Timetables',
    'dashboard.logout': 'Logout',
    
    // Login
    'login.title': 'Choose Your Login Type',
    'login.subtitle': 'Select the option that best describes you to access the appropriate features.',
    'login.commuter': 'Commuter Login',
    'login.commuterDesc': 'Track buses, plan routes, and get real-time updates',
    'login.authority': 'Transport Authority',
    'login.authorityDesc': 'Manage fleet, view analytics, and monitor operations',
    'login.municipal': 'Municipal Corporation',
    'login.municipalDesc': 'Oversee city transport and access comprehensive reports'
  },
  
  hi: {
    // Header
    'header.login': 'लॉगिन',
    
    // Landing Page
    'landing.title': 'छोटे शहरों के लिए स्मार्ट सार्वजनिक परिवहन',
    'landing.subtitle': 'पंजाब के बढ़ते शहरों के लिए विशेष रूप से डिज़ाइन किया गया रियल-टाइम बस ट्रैकिंग, रूट प्लानिंग, और कुशल सार्वजनिक परिवहन प्रबंधन।',
    'landing.getStarted': 'आज ही शुरू करें',
    'landing.learnMore': 'और जानें',
    'landing.featuresTitle': 'स्मार्ट ट्रांजिट के लिए आपको जो कुछ भी चाहिए',
    'landing.featuresSubtitle': 'पंजाब के छोटे शहरों में सार्वजनिक परिवहन को बदलने के लिए डिज़ाइन की गई व्यापक सुविधाएं।',
    
    // Features
    'feature.realTimeTracking': 'रियल-टाइम ट्रैकिंग',
    'feature.realTimeTrackingDesc': 'सटीक आगमन समय के लिए GPS की सटीकता के साथ बसों को लाइव ट्रैक करें',
    'feature.smartSchedules': 'स्मार्ट शेड्यूल',
    'feature.smartSchedulesDesc': 'व्यापक समय सारणी देखें और अपनी यात्रा की कुशलता से योजना बनाएं',
    'feature.routePlanning': 'रूट प्लानिंग',
    'feature.routePlanningDesc': 'शहर में किसी भी दो बिंदुओं के बीच सबसे अच्छे रूट खोजें',
    'feature.reliableService': 'विश्वसनीय सेवा',
    'feature.reliableServiceDesc': 'कम बैंडविड्थ प्रदर्शन के साथ छोटे शहरों के लिए बनाया गया',
    'feature.multiUser': 'मल्टी-यूज़र प्लेटफॉर्म',
    'feature.multiUserDesc': 'यात्रियों, परिवहन अधिकारियों और नगर निगमों के लिए डिज़ाइन किया गया',
    'feature.fleetAnalytics': 'फ्लीट एनालिटिक्स',
    'feature.fleetAnalyticsDesc': 'परिवहन अधिकारियों के लिए व्यापक निगरानी और रिपोर्टिंग',
    
    // Mission
    'mission.title': 'हमारा मिशन: पंजाब के शहरों को जोड़ना',
    'mission.description': 'राही पंजाब के छोटे शहरों और टियर-2 कस्बों में सार्वजनिक परिवहन में डिजिटल अंतर को पाटता है। हम रियल-टाइम ट्रैकिंग समाधान प्रदान करते हैं जो कम बैंडविड्थ वातावरण में भी कुशलता से काम करते हैं।',
    'mission.reduceWaitTimes': 'प्रतीक्षा समय कम करें',
    'mission.reduceWaitTimesDesc': 'सटीक आगमन की भविष्यवाणी यात्रियों को बेहतर योजना बनाने में मदद करती है',
    'mission.optimizeRoutes': 'रूट्स का अनुकूलन',
    'mission.optimizeRoutesDesc': 'स्मार्ट एल्गोरिदम हर यात्रा के लिए सबसे अच्छे रास्ते खोजते हैं',
    'mission.empowerAuthorities': 'अधिकारियों को सशक्त बनाएं',
    'mission.empowerAuthoritiesDesc': 'बेहतर फ्लीट प्रबंधन के लिए व्यापक एनालिटिक्स',
    
    // Stats
    'stats.busesReady': 'बसें ट्रैक करने के लिए तैयार',
    'stats.cities': 'पंजाब में शहर',
    'stats.monitoring': 'रियल-टाइम निगरानी',
    
    // CTA
    'cta.title': 'अपने आवागमन को बदलने के लिए तैयार हैं?',
    'cta.description': 'हजारों यात्रियों और परिवहन अधिकारियों से जुड़ें जो पहले से ही राही का उपयोग करके सार्वजनिक परिवहन को अधिक कुशल और विश्वसनीय बना रहे हैं।',
    'cta.startJourney': 'अपनी यात्रा शुरू करें',
    
    // Footer
    'footer.copyright': '© 2024 राही। पंजाब के शहरों को जोड़ना।',
    'footer.tagline': 'छोटे शहरों के लिए बनाया गया, विकास के लिए डिज़ाइन किया गया।',
    
    // Dashboard
    'dashboard.track': 'ट्रैक',
    'dashboard.search': 'खोजें',
    'dashboard.routes': 'रूट्स',
    'dashboard.schedule': 'शेड्यूल',
    'dashboard.liveTracking': 'लाइव बस ट्रैकिंग - पंजाब',
    'dashboard.nearbyBuses': 'नजदीकी बसें',
    'dashboard.searchBuses': 'बसें और रूट्स खोजें...',
    'dashboard.routePlanner': 'रूट प्लानर',
    'dashboard.from': 'से',
    'dashboard.to': 'तक',
    'dashboard.savedRoutes': 'सेव किए गए रूट्स',
    'dashboard.busSchedules': 'बस समय सारणी',
    'dashboard.logout': 'लॉगआउट',
    
    // Login
    'login.title': 'अपना लॉगिन प्रकार चुनें',
    'login.subtitle': 'उपयुक्त सुविधाओं तक पहुंचने के लिए उस विकल्प का चयन करें जो आपका सबसे अच्छा वर्णन करता है।',
    'login.commuter': 'यात्री लॉगिन',
    'login.commuterDesc': 'बसों को ट्रैक करें, रूट्स की योजना बनाएं, और रियल-टाइम अपडेट प्राप्त करें',
    'login.authority': 'परिवहन प्राधिकरण',
    'login.authorityDesc': 'फ्लीट का प्रबंधन करें, एनालिटिक्स देखें, और संचालन की निगरानी करें',
    'login.municipal': 'नगर निगम',
    'login.municipalDesc': 'शहर के परिवहन की देखरेख करें और व्यापक रिपोर्ट तक पहुंच प्राप्त करें'
  },
  
  pa: {
    // Header
    'header.login': 'ਲਾਗਇਨ',
    
    // Landing Page
    'landing.title': 'ਛੋਟੇ ਸ਼ਹਿਰਾਂ ਲਈ ਸਮਾਰਟ ਜਨਤਕ ਆਵਾਜਾਈ',
    'landing.subtitle': 'ਪੰਜਾਬ ਦੇ ਵਧ ਰਹੇ ਸ਼ਹਿਰਾਂ ਲਈ ਖਾਸ ਤੌਰ \'ਤੇ ਡਿਜ਼ਾਇਨ ਕੀਤੀ ਗਈ ਰੀਅਲ-ਟਾਈਮ ਬੱਸ ਟਰੈਕਿੰਗ, ਰੂਟ ਪਲਾਨਿੰਗ, ਅਤੇ ਕੁਸ਼ਲ ਜਨਤਕ ਆਵਾਜਾਈ ਪ੍ਰਬੰਧਨ।',
    'landing.getStarted': 'ਅੱਜ ਹੀ ਸ਼ੁਰੂ ਕਰੋ',
    'landing.learnMore': 'ਹੋਰ ਜਾਣੋ',
    'landing.featuresTitle': 'ਸਮਾਰਟ ਟਰਾਂਜ਼ਿਟ ਲਈ ਤੁਹਾਨੂੰ ਜੋ ਕੁਝ ਚਾਹੀਦਾ ਹੈ',
    'landing.featuresSubtitle': 'ਪੰਜਾਬ ਦੇ ਛੋਟੇ ਸ਼ਹਿਰਾਂ ਵਿੱਚ ਜਨਤਕ ਆਵਾਜਾਈ ਨੂੰ ਬਦਲਣ ਲਈ ਡਿਜ਼ਾਇਨ ਕੀਤੇ ਗਏ ਵਿਆਪਕ ਫੀਚਰ।',
    
    // Features
    'feature.realTimeTracking': 'ਰੀਅਲ-ਟਾਈਮ ਟਰੈਕਿੰਗ',
    'feature.realTimeTrackingDesc': 'ਸਟੀਕ ਪਹੁੰਚਣ ਦੇ ਸਮੇਂ ਲਈ GPS ਦੀ ਸਟੀਕਤਾ ਨਾਲ ਬੱਸਾਂ ਨੂੰ ਲਾਈਵ ਟਰੈਕ ਕਰੋ',
    'feature.smartSchedules': 'ਸਮਾਰਟ ਸਮਾਂ-ਸਾਰਣੀ',
    'feature.smartSchedulesDesc': 'ਵਿਆਪਕ ਸਮਾਂ-ਸਾਰਣੀ ਦੇਖੋ ਅਤੇ ਆਪਣੀ ਯਾਤਰਾ ਦੀ ਕੁਸ਼ਲਤਾ ਨਾਲ ਯੋਜਨਾ ਬਣਾਓ',
    'feature.routePlanning': 'ਰੂਟ ਪਲਾਨਿੰਗ',
    'feature.routePlanningDesc': 'ਸ਼ਹਿਰ ਵਿੱਚ ਕਿਸੇ ਵੀ ਦੋ ਬਿੰਦੂਆਂ ਵਿਚਕਾਰ ਸਭ ਤੋਂ ਵਧੀਆ ਰੂਟ ਲੱਭੋ',
    'feature.reliableService': 'ਭਰੋਸੇਮੰਦ ਸੇਵਾ',
    'feature.reliableServiceDesc': 'ਘੱਟ ਬੈਂਡਵਿਡਥ ਪ੍ਰਦਰਸ਼ਨ ਦੇ ਨਾਲ ਛੋਟੇ ਸ਼ਹਿਰਾਂ ਲਈ ਬਣਾਇਆ ਗਿਆ',
    'feature.multiUser': 'ਮਲਟੀ-ਯੂਜ਼ਰ ਪਲੇਟਫਾਰਮ',
    'feature.multiUserDesc': 'ਯਾਤਰੀਆਂ, ਆਵਾਜਾਈ ਅਧਿਕਾਰੀਆਂ ਅਤੇ ਨਗਰ ਨਿਗਮ ਲਈ ਡਿਜ਼ਾਇਨ ਕੀਤਾ ਗਿਆ',
    'feature.fleetAnalytics': 'ਫਲੀਟ ਐਨਾਲਿਟਿਕਸ',
    'feature.fleetAnalyticsDesc': 'ਆਵਾਜਾਈ ਅਧਿਕਾਰੀਆਂ ਲਈ ਵਿਆਪਕ ਨਿਗਰਾਨੀ ਅਤੇ ਰਿਪੋਰਟਿੰਗ',
    
    // Mission
    'mission.title': 'ਸਾਡਾ ਮਿਸ਼ਨ: ਪੰਜਾਬ ਦੇ ਸ਼ਹਿਰਾਂ ਨੂੰ ਜੋੜਨਾ',
    'mission.description': 'ਰਾਹੀ ਪੰਜਾਬ ਦੇ ਛੋਟੇ ਸ਼ਹਿਰਾਂ ਅਤੇ ਟਿਅਰ-2 ਕਸਬਿਆਂ ਵਿੱਚ ਜਨਤਕ ਆਵਾਜਾਈ ਵਿੱਚ ਡਿਜੀਟਲ ਅੰਤਰ ਨੂੰ ਪਾਟਦਾ ਹੈ। ਅਸੀਂ ਰੀਅਲ-ਟਾਈਮ ਟਰੈਕਿੰਗ ਹੱਲ ਪ੍ਰਦਾਨ ਕਰਦੇ ਹਾਂ ਜੋ ਘੱਟ ਬੈਂਡਵਿਡਥ ਵਾਤਾਵਰਨ ਵਿੱਚ ਵੀ ਕੁਸ਼ਲਤਾ ਨਾਲ ਕੰਮ ਕਰਦੇ ਹਨ।',
    'mission.reduceWaitTimes': 'ਉਡੀਕ ਦਾ ਸਮਾਂ ਘਟਾਓ',
    'mission.reduceWaitTimesDesc': 'ਸਟੀਕ ਪਹੁੰਚਣ ਦੀ ਭਵਿੱਖਬਾਣੀ ਯਾਤਰੀਆਂ ਨੂੰ ਬਿਹਤਰ ਯੋਜਨਾ ਬਣਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰਦੀ ਹੈ',
    'mission.optimizeRoutes': 'ਰੂਟਾਂ ਦਾ ਅਨੁਕੂਲਨ',
    'mission.optimizeRoutesDesc': 'ਸਮਾਰਟ ਐਲਗੋਰਿਦਮ ਹਰ ਯਾਤਰਾ ਲਈ ਸਭ ਤੋਂ ਵਧੀਆ ਰਸਤੇ ਲੱਭਦੇ ਹਨ',
    'mission.empowerAuthorities': 'ਅਧਿਕਾਰੀਆਂ ਨੂੰ ਸ਼ਕਤੀ ਪ੍ਰਦਾਨ ਕਰੋ',
    'mission.empowerAuthoritiesDesc': 'ਬਿਹਤਰ ਫਲੀਟ ਪ੍ਰਬੰਧਨ ਲਈ ਵਿਆਪਕ ਐਨਾਲਿਟਿਕਸ',
    
    // Stats
    'stats.busesReady': 'ਬੱਸਾਂ ਟਰੈਕ ਕਰਨ ਲਈ ਤਿਆਰ',
    'stats.cities': 'ਪੰਜਾਬ ਵਿੱਚ ਸ਼ਹਿਰ',
    'stats.monitoring': 'ਰੀਅਲ-ਟਾਈਮ ਨਿਗਰਾਨੀ',
    
    // CTA
    'cta.title': 'ਆਪਣੀ ਯਾਤਰਾ ਨੂੰ ਬਦਲਣ ਲਈ ਤਿਆਰ ਹੋ?',
    'cta.description': 'ਹਜ਼ਾਰਾਂ ਯਾਤਰੀਆਂ ਅਤੇ ਆਵਾਜਾਈ ਅਧਿਕਾਰੀਆਂ ਨਾਲ ਜੁੜੋ ਜੋ ਪਹਿਲਾਂ ਤੋਂ ਹੀ ਰਾਹੀ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਜਨਤਕ ਆਵਾਜਾਈ ਨੂੰ ਵਧੇਰੇ ਕੁਸ਼ਲ ਅਤੇ ਭਰੋਸੇਯੋਗ ਬਣਾ ਰਹੇ ਹਨ।',
    'cta.startJourney': 'ਆਪਣੀ ਯਾਤਰਾ ਸ਼ੁਰੂ ਕਰੋ',
    
    // Footer
    'footer.copyright': '© 2024 ਰਾਹੀ। ਪੰਜਾਬ ਦੇ ਸ਼ਹਿਰਾਂ ਨੂੰ ਜੋੜਨਾ।',
    'footer.tagline': 'ਛੋਟੇ ਸ਼ਹਿਰਾਂ ਲਈ ਬਣਾਇਆ ਗਿਆ, ਵਿਕਾਸ ਲਈ ਡਿਜ਼ਾਇਨ ਕੀਤਾ ਗਿਆ।',
    
    // Dashboard
    'dashboard.track': 'ਟਰੈਕ',
    'dashboard.search': 'ਖੋਜ',
    'dashboard.routes': 'ਰੂਟ',
    'dashboard.schedule': 'ਸ਼ੈਡਿਊਲ',
    'dashboard.liveTracking': 'ਲਾਈਵ ਬੱਸ ਟਰੈਕਿੰਗ - ਪੰਜਾਬ',
    'dashboard.nearbyBuses': 'ਨਜ਼ਦੀਕੀ ਬੱਸਾਂ',
    'dashboard.searchBuses': 'ਬੱਸਾਂ ਅਤੇ ਰੂਟ ਖੋਜੋ...',
    'dashboard.routePlanner': 'ਰੂਟ ਪਲਾਨਰ',
    'dashboard.from': 'ਤੋਂ',
    'dashboard.to': 'ਤੱਕ',
    'dashboard.savedRoutes': 'ਸੇਵ ਕੀਤੇ ਰੂਟ',
    'dashboard.busSchedules': 'ਬੱਸ ਸਮਾਂ-ਸਾਰਣੀ',
    'dashboard.logout': 'ਲਾਗਆਉਟ',
    
    // Login
    'login.title': 'ਆਪਣਾ ਲਾਗਇਨ ਕਿਸਮ ਚੁਣੋ',
    'login.subtitle': 'ਉਚਿਤ ਫੀਚਰਾਂ ਤੱਕ ਪਹੁੰਚ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਉਸ ਵਿਕਲਪ ਦੀ ਚੋਣ ਕਰੋ ਜੋ ਤੁਹਾਡਾ ਸਭ ਤੋਂ ਵਧੀਆ ਵਰਣਨ ਕਰਦਾ ਹੈ।',
    'login.commuter': 'ਯਾਤਰੀ ਲਾਗਇਨ',
    'login.commuterDesc': 'ਬੱਸਾਂ ਨੂੰ ਟਰੈਕ ਕਰੋ, ਰੂਟਾਂ ਦੀ ਯੋਜਨਾ ਬਣਾਓ, ਅਤੇ ਰੀਅਲ-ਟਾਈਮ ਅਪਡੇਟ ਪ੍ਰਾਪਤ ਕਰੋ',
    'login.authority': 'ਆਵਾਜਾਈ ਅਥਾਰਟੀ',
    'login.authorityDesc': 'ਫਲੀਟ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰੋ, ਐਨਾਲਿਟਿਕਸ ਦੇਖੋ, ਅਤੇ ਓਪਰੇਸ਼ਨਾਂ ਦੀ ਨਿਗਰਾਨੀ ਕਰੋ',
    'login.municipal': 'ਨਗਰ ਨਿਗਮ',
    'login.municipalDesc': 'ਸ਼ਹਿਰ ਦੀ ਆਵਾਜਾਈ ਦੀ ਨਿਗਰਾਨੀ ਕਰੋ ਅਤੇ ਵਿਆਪਕ ਰਿਪੋਰਟਾਂ ਤੱਕ ਪਹੁੰਚ ਪ੍ਰਾਪਤ ਕਰੋ'
  },
  
  mr: {
    // Header
    'header.login': 'लॉगिन',
    
    // Landing Page
    'landing.title': 'छोट्या शहरांसाठी स्मार्ट सार्वजनिक वाहतूक',
    'landing.subtitle': 'पंजाबच्या वाढत्या शहरांसाठी विशेषतः डिझाइन केलेले रिअल-टाइम बस ट्रॅकिंग, रूट प्लॅनिंग आणि कार्यक्षम सार्वजनिक वाहतूक व्यवस्थापन.',
    'landing.getStarted': 'आजच सुरुवात करा',
    'landing.learnMore': 'अधिक जाणून घ्या',
    'landing.featuresTitle': 'स्मार्ट ट्रान्झिटसाठी तुम्हाला जे काही हवे',
    'landing.featuresSubtitle': 'पंजाबमधील छोट्या शहरांमध्ये सार्वजनिक वाहतुकीत बदल घडवण्यासाठी डिझाइन केलेली सर्वसमावेशक वैशिष्ट्ये.',
    
    // Features
    'feature.realTimeTracking': 'रिअल-टाइम ट्रॅकिंग',
    'feature.realTimeTrackingDesc': 'अचूक आगमन वेळेसाठी GPS अचूकतेसह बसेस लाइव्ह ट्रॅक करा',
    'feature.smartSchedules': 'स्मार्ट वेळापत्रक',
    'feature.smartSchedulesDesc': 'सर्वसमावेशक वेळापत्रक पहा आणि तुमच्या प्रवासाची कार्यक्षमतेने योजना करा',
    'feature.routePlanning': 'रूट प्लॅनिंग',
    'feature.routePlanningDesc': 'शहरातील कोणत्याही दोन बिंदूंदरम्यान सर्वोत्तम मार्ग शोधा',
    'feature.reliableService': 'विश्वसनीय सेवा',
    'feature.reliableServiceDesc': 'कमी बँडविड्थ कामगिरीसह छोट्या शहरांसाठी तयार केले गेले',
    'feature.multiUser': 'मल्टी-यूझर प्लॅटफॉर्म',
    'feature.multiUserDesc': 'प्रवासी, वाहतूक अधिकारी आणि महानगरपालिकांसाठी डिझाइन केले गेले',
    'feature.fleetAnalytics': 'फ्लीट अॅनालिटिक्स',
    'feature.fleetAnalyticsDesc': 'वाहतूक अधिकाऱ्यांसाठी सर्वसमावेशक निरीक्षण आणि अहवाल',
    
    // Mission
    'mission.title': 'आमचे ध्येय: पंजाबची शहरे जोडणे',
    'mission.description': 'राही पंजाबमधील छोट्या शहरे आणि टियर-2 शहरांमध्ये सार्वजनिक वाहतुकीतील डिजिटल अंतर भरून काढते. आम्ही रिअल-टाइम ट्रॅकिंग समाधाने प्रदान करतो जी कमी बँडविड्थ वातावरणातही कार्यक्षमतेने कार्य करतात.',
    'mission.reduceWaitTimes': 'प्रतीक्षा वेळ कमी करा',
    'mission.reduceWaitTimesDesc': 'अचूक आगमन अंदाज प्रवाशांना चांगली योजना करण्यास मदत करतात',
    'mission.optimizeRoutes': 'मार्गांचे अनुकूलन',
    'mission.optimizeRoutesDesc': 'स्मार्ट अल्गोरिदम प्रत्येक प्रवासासाठी सर्वोत्तम मार्ग शोधतात',
    'mission.empowerAuthorities': 'अधिकाऱ्यांना सक्षम करा',
    'mission.empowerAuthoritiesDesc': 'चांगल्या फ्लीट व्यवस्थापनासाठी सर्वसमावेशक अॅनालिटिक्स',
    
    // Stats
    'stats.busesReady': 'बसेस ट्रॅक करण्यासाठी तयार',
    'stats.cities': 'पंजाबमधील शहरे',
    'stats.monitoring': 'रिअल-टाइम निरीक्षण',
    
    // CTA
    'cta.title': 'तुमच्या प्रवासात बदल घडवण्यासाठी तयार आहात?',
    'cta.description': 'हजारो प्रवासी आणि वाहतूक अधिकाऱ्यांसोबत सामील व्हा जे आधीच राहीचा वापर करून सार्वजनिक वाहतूक अधिक कार्यक्षम आणि विश्वसनीय बनवत आहेत.',
    'cta.startJourney': 'तुमचा प्रवास सुरू करा',
    
    // Footer
    'footer.copyright': '© 2024 राही. पंजाबची शहरे जोडणे.',
    'footer.tagline': 'छोट्या शहरांसाठी तयार केले गेले, वृद्धीसाठी डिझाइन केले गेले.',
    
    // Dashboard
    'dashboard.track': 'ट्रॅक',
    'dashboard.search': 'शोधा',
    'dashboard.routes': 'मार्ग',
    'dashboard.schedule': 'वेळापत्रक',
    'dashboard.liveTracking': 'लाइव्ह बस ट्रॅकिंग - पंजाब',
    'dashboard.nearbyBuses': 'जवळच्या बसेस',
    'dashboard.searchBuses': 'बसेस आणि मार्ग शोधा...',
    'dashboard.routePlanner': 'रूट प्लॅनर',
    'dashboard.from': 'कडून',
    'dashboard.to': 'पर्यंत',
    'dashboard.savedRoutes': 'जतन केलेले मार्ग',
    'dashboard.busSchedules': 'बस वेळापत्रक',
    'dashboard.logout': 'लॉगआउट',
    
    // Login
    'login.title': 'तुमचा लॉगिन प्रकार निवडा',
    'login.subtitle': 'योग्य वैशिष्ट्यांमध्ये प्रवेशासाठी तुमचे सर्वोत्तम वर्णन करणारा पर्याय निवडा.',
    'login.commuter': 'प्रवासी लॉगिन',
    'login.commuterDesc': 'बसेस ट्रॅक करा, मार्गांची योजना करा आणि रिअल-टाइम अपडेट्स मिळवा',
    'login.authority': 'वाहतूक प्राधिकरण',
    'login.authorityDesc': 'फ्लीटचे व्यवस्थापन करा, अॅनालिटिक्स पहा आणि ऑपरेशन्सचे निरीक्षण करा',
    'login.municipal': 'महानगरपालिका',
    'login.municipalDesc': 'शहरी वाहतुकीचे निरीक्षण करा आणि सर्वसमावेशक अहवालांमध्ये प्रवेश मिळवा'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('preferred-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('preferred-language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};