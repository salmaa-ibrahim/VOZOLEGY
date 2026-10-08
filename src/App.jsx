// import React from "react";
// import { BrowserRouter } from "react-router-dom";
// import AppRoutes from "./routes/AppRoutes";
// import { AuthProvider } from "./contexts/AuthContext";
// import { CartProvider } from "./contexts/CartContext";
// import { AppProvider } from "./contexts/AppContext";
// import WhatsAppButton from "./components/common/WhatsAppButton";
// import "./styles/globals.css";
// import WhatsAppHelpPopup from "./components/WhatsAppHelpPopup/WhatsAppHelpPopup";
// import { siteConfig } from "./config/siteConfig";
// import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
// function App() {
//   return (
//     <BrowserRouter>
//       <ScrollToTop />
//       <AppProvider>
//         <AuthProvider>
//           <CartProvider>
//             <AppRoutes />
//             <WhatsAppButton />
//             <WhatsAppHelpPopup
//               whatsappNumber={siteConfig.contact.whatsapp.number}
//             />{" "}
//           </CartProvider>
//         </AuthProvider>
//       </AppProvider>
//     </BrowserRouter>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { AppProvider } from "./contexts/AppContext";

import WhatsAppButton from "./components/common/WhatsAppButton";
import WhatsAppHelpPopup from "./components/WhatsAppHelpPopup/WhatsAppHelpPopup";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

import { siteConfig } from "./config/siteConfig";

import "./styles/globals.css";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />

        <AppProvider>
          <AuthProvider>
            <CartProvider>
              <AppRoutes />

              <WhatsAppButton />

              <WhatsAppHelpPopup
                whatsappNumber={siteConfig.contact.whatsapp.number}
              />
            </CartProvider>
          </AuthProvider>
        </AppProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
