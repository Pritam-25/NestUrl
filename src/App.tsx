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
import Require_Auth from "./components/Require_Auth";

function App() {
  return (
    <UrlProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route
              path="/dashboard"
              element={
                <Require_Auth>
                  <Dashboard />
                </Require_Auth>
              }
            />
            <Route
              path="/links/:id"
              element={
                <Require_Auth>
                  <Links />
                </Require_Auth>
              }
            />
          </Route>

          {/* Authentication Routes */}
          <Route path="/auth" element={<Auth />}>
            <Route index element={<LoginForm />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="signup" element={<SignupForm />} />
          </Route>

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </UrlProvider>
  );
}

export default App;
