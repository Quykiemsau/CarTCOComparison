import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  // Car 1 (Electric)
  car1Name: 'Tesla Model 3',
  car1Type: 'electric',
  car1Price: 45000,
  car1Efficiency: 15.5, // kWh per 100km
  car1ElectricityRate: 0.14, // $ per kWh
  car1Maintenance: 0.018, // $ per km
  car1Insurance: 1200, // $ per year
  car1ResaleValue: 0.6, // 60% after ownership period
  car1BatteryCost: 12000, // $ battery replacement cost
  car1BatteryLifespan: 300000, // km before battery replacement needed
  
  // Car 2 (Gasoline)
  car2Name: 'Toyota Camry',
  car2Type: 'gasoline',
  car2Price: 25000,
  car2Efficiency: 7.8, // L per 100km
  car2GasPrice: 0.93, // $ per liter
  car2Maintenance: 0.05, // $ per km
  car2Insurance: 1000, // $ per year
  car2ResaleValue: 0.4, // 40% after ownership period
  
  // Common parameters
  yearsOfOwnership: 10,
  annualKm: 19300, // km per year
  inflationRate: 0.02, // 2% per year

  // App settings
  language: 'en',
  country: 'US',
  currency: 'USD'
};

// Country to currency mapping
export const countryToCurrency = {
  'US': 'USD',
  'VN': 'VND',
  'CA': 'CAD',
  'AU': 'AUD',
  'GB': 'GBP',
  'DE': 'EUR',
  'FR': 'EUR',
  'JP': 'JPY'
};

// Currency exchange rates (relative to USD)
export const exchangeRates = {
  'USD': 1,
  'VND': 24000,
  'CAD': 1.35,
  'AUD': 1.5,
  'GBP': 0.8,
  'EUR': 0.92,
  'JPY': 150
};

// Action types
export const ACTIONS = {
  UPDATE_FIELD: 'UPDATE_FIELD',
  SET_LANGUAGE: 'SET_LANGUAGE',
  SET_COUNTRY: 'SET_COUNTRY',
  RESET_TO_DEFAULTS: 'RESET_TO_DEFAULTS'
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_FIELD:
      return {
        ...state,
        [action.field]: action.value
      };
    
    case ACTIONS.SET_LANGUAGE:
      return {
        ...state,
        language: action.language
      };
    
    case ACTIONS.SET_COUNTRY:
      const newCurrency = countryToCurrency[action.country] || 'USD';
      return {
        ...state,
        country: action.country,
        currency: newCurrency
      };
    
    case ACTIONS.RESET_TO_DEFAULTS:
      return { ...initialState };
    
    default:
      return state;
  }
};

// Context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const updateField = (field, value) => {
    dispatch({
      type: ACTIONS.UPDATE_FIELD,
      field,
      value: parseFloat(value) || value
    });
  };

  const setLanguage = (language) => {
    dispatch({
      type: ACTIONS.SET_LANGUAGE,
      language
    });
  };

  const setCountry = (country) => {
    dispatch({
      type: ACTIONS.SET_COUNTRY,
      country
    });
  };

  const resetToDefaults = () => {
    dispatch({
      type: ACTIONS.RESET_TO_DEFAULTS
    });
  };

  return (
    <AppContext.Provider value={{
      state,
      updateField,
      setLanguage,
      setCountry,
      resetToDefaults
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext;