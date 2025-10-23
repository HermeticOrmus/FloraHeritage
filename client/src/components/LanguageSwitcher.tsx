import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

const languages = [
  {
    code: 'en',
    label: 'EN',
    name: 'English'
  },
  {
    code: 'es',
    label: 'ES',
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
      size="sm"
      onClick={toggleLanguage}
      className="hover-elevate font-serif font-semibold min-w-[3rem]"
      data-testid="button-language-switch"
      title={`Switch to ${otherLanguage.name}`}
    >
      <span className="text-sm tracking-wide" aria-label={`Current language: ${currentLanguage.name}`}>
        {currentLanguage.label}
      </span>
    </Button>
  );
}
