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
          600: DesignTokens.Colors.Brand600,
          gradientStart: DesignTokens.Colors.BrandGradientStart,
          gradientEnd: DesignTokens.Colors.BrandGradientEnd,
        },
        neutral: {
          900: DesignTokens.Colors.Neutral900,
          700: DesignTokens.Colors.Neutral700,
          500: DesignTokens.Colors.Neutral500,
          400: DesignTokens.Colors.Neutral400,
          300: DesignTokens.Colors.Neutral300,
        },
      },
      borderRadius: {
        xl: DesignTokens.BorderRadius.Xl,
        lg: DesignTokens.BorderRadius.Lg,
        md: DesignTokens.BorderRadius.Md,
      },
      fontFamily: {
        sans: [DesignTokens.Typography.FontFamily],
      },
      fontWeight: {
        bold: DesignTokens.Typography.FontWeightBold,
        semibold: DesignTokens.Typography.FontWeightSemiBold,
        medium: DesignTokens.Typography.FontWeightMedium,
        regular: DesignTokens.Typography.FontWeightRegular,
      },
      height: {
        input: DesignTokens.Spacing.InputHeight,
        'social-btn': DesignTokens.Spacing.SocialButtonHeight,
      },
      padding: {
        'brand-x': DesignTokens.Spacing.BrandPanelPaddingX,
        'brand-y': DesignTokens.Spacing.BrandPanelPaddingY,
      },
    },
  },
  plugins: [],
};
export default config;
