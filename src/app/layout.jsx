import { Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/ToastProvider";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import { CardFx } from "@/components/ui/CardFx";
import { AuthLinks } from "@/components/ui/AuthLinks";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
});

export const metadata = {
  metadataBase: new URL("https://checksafeapp.com"),
  title: "CheckSafe — Client Screening • Masked Numbers • Solo Worker Safety",
  description:
    "Zero-knowledge client ID screening, masked phone numbers, and automated cloud safety timers by CheckSafe Software Ltd.",
  icons: {
    icon: "/icon-192.svg",
    apple: "/icon-192.svg",
  },
  openGraph: {
    title: "CheckSafe — Client Screening • Masked Numbers • Solo Worker Safety",
    description:
      "Verify clients before you attend, mask your personal mobile number, and run an automated cloud safety timer.",
    url: "https://checksafeapp.com",
    siteName: "CheckSafe",
    locale: "en_GB",
    type: "website",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFFFFF",
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-GB"
      className={`${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="min-h-full bg-white text-[#111827] font-sans flex flex-col">
        <SmoothScrollProvider>
          <ToastProvider>{children}</ToastProvider>
          <CardFx />
          <AuthLinks />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
