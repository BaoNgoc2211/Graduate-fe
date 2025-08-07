
export const safeLocalStorage = {
  /**
   * Safely get item from localStorage
   */
  getItem: (key: string): string | null => {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },

  /**
   * Safely set item to localStorage
   */
  setItem: (key: string, value: string): boolean => {
    if (typeof window === 'undefined') return false;
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      return false;
    }
  },

  /**
   * Safely remove item from localStorage
   */
  removeItem: (key: string): boolean => {
    if (typeof window === 'undefined') return false;
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },

  /**
   * Safely parse JSON from localStorage
   */
  // getJSON: <T>(key: string): T | null => {
  //   const item = safeLocalStorage.getItem(key);
  //   if (!item) return null;
  
  //   try {
  //     return JSON.parse(item) as T;
  //   } catch (error) {
  //     console.error('Error parsing JSON from localStorage:', error);
  //     return null;
  //   }
  // },

  // /**
  //  * Safely stringify and set JSON to localStorage
  //  */
  // setJSON: <T>(key: string, value: T): boolean => {
  //   try {
  //     const stringified = JSON.stringify(value);
  //     return safeLocalStorage.setItem(key, stringified);
  //   } catch (error) {
  //     console.error('Error stringifying JSON for localStorage:', error);
  //     return false;
  //   }
  // }
};