import { createContext, useContext } from "react";

interface Colors {
  backgroundColor: string;
  textColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  lightColor: string;
  errorColor: string;
  successColor: string;
}

type ThemeType = {
  dark: Colors;
  light: Colors;
};

export type Mode = "dark" | "light";

export const theme: ThemeType = {
  dark: {
    backgroundColor: "#1d3e53",
    textColor: "#ffffff",
    secondaryColor: "#254b62",
    tertiaryColor: "#476d7c",
    lightColor: "#77abb7",
    errorColor: "#EB3637",
    successColor: "#16c79a",
  },
  light: {
    backgroundColor: "#1d3e53",
    textColor: "#ffffff",
    secondaryColor: "#254b62",
    tertiaryColor: "#476d7c",
    lightColor: "#77abb7",
    errorColor: "#EB3637",
    successColor: "#16c79a",
  },
};

type ThemeContextType = {
  mode: Mode;
};

export const ThemeContext = createContext<ThemeContextType>({
  mode: "dark",
});

export const useTheme = () => useContext(ThemeContext);
