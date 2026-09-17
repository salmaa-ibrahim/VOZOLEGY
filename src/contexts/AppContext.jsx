//Age Gate & Cookie Consent

import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [isCookieAccepted, setIsCookieAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage on mount
    const ageVerified = localStorage.getItem('vozol_age_verified');
    const cookieAccepted = localStorage.getItem('vozol_cookie_accepted');
    
    if (ageVerified === 'true') setIsAgeVerified(true);
    if (cookieAccepted === 'true') setIsCookieAccepted(true);
    setIsLoading(false);
  }, []);

  const verifyAge = () => {
    localStorage.setItem('vozol_age_verified', 'true');
    setIsAgeVerified(true);
  };

  const acceptCookies = () => {
    localStorage.setItem('vozol_cookie_accepted', 'true');
    setIsCookieAccepted(true);
  };

  return (
    <AppContext.Provider value={{ isAgeVerified, isCookieAccepted, isLoading, verifyAge, acceptCookies }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);