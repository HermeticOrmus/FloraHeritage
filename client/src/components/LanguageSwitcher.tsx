import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

const languages = [
  {
    code: 'en',
    flag: '🇺🇸',
    name: 'English'
  },
  {
    code: 'es',
    flag: '🇪🇸',
    name: 'Español'
  }
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  // Extract just the language code (e.g., "en" from "en-US")
  const currentLangCode = i18n.language.split('-')[0];

  const toggleLanguage = () => {
    const newLang = currentLangCode === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  const currentLanguage = languages.find(lang => lang.code === currentLangCode) || languages[0];
  const otherLanguage = languages.find(lang => lang.code !== currentLangCode) || languages[1];

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      className="hover-elevate"
      data-testid="button-language-switch"
      title={`Switch to ${otherLanguage.name}`}
    >
      <span className="text-2xl" role="img" aria-label={`Current language: ${currentLanguage.name}`}>
        {currentLanguage.flag}
      </span>
    </Button>
  );
}
