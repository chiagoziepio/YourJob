import { AppProvider } from "@/Components/Theme/theme-provider";
import React from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </AppProvider>
  );
};

export default Providers;
