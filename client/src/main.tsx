import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PersistGate } from "redux-persist/integration/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import store, { persistor } from "./redux/store";
import "./index.css";
import App from "./App";

const queryClient = new QueryClient();
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

if (!clientId) {
  console.error(
    "Google Client ID is missing. Please set VITE_GOOGLE_CLIENT_ID in .env"
  );
  throw new Error("Google OAuth configuration error");
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Root element not found");
  throw new Error("Failed to find root element");
}

createRoot(rootElement).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GoogleOAuthProvider clientId={clientId}>
        <QueryClientProvider client={queryClient}>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>
);
