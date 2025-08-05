import React from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useCalculations } from '../hooks/useCalculations';
import { formatCurrency } from '../utils/formatters';

const Results = () => {
  const { t, i18n } = useTranslation();
  const { state } = useAppContext();
  const { car1Result, car2Result, savings, savingsPercentage } = useCalculations();

  const locale = i18n.language === 'vi' ? 'vi-VN' : 'en-US';

  const chartData = [
    {
      name: state.car1Name,
      'Total Cost': Math.round(car1Result.totalCost),
      [t('results.breakdown.purchasePrice')]: Math.round(car1Result.breakdown.purchasePrice),
      [t('results.breakdown.fuelElectricity')]: Math.round(car1Result.breakdown.fuelCost),
      [t('results.breakdown.maintenance')]: Math.round(car1Result.breakdown.maintenanceCost),
      [t('results.breakdown.insurance')]: Math.round(car1Result.breakdown.insuranceCost),
      [t('results.breakdown.batteryReplacement')]: Math.round(car1Result.breakdown.batteryCost || 0),
      [t('results.breakdown.resaleValue')]: -Math.round(car1Result.breakdown.resaleValue)
    },
    {
      name: state.car2Name,
      'Total Cost': Math.round(car2Result.totalCost),
      [t('results.breakdown.purchasePrice')]: Math.round(car2Result.breakdown.purchasePrice),
      [t('results.breakdown.fuelElectricity')]: Math.round(car2Result.breakdown.fuelCost),
      [t('results.breakdown.maintenance')]: Math.round(car2Result.breakdown.maintenanceCost),
      [t('results.breakdown.insurance')]: Math.round(car2Result.breakdown.insuranceCost),
      [t('results.breakdown.batteryReplacement')]: 0,
      [t('results.breakdown.resaleValue')]: -Math.round(car2Result.breakdown.resaleValue)
    }
  ];

  const pieData1 = [
    { name: t('results.breakdown.purchasePrice'), value: car1Result.breakdown.purchasePrice, color: '#667eea' },
    { name: t('results.breakdown.fuelElectricity'), value: car1Result.breakdown.fuelCost, color: '#4ade80' },
    { name: t('results.breakdown.maintenance'), value: car1Result.breakdown.maintenanceCost, color: '#f59e0b' },
    { name: t('results.breakdown.insurance'), value: car1Result.breakdown.insuranceCost, color: '#ef4444' },
    ...(car1Result.breakdown.batteryCost > 0 ? [{ name: t('results.breakdown.batteryReplacement'), value: car1Result.breakdown.batteryCost, color: '#ff6b6b' }] : []),
    { name: t('results.breakdown.resaleValue'), value: -car1Result.breakdown.resaleValue, color: '#8b5cf6' }
  ];

  const pieData2 = [
    { name: t('results.breakdown.purchasePrice'), value: car2Result.breakdown.purchasePrice, color: '#667eea' },
    { name: t('results.breakdown.fuelElectricity'), value: car2Result.breakdown.fuelCost, color: '#4ade80' },
    { name: t('results.breakdown.maintenance'), value: car2Result.breakdown.maintenanceCost, color: '#f59e0b' },
    { name: t('results.breakdown.insurance'), value: car2Result.breakdown.insuranceCost, color: '#ef4444' },
    { name: t('results.breakdown.resaleValue'), value: -car2Result.breakdown.resaleValue, color: '#8b5cf6' }
  ];

  const formatTooltipValue = (value) => {
    return formatCurrency(value, state.currency, locale);
  };

  return (
    <>
      {/* Results Cards */}
      <div className="grid">
        <div className="result-card">
          <h3>{state.car1Name}</h3>
          <div className="amount">{formatCurrency(car1Result.totalCost, state.currency, locale)}</div>
          <div className="period">{t('results.totalCost', { years: state.yearsOfOwnership })}</div>
        </div>

        <div className="result-card">
          <h3>{state.car2Name}</h3>
          <div className="amount">{formatCurrency(car2Result.totalCost, state.currency, locale)}</div>
          <div className="period">{t('results.totalCost', { years: state.yearsOfOwnership })}</div>
        </div>
      </div>

      {/* Savings Card */}
      {savings > 0 && (
        <div className="savings">
          <h3>
            <DollarSign size={32} style={{ marginRight: '12px', verticalAlign: 'middle' }} />
            {t('results.savings', { 
              amount: formatCurrency(savings, state.currency, locale), 
              car: state.car1Name 
            })}
          </h3>
          <div className="amount">
            {t('results.savingsPercent', { 
              percent: savingsPercentage.toFixed(1), 
              car: state.car2Name 
            })}
          </div>
        </div>
      )}

      {/* Bar Chart */}
      <div className="chart-container">
        <h2>{t('results.costBreakdown')}</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={formatTooltipValue} />
            <Legend />
            <Bar dataKey={t('results.breakdown.purchasePrice')} fill="#667eea" />
            <Bar dataKey={t('results.breakdown.fuelElectricity')} fill="#4ade80" />
            <Bar dataKey={t('results.breakdown.maintenance')} fill="#f59e0b" />
            <Bar dataKey={t('results.breakdown.insurance')} fill="#ef4444" />
            <Bar dataKey={t('results.breakdown.batteryReplacement')} fill="#ff6b6b" />
            <Bar dataKey={t('results.breakdown.resaleValue')} fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Charts */}
      <div className="grid">
        <div className="chart-container">
          <h3>{state.car1Name} {t('results.costBreakdown')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData1}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${formatCurrency(value, state.currency, locale)}`}
              >
                {pieData1.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={formatTooltipValue} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>{state.car2Name} {t('results.costBreakdown')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData2}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${formatCurrency(value, state.currency, locale)}`}
              >
                {pieData2.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={formatTooltipValue} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default Results;