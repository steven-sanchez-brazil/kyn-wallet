import type { Config } from "tailwindcss";
import { DesignTokens } from "./lib/constants/DesignTokens";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: DesignTokens.Colors.BrandPrimary,
          gradientStart: DesignTokens.Colors.BrandGradientStart,
          gradientEnd: DesignTokens.Colors.BrandGradientEnd,
        },
        neutral: {
          900: DesignTokens.Colors.Neutral900,
          500: DesignTokens.Colors.Neutral500,
          300: DesignTokens.Colors.Neutral300,
        },
        success: {
          700: DesignTokens.Colors.Success700,
          50: DesignTokens.Colors.Success50,
        },
        error: {
          500: DesignTokens.Colors.Error500,
          50: DesignTokens.Colors.Error50,
        },
      },
      borderRadius: {
        lg: DesignTokens.BorderRadius.Lg,
        md: DesignTokens.BorderRadius.Md,
      },
      fontFamily: {
        sans: [DesignTokens.Typography.FontFamily],
      },
      fontWeight: {
        semibold: DesignTokens.Typography.FontWeightSemiBold,
      },
    },
  },
  plugins: [],
};
export default config;
