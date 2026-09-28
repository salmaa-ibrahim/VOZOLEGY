import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { AppProvider } from './contexts/AppContext';
import WhatsAppButton from "./components/common/WhatsAppButton";
import './styles/globals.css';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AuthProvider>
          <CartProvider>
            <AppRoutes />
            <WhatsAppButton/>
          </CartProvider>
        </AuthProvider>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;