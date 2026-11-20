import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/ToastProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://checksafetyapp.com"),
  title: "CheckSafety — Client Screening • Masked Numbers • Solo Worker Safety",
  description:
    "Zero-knowledge client ID screening, masked phone numbers, and automated cloud safety timers by CheckSafety Software Ltd.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon-192.svg",
    apple: "/icon-192.svg",
  },
  openGraph: {
    title: "CheckSafety — Client Screening • Masked Numbers • Solo Worker Safety",
    description:
      "Verify clients before you attend, mask your personal mobile number, and run an automated cloud safety timer.",
    url: "https://checksafetyapp.com",
    siteName: "CheckSafety",
    locale: "en_GB",
    type: "website",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CheckSafety",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#FFFFFF",
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-GB"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="min-h-full bg-white text-[#111827] font-sans flex flex-col">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
