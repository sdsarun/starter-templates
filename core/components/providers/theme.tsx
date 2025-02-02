"use client";

import '@ant-design/v5-patch-for-react-19';

import theme from "@/core/configs/theme";
import { App, ConfigProvider, theme as antdTheme } from "antd";
import React, { createContext, use, useState } from "react";

export type ThemeProviderProps = React.PropsWithChildren;
export type ColorScheme = "light" | "dark";
export type ThemeContextValues = {
  colorScheme: ColorScheme;
  setColorScheme: (colorScheme: ColorScheme) => void;
};

export const ThemeContext = createContext({} as ThemeContextValues);
export const useTheme = () => use(ThemeContext);
export const useFeeback = App.useApp;

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");

  return (
    <ThemeContext value={{ colorScheme, setColorScheme }}>
      <ConfigProvider
        {...theme}
        theme={{
          ...theme?.theme,
          algorithm: colorScheme === "light" ? antdTheme.defaultAlgorithm : antdTheme.darkAlgorithm
        }}
      >
        <App>{children}</App>
      </ConfigProvider>
    </ThemeContext>
  );
}
