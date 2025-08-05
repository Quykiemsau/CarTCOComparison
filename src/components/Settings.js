import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/AppContext';
import { Settings as SettingsIcon, Globe, DollarSign } from 'lucide-react';

const Settings = () => {
  const { t, i18n } = useTranslation();
  const { state, setLanguage, setCountry } = useAppContext();

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  const countries = [
    { code: 'US', name: t('countries.US'), flag: '🇺🇸' },
    { code: 'VN', name: t('countries.VN'), flag: '🇻🇳' },
    { code: 'CA', name: t('countries.CA'), flag: '🇨🇦' },
    { code: 'AU', name: t('countries.AU'), flag: '🇦🇺' },
    { code: 'GB', name: t('countries.GB'), flag: '🇬🇧' },
    { code: 'DE', name: t('countries.DE'), flag: '🇩🇪' },
    { code: 'FR', name: t('countries.FR'), flag: '🇫🇷' },
    { code: 'JP', name: t('countries.JP'), flag: '🇯🇵' }
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' }
  ];

  return (
    <div className="card">
      <h2>
        <SettingsIcon style={{ marginRight: '8px', color: '#667eea' }} />
        {t('settings.title')}
      </h2>
      
      <div className="settings-grid">
        <div className="input-group">
          <label>
            <Globe size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
            {t('settings.language')}
          </label>
          <select
            value={state.language}
            onChange={(e) => handleLanguageChange(e.target.value)}
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>
            <Globe size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
            {t('settings.country')}
          </label>
          <select
            value={state.country}
            onChange={(e) => setCountry(e.target.value)}
          >
            {countries.map(country => (
              <option key={country.code} value={country.code}>
                {country.flag} {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>
            <DollarSign size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
            {t('settings.currency')}
          </label>
          <input
            type="text"
            value={state.currency}
            disabled
            style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;