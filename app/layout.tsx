import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist_Mono, EB_Garamond, Instrument_Serif, DM_Sans, Playfair_Display } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const EBGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  weight: ["400", "500", "600", "700"],
})

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: ["400"],
})

const DMSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
})

const PlayfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  title: "Source Quantum | Source Your Trades With Clarity",
  description: "A community where learning earns you profits",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <title>Source Quantum | Source Your Trades</title>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
        </head>
        <body
          className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} ${EBGaramond.variable} ${instrumentSerif.variable} ${PlayfairDisplay.variable} ${DMSans.variable} font-sans antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
