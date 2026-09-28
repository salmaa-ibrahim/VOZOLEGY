import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { AppProvider } from "./contexts/AppContext";
import WhatsAppButton from "./components/common/WhatsAppButton";
import "./styles/globals.css";
import WhatsAppHelpPopup from "./components/WhatsAppHelpPopup/WhatsAppHelpPopup";
import { siteConfig } from "./config/siteConfig";

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AuthProvider>
          <CartProvider>
            <AppRoutes />
            <WhatsAppButton />
            <WhatsAppHelpPopup
              whatsappNumber={siteConfig.contact.whatsapp.number}
            />{" "}
          </CartProvider>
        </AuthProvider>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
