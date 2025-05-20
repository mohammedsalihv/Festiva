import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import store from "./redux/store";
import "./index.css";
import App from "./App";

// Error boundary component
import { Component, ReactNode } from "react";
import ErrorAlert from "./components/ErrorAlert";

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorAlert statusCode={400} message={'something went worng , please refresh the page!'}/>
    }
    return this.props.children;
  }
}

// Configure QueryClient with defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, // Retry failed queries twice
      staleTime: 5 * 60 * 1000, // Cache queries for 5 minutes
    },
    mutations: {
      retry: 1, // Retry failed mutations once (e.g., Google login)
    },
  },
});

// Get Google Client ID and validate
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;


if (!clientId) {
  console.error("Google Client ID is missing. Please set VITE_GOOGLE_CLIENT_ID in .env");
  throw new Error("Google OAuth configuration error");
}

// Get root element and validate
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Root element not found");
  throw new Error("Failed to find root element");
}
createRoot(rootElement).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={clientId}>
      <StrictMode>
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </ErrorBoundary>
      </StrictMode>
    </GoogleOAuthProvider>
  </Provider>
);