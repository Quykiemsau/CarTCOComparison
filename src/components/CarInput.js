import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/AppContext';
import { Zap, Fuel, Battery } from 'lucide-react';

const CarInput = ({ carNumber, isElectric }) => {
  const { t } = useTranslation();
  const { state, updateField } = useAppContext();

  const carPrefix = `car${carNumber}`;
  const carType = isElectric ? 'electric' : 'gasoline';
  const carName = state[`${carPrefix}Name`];

  const handleInputChange = (field, value) => {
    updateField(field, value);
  };

  const Icon = isElectric ? Zap : Fuel;
  const iconColor = isElectric ? '#4ade80' : '#f59e0b';

  return (
    <div className="card">
      <h2>
        <Icon style={{ marginRight: '8px', color: iconColor }} />
        {carName} ({t(`car.${carType}`)})
      </h2>
      
      <div className="input-group">
        <label>{t('car.name')}</label>
        <input
          type="text"
          value={carName}
          onChange={(e) => handleInputChange(`${carPrefix}Name`, e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>{t('car.purchasePrice')} ({t('units.currency')})</label>
        <input
          type="number"
          value={state[`${carPrefix}Price`]}
          onChange={(e) => handleInputChange(`${carPrefix}Price`, e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>
          {t('car.efficiency')} ({isElectric ? t('car.efficiencyElectric') : t('car.efficiencyGasoline')})
        </label>
        <input
          type="number"
          step="0.1"
          value={state[`${carPrefix}Efficiency`]}
          onChange={(e) => handleInputChange(`${carPrefix}Efficiency`, e.target.value)}
        />
      </div>

      {isElectric ? (
        <div className="input-group">
          <label>{t('car.electricityRate')} ({t('units.currency')}/{t('units.kwh')})</label>
          <input
            type="number"
            step="0.01"
            value={state[`${carPrefix}ElectricityRate`]}
            onChange={(e) => handleInputChange(`${carPrefix}ElectricityRate`, e.target.value)}
          />
        </div>
      ) : (
        <div className="input-group">
          <label>{t('car.fuelPrice')} ({t('units.currency')}/{t('units.liter')})</label>
          <input
            type="number"
            step="0.01"
            value={state[`${carPrefix}GasPrice`]}
            onChange={(e) => handleInputChange(`${carPrefix}GasPrice`, e.target.value)}
          />
        </div>
      )}

      <div className="input-group">
        <label>{t('car.maintenanceCost')} ({t('units.currency')}/{t('units.km')})</label>
        <input
          type="number"
          step="0.001"
          value={state[`${carPrefix}Maintenance`]}
          onChange={(e) => handleInputChange(`${carPrefix}Maintenance`, e.target.value)}
        />
      </div>

      {isElectric && (
        <>
          <div className="input-group">
            <label>
              <Battery size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
              {t('car.batteryCost')} ({t('units.currency')})
            </label>
            <input
              type="number"
              value={state[`${carPrefix}BatteryCost`]}
              onChange={(e) => handleInputChange(`${carPrefix}BatteryCost`, e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>{t('car.batteryLifespan')} ({t('units.km')})</label>
            <input
              type="number"
              value={state[`${carPrefix}BatteryLifespan`]}
              onChange={(e) => handleInputChange(`${carPrefix}BatteryLifespan`, e.target.value)}
            />
          </div>
        </>
      )}

      <div className="input-group">
        <label>{t('car.annualInsurance')} ({t('units.currency')})</label>
        <input
          type="number"
          value={state[`${carPrefix}Insurance`]}
          onChange={(e) => handleInputChange(`${carPrefix}Insurance`, e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>
          {t('car.resaleValue')} ({t('units.percent')}) {t('car.resaleValueSuffix', { years: state.yearsOfOwnership })}
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          max="1"
          value={state[`${carPrefix}ResaleValue`]}
          onChange={(e) => handleInputChange(`${carPrefix}ResaleValue`, e.target.value)}
        />
      </div>
    </div>
  );
};

export default CarInput;