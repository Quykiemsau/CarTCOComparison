import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/AppContext';
import { TrendingUp } from 'lucide-react';

const CommonParameters = () => {
  const { t } = useTranslation();
  const { state, updateField } = useAppContext();

  const handleInputChange = (field, value) => {
    updateField(field, value);
  };

  return (
    <div className="card">
      <h2>
        <TrendingUp style={{ marginRight: '8px', color: '#667eea' }} />
        {t('common.parameters')}
      </h2>
      
      <div className="input-group">
        <label>{t('common.yearsOfOwnership')} ({t('units.years')})</label>
        <input
          type="number"
          min="1"
          max="30"
          value={state.yearsOfOwnership}
          onChange={(e) => handleInputChange('yearsOfOwnership', e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>{t('common.annualKm')} ({t('units.km')})</label>
        <input
          type="number"
          min="1000"
          max="100000"
          value={state.annualKm}
          onChange={(e) => handleInputChange('annualKm', e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>{t('common.inflationRate')} ({t('units.percent')})</label>
        <input
          type="number"
          step="0.001"
          min="0"
          max="0.2"
          value={state.inflationRate}
          onChange={(e) => handleInputChange('inflationRate', e.target.value)}
        />
      </div>
    </div>
  );
};

export default CommonParameters;