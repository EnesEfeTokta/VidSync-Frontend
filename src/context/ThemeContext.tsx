// src/context/ThemeContext.tsx

import React, { createContext, useState, useEffect, useContext } from "react";
import type { ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Başlangıç değeri için daha güvenli bir yapı
const defaultState: ThemeContextType = {
  theme: "light",
  toggleTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(defaultState);

// Context'i kullanmak için özel bir hook oluşturalım. Bu en iyi pratiktir.
export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

// Akıllı başlangıç temasını belirleyen fonksiyon
const getInitialTheme = (): Theme => {
  // 1. localStorage'da kayıtlı bir tema var mı?
  const savedTheme = localStorage.getItem("theme") as Theme | null;
  if (savedTheme) {
    return savedTheme;
  }
  
  // 2. Kullanıcının işletim sistemi tercihi var mı?
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return "dark";
  }

  // 3. Hiçbiri yoksa varsayılan olarak light tema
  return "light";
};


export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Başlangıç state'ini akıllı fonksiyon ile ayarlıyoruz.
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
  };

  // Tema her değiştiğinde bu effect çalışır.
  useEffect(() => {
    // 1. localStorage'a yeni temayı kaydet.
    localStorage.setItem("theme", theme);
    // 2. <html> etiketine data-theme özelliğini ata.
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};