import { Switch, Route } from "wouter";
import { HelmetProvider } from 'react-helmet-async';
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import GlassNavigation from "@/components/GlassNavigation";
import CasaFlora from "@/pages/CasaFlora";
import { lazy, Suspense } from "react";

const Heritage = lazy(() => import("@/pages/Heritage"));
const Rules = lazy(() => import("@/pages/Rules"));
const Gallery = lazy(() => import("@/pages/Gallery"));
const Tour = lazy(() => import("@/pages/Tour"));
const RoomDetail = lazy(() => import("@/pages/RoomDetail"));
const NotFound = lazy(() => import("@/pages/not-found"));

function Router() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <Switch>
        <Route path="/" component={CasaFlora} />
        <Route path="/heritage" component={Heritage} />
        <Route path="/rules" component={Rules} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/tour" component={Tour} />
        <Route path="/rooms/:id" component={RoomDetail} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark">
          <TooltipProvider>
            <GlassNavigation />
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
