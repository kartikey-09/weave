import { configureStore } from '@reduxjs/toolkit';
import UserSlice from '@/features/UserSlice';
import AdminSlice from '@/features/AdminSlice';

let store;

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: UserSlice,
      admin: AdminSlice,
    }
  });
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? makeStore();
  
  // If your app uses SSR, you can prepopulate the store with the preloaded state
  if (preloadedState) {
    _store = configureStore({
      preloadedState,
      reducer: {
        user: UserSlice,
        admin: AdminSlice,
      }
    });
    store = _store;
  }
  
  // For SSR, always create a new store instance for every request
  if (typeof window === 'undefined') return _store;
  
  // For CSR, create the store only once in the client
  if (!store) store = _store;
  
  return _store;
}
