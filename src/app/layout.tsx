import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Signika, DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { DashboardProvider } from "@/context/DashboardContext";
import { Toaster } from "sonner";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"], 
  variable: "--font-heading",
  display: "swap",
});

const signika = Signika({
  subsets: ["latin"],
  variable: "--font-signika",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AIVOICE OS - AI Voice Operating System for Healthcare",
  description: "Transform your clinical operations with the most advanced AI Voice OS. Powered by Nexautomate.",
  authors: [{ name: "The Viraj developer", url: "https://nexautomate.in" }],
  keywords: ["AI Voice OS", "Healthcare AI", "Nexautomate", "AIVOICE OS", "Clinical Automation"],
  creator: "Nexautomate",
  publisher: "Nexautomate",
  openGraph: {
    title: "AIVOICE OS",
    description: "Next-gen AI Voice Operating System for Agencies and Clinics.",
    url: "https://nexautomate.in",
    siteName: "AIVOICE OS",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AIVOICE OS",
    description: "Automate your medical clinic with AIVOICE OS by Nexautomate.",
    creator: "@thevirajrealm",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${inter.variable} ${plusJakarta.variable} ${signika.variable} ${dmSans.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <DashboardProvider>
            {children}
            <Toaster position="top-right" richColors closeButton />
          </DashboardProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
