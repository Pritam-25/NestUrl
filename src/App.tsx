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

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        {/* Routes wrapped inside Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} /> {/* Default child route */}
          <Route path="/links/:id" element={<Links />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

          <Route path="/auth" element={<Auth />} />
          <Route path="/login" element={<LoginForm />} />
        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
