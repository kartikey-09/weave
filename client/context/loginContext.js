"use client"
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
 // Import your root reducer

const initialState = {}; // Initial state if needed
const middleware = [thunk];

export const LoginContext = React.createContext();

export const LoginProvider = ({ children }) => {
  const store = createStore( initialState, applyMiddleware(...middleware));

  return (
    <LoginContext.Provider value={store}>
      {children}
    </LoginContext.Provider>
  );
};