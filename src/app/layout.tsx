
import type { Metadata } from "next";
import localFont from "next/font/local";
import './styles/output.css';
import dynamic from "next/dynamic";
import Providers from "./Providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "First Watch Weather",
  description: "A React/NextJS Based Application that uses OpenWeather's web API to gather weather data and Geocodio's API to render weather conditions based on user's desired location",
};

const APILoaderWrapper = dynamic(() => import('./ApiLoaderWrapper'), {
  ssr: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
          <APILoaderWrapper />
          <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}