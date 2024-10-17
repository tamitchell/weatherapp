
export default function getFromLocalStorage<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') {
      return defaultValue;
    }
  
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) {
        return defaultValue;
      }
  
      // Attempt to parse the item
      const parsedItem = JSON.parse(item);
      
      // Check if the parsed item is of the expected type
      if (typeof parsedItem === typeof defaultValue) {
        return parsedItem as T;
      } else {
        console.warn(`Retrieved item for key "${key}" is not of the expected type. Using default value.`);
        return defaultValue;
      }
    } catch (error) {
      console.error(`Error retrieving item for key "${key}" from localStorage:`, error);
      return defaultValue;
    }
  };