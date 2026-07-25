import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BackgroundStage from "./components/ui/BackgroundStage";
import CustomCursor from "./components/ui/CustomCursor";
import SplashCursor from "./components/SplashCursor";
import HomePage from "./pages/HomePage";
import WorksPage from "./pages/WorksPage";
import ProjectPage from "./pages/ProjectPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence initial={false} mode="sync">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/works" element={<WorksPage />} />
        <Route path="/works/:slug" element={<ProjectPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="min-h-screen w-full max-w-full overflow-x-clip bg-[#050506] font-body text-[#F5F3F7]">
        <BackgroundStage />
        <CustomCursor />
        <SplashCursor />
        <div className="relative z-10">
          <Navbar />
          <AnimatedRoutes />
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}
