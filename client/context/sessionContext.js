"use client"
import { createContext, useState } from "react";

const initialValue = {
  user: {
    _id: null,
    token: null,
  },
  admin: {
    _id: null,
    token: null,
  }
};

const SessionContext = createContext(initialValue);

const SessionProvider = ({ children }) => {
  // Destructure initial values for user and admin
  const { user: initialUser, admin: initialAdmin } = initialValue;

  // Initialize state for user and admin
  const [user, setUser] = useState(initialUser);
  const [admin, setAdmin] = useState(initialAdmin);

  return (
    <SessionContext.Provider value={{ user, setUser, admin, setAdmin }}>
      {children}
    </SessionContext.Provider>
  );
};


export { SessionContext, SessionProvider };