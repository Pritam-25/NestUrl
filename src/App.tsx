import { Route, Routes } from "react-router";
import "./App.css";
import Layout from "./Layouts/Layout";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import Links from "./pages/LinksPage";
import Auth from "./pages/Auth";
import { ThemeProvider } from "@/components/theme-provider";
import { LoginForm } from "./components/login-form";
import { SignupForm } from "./components/signup_form";
import { UrlProvider } from "./context";
import Require_Auth from "./components/require_auth";

function App() {
  return (
    <UrlProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          {/* Public Routes */}
          <Route path="/auth" element={<Auth />}>
            <Route index element={<LoginForm />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="signup" element={<SignupForm />} />
          </Route>

          {/* Protected Routes inside Layout */}
          <Route
            path="/"
            element={
              <Require_Auth>
                <Layout />
              </Require_Auth>
            }
          >
            <Route index element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/links/:id" element={<Links />} />
          </Route>

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </UrlProvider>
  );
}

export default App;
