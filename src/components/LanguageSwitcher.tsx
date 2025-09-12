import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage, Language } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en' as Language, name: 'English', native: 'English' },
    { code: 'hi' as Language, name: 'Hindi', native: 'हिन्दी' },
    { code: 'pa' as Language, name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { code: 'mr' as Language, name: 'Marathi', native: 'मराठी' }
  ];

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
        <SelectTrigger className="w-auto min-w-[120px] border-0 bg-transparent hover:bg-accent/50 focus:ring-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              <div className="flex items-center gap-2">
                <span className="font-medium">{lang.native}</span>
                <span className="text-xs text-muted-foreground">({lang.name})</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSwitcher;