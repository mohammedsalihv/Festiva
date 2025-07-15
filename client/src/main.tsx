import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store";
import { LoadScript } from "@react-google-maps/api";
import "./index.css";
import App from "./App";

const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const libraries: ("places" | "core")[] = ["places", "core"];
if (!mapsApiKey) {
  console.error(
    "Google Maps API key is missing. Please set VITE_GOOGLE_MAPS_API_KEY in .env"
  );
  throw new Error("Google Maps configuration error");
}
const queryClient = new QueryClient();
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
if (!clientId) {
  console.error(
    "Google Client ID is missing. Please set VITE_GOOGLE_CLIENT_ID in .env"
  );
  throw new Error("Google OAuth configuration error");
}

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
          <LoadScript
            googleMapsApiKey={mapsApiKey}
            libraries={libraries}
            version="beta"
          >
            <App />
          </LoadScript>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>
);
