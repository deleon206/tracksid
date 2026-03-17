import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import MagFeed from "./pages/MagFeed.tsx";
import MagArticle from "./pages/MagArticle.tsx";
import NotFound from "./pages/NotFound.tsx";
import Invitation from "./pages/Invitation.tsx";
import Demos from "./pages/Demos.tsx";
import Distribution from "./pages/Distribution.tsx";

const App = () => (
  <HelmetProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/distribution" element={<Distribution />} />
          <Route path="/demos" element={<Demos />} />
          <Route path="/mag" element={<MagFeed />} />
          <Route path="/mag/:slug" element={<MagArticle />} />
          <Route path="/inv/:artistAlias" element={<Invitation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </HelmetProvider>
);

export default App;
