import React from 'react';
import { useTranslation } from 'react-i18next';
import { Car } from 'lucide-react';
import { AppProvider } from './context/AppContext';
import CarInput from './components/CarInput';
import CommonParameters from './components/CommonParameters';
import Settings from './components/Settings';
import Results from './components/Results';
import './i18n/i18n';

const AppContent = () => {
  const { t } = useTranslation();

  return (
    <div className="container">
      <div className="header">
        <h1>
          <Car size={48} style={{ marginRight: '16px', verticalAlign: 'middle' }} />
          {t('app.title')}
        </h1>
        <p>{t('app.subtitle')}</p>
      </div>

      <div className="grid">
        <CarInput carNumber={1} isElectric={true} />
        <CarInput carNumber={2} isElectric={false} />
        <CommonParameters />
        <Settings />
      </div>

      <Results />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App; 