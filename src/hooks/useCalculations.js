import { useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { exchangeRates } from '../context/AppContext';

export const useCalculations = () => {
  const { state } = useAppContext();

  const calculateTotalCost = useMemo(() => {
    return (carData, isElectric) => {
      const {
        yearsOfOwnership,
        annualKm,
        inflationRate,
        currency
      } = state;

      const exchangeRate = exchangeRates[currency] || 1;
      let totalCost = carData.price * exchangeRate;
      
      // Calculate fuel/electricity costs
      let annualFuelCost;
      if (isElectric) {
        // kWh per 100km * annual km / 100 * electricity rate
        annualFuelCost = (carData.efficiency / 100) * annualKm * carData.electricityRate * exchangeRate;
      } else {
        // L per 100km * annual km / 100 * gas price per liter
        annualFuelCost = (carData.efficiency / 100) * annualKm * carData.gasPrice * exchangeRate;
      }
      
      // Calculate total fuel cost over ownership period with inflation
      let totalFuelCost = 0;
      for (let year = 1; year <= yearsOfOwnership; year++) {
        const inflationFactor = Math.pow(1 + inflationRate, year - 1);
        totalFuelCost += annualFuelCost * inflationFactor;
      }
      
      // Calculate maintenance costs
      let totalMaintenanceCost = 0;
      for (let year = 1; year <= yearsOfOwnership; year++) {
        const inflationFactor = Math.pow(1 + inflationRate, year - 1);
        totalMaintenanceCost += annualKm * carData.maintenance * exchangeRate * inflationFactor;
      }
      
      // Calculate insurance costs
      let totalInsuranceCost = 0;
      for (let year = 1; year <= yearsOfOwnership; year++) {
        const inflationFactor = Math.pow(1 + inflationRate, year - 1);
        totalInsuranceCost += carData.insurance * exchangeRate * inflationFactor;
      }
      
      // Calculate battery replacement costs (for electric vehicles only)
      let totalBatteryCost = 0;
      if (isElectric && carData.batteryCost && carData.batteryLifespan) {
        const totalKm = annualKm * yearsOfOwnership;
        const batteryReplacements = Math.floor(totalKm / carData.batteryLifespan);
        
        // Calculate when each battery replacement occurs and apply inflation
        for (let replacement = 1; replacement <= batteryReplacements; replacement++) {
          const replacementKm = replacement * carData.batteryLifespan;
          const replacementYear = Math.ceil(replacementKm / annualKm);
          if (replacementYear <= yearsOfOwnership) {
            const inflationFactor = Math.pow(1 + inflationRate, replacementYear - 1);
            totalBatteryCost += carData.batteryCost * exchangeRate * inflationFactor;
          }
        }
      }
      
      // Calculate resale value (discounted to present value)
      const resaleValue = carData.price * exchangeRate * carData.resaleValue;
      const discountedResaleValue = resaleValue / Math.pow(1 + inflationRate, yearsOfOwnership);
      
      totalCost = totalCost + totalFuelCost + totalMaintenanceCost + totalInsuranceCost + totalBatteryCost - discountedResaleValue;
      
      return {
        totalCost,
        breakdown: {
          purchasePrice: carData.price * exchangeRate,
          fuelCost: totalFuelCost,
          maintenanceCost: totalMaintenanceCost,
          insuranceCost: totalInsuranceCost,
          batteryCost: totalBatteryCost,
          resaleValue: discountedResaleValue
        }
      };
    };
  }, [state]);

  const car1Data = useMemo(() => ({
    price: state.car1Price,
    efficiency: state.car1Efficiency,
    electricityRate: state.car1ElectricityRate,
    maintenance: state.car1Maintenance,
    insurance: state.car1Insurance,
    resaleValue: state.car1ResaleValue,
    batteryCost: state.car1BatteryCost,
    batteryLifespan: state.car1BatteryLifespan
  }), [state]);

  const car2Data = useMemo(() => ({
    price: state.car2Price,
    efficiency: state.car2Efficiency,
    gasPrice: state.car2GasPrice,
    maintenance: state.car2Maintenance,
    insurance: state.car2Insurance,
    resaleValue: state.car2ResaleValue
  }), [state]);

  const car1Result = useMemo(() => calculateTotalCost(car1Data, true), [calculateTotalCost, car1Data]);
  const car2Result = useMemo(() => calculateTotalCost(car2Data, false), [calculateTotalCost, car2Data]);

  const savings = useMemo(() => car2Result.totalCost - car1Result.totalCost, [car1Result.totalCost, car2Result.totalCost]);
  const savingsPercentage = useMemo(() => (savings / car2Result.totalCost) * 100, [savings, car2Result.totalCost]);

  return {
    car1Result,
    car2Result,
    savings,
    savingsPercentage,
    car1Data,
    car2Data
  };
};

export default useCalculations;