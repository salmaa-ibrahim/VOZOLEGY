import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import AnnouncementBar from '../components/AnnouncementBar/AnnouncementBar';
import CookieConsent from '../components/CookieConsent/CookieConsent';
import AgeVerification from '../components/AgeVerification/AgeVerification';
import { useApp } from '../contexts/AppContext';

const MainLayout = () => {
  const { isAgeVerified, isCookieAccepted } = useApp();

  return (
    <>
      <AgeVerification />
      
      {isAgeVerified && (
        <>
          <AnnouncementBar />
          <Header />
          <main style={{ minHeight: '60vh' }}>
            <Outlet />
          </main>
          <Footer />
        </>
      )}

      {!isCookieAccepted && <CookieConsent />}
    </>
  );
};

export default MainLayout;