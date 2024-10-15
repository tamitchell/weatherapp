import { WeatherAction, WeatherState } from "src/types/types";
  
  // Define action types
  export const weatherReducer = (state: WeatherState, action: WeatherAction): WeatherState => {
    switch (action.type) {
      case 'SET_WEATHER':
        return { ...state, weather: action.payload };
      case 'SET_FORECAST':
        return { ...state, forecast: action.payload };
      case 'SET_AIR_QUALITY':
        return { ...state, airQuality: action.payload };
      case 'SET_ADDRESS':
        return { ...state, address: action.payload };
      case 'SET_LOADING':
        return { ...state, isLoading: action.payload };
      case 'SET_ERROR':
        return { 
          ...state, 
          error: { ...state.error, [action.payload.type]: action.payload.message } 
        };
      case 'CLEAR_ERROR':
        if (state.error) {
          const { [action.payload]: _, ...remainingErrors } = state.error;
          console.log(_);
          return { 
            ...state, 
            error: Object.keys(remainingErrors).length ? remainingErrors : null 
          };
        }
        return state;
      case 'SET_UNITS':
        return { ...state, units: action.payload };
      case 'SET_TIMESTAMP':
        return { ...state, timestamp: action.payload };
      default:
        return state;
    }
  };