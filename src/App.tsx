import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "@/pages/Index";
import AboutUs from "@/pages/AboutUs";
import OurCompany from "@/pages/OurCompany";
import Contact from "@/pages/Contact";
import Enquiry from "@/pages/Enquiry";
import CustomTour from "@/pages/CustomTour";
import Terms from "@/pages/Terms";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import CookiePolicy from "@/pages/CookiePolicy";
import Services from "@/pages/Services";
import Dashboard from "@/pages/Dashboard";
import India from "@/pages/destinations/India";
import IndiaCulture from "@/pages/destinations/IndiaCulture";
import SriLanka from "@/pages/destinations/SriLanka";
import SriLankaCulture from "@/pages/destinations/SriLankaCulture";
import SriLankaBeaches from "@/pages/destinations/SriLankaBeaches";
import SriLankaWildlife from "@/pages/destinations/SriLankaWildlife";
import Nepal from "@/pages/destinations/Nepal";
import NepalCulture from "@/pages/destinations/NepalCulture";
import NepalWildlife from "@/pages/destinations/NepalWildlife";
import Bhutan from "@/pages/destinations/Bhutan";
import BhutanCulture from "@/pages/destinations/BhutanCulture";
import BhutanBirding from "@/pages/destinations/BhutanBirding";
import Ladakh from "@/pages/destinations/Ladakh";
import Wildlife from "@/pages/destinations/Wildlife";
import Andaman from "@/pages/destinations/Andaman";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Dashboard route without Layout (no header/footer) */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* All other routes with Layout */}
          <Route path="/" element={<MainLayout><Index /></MainLayout>} />
          <Route path="/about-us" element={<MainLayout><AboutUs /></MainLayout>} />
          <Route path="/our-company" element={<MainLayout><OurCompany /></MainLayout>} />
          <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
          <Route path="/enquiry" element={<MainLayout><Enquiry /></MainLayout>} />
          <Route path="/custom-tour" element={<MainLayout><CustomTour /></MainLayout>} />
          <Route path="/terms" element={<MainLayout><Terms /></MainLayout>} />
          <Route path="/privacy-policy" element={<MainLayout><PrivacyPolicy /></MainLayout>} />
          <Route path="/cookie-policy" element={<MainLayout><CookiePolicy /></MainLayout>} />
          <Route path="/services" element={<MainLayout><Services /></MainLayout>} />
          <Route path="/destinations/india" element={<MainLayout><India /></MainLayout>} />
          <Route path="/destinations/india/culture" element={<MainLayout><IndiaCulture /></MainLayout>} />
          <Route path="/destinations/sri-lanka" element={<MainLayout><SriLanka /></MainLayout>} />
          <Route path="/destinations/sri-lanka/culture" element={<MainLayout><SriLankaCulture /></MainLayout>} />
          <Route path="/destinations/sri-lanka/beaches" element={<MainLayout><SriLankaBeaches /></MainLayout>} />
          <Route path="/destinations/sri-lanka/wildlife" element={<MainLayout><SriLankaWildlife /></MainLayout>} />
          <Route path="/destinations/nepal" element={<MainLayout><Nepal /></MainLayout>} />
          <Route path="/destinations/nepal/culture" element={<MainLayout><NepalCulture /></MainLayout>} />
          <Route path="/destinations/nepal/wildlife" element={<MainLayout><NepalWildlife /></MainLayout>} />
          <Route path="/destinations/bhutan" element={<MainLayout><Bhutan /></MainLayout>} />
          <Route path="/destinations/bhutan/culture" element={<MainLayout><BhutanCulture /></MainLayout>} />
          <Route path="/destinations/bhutan/birding" element={<MainLayout><BhutanBirding /></MainLayout>} />
          <Route path="/destinations/ladakh" element={<MainLayout><Ladakh /></MainLayout>} />
          <Route path="/destinations/wildlife" element={<MainLayout><Wildlife /></MainLayout>} />
          <Route path="/destinations/andaman" element={<MainLayout><Andaman /></MainLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

