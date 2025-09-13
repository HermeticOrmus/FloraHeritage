import { useEffect } from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: "dark" | "light";
}

export function ThemeProvider({ children, defaultTheme = "dark" }: ThemeProviderProps) {
  useEffect(() => {
    // Set the default theme on mount
    document.documentElement.classList.add(defaultTheme);
    
    // Clean up function to remove theme class if component unmounts
    return () => {
      document.documentElement.classList.remove(defaultTheme);
    };
  }, [defaultTheme]);

  return <>{children}</>;
}