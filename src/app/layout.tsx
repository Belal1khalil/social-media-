import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from "@/theme";
import ReduxProvider from "@/Components/ReduxProvider";
import Navbar from "@/Components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <div style={{ backgroundColor: '#e0f0ff',minHeight:"100vh" }}>
          <ReduxProvider>
            <Navbar/>
            {children}
            <Toaster position="top-right" />
          </ReduxProvider>
        </div>
      </ThemeProvider>
    </AppRouterCacheProvider>
      </body>
    </html>
  );
}
