"use client";
import { AppProvider } from "@/Components/Theme/theme-provider";
import React from "react";
import { Provider } from "react-redux";
import { Store } from "../lib/Redux/Store";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={Store}>
      <AppProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </AppProvider>
    </Provider>
  );
};

export default Providers;
