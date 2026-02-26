import type { Metadata, Viewport } from "next";
import { DM_Sans, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { SecurityProvider } from "@/components/layout/SecurityProvider";
import { GradientWave } from "@/components/ui/GradientWave";
import { PROFILE_IMAGE_BASE64 } from "@/lib/assets";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Hassan Noman — Product Leader, Digital Banking & Fintech",
  description: "Built and scaled digital financial products that millions of people use every day.",
  keywords: ["Hassan Noman", "Product Owner", "Product Management", "Digital Banking", "Temenos Infinity", "Fintech"],
  icons: {
    icon: PROFILE_IMAGE_BASE64,
    apple: PROFILE_IMAGE_BASE64,
  },
  openGraph: {
    title: "Hassan Noman — Product Leader",
    description: "Product Leader · Digital Banking & Fintech · Multi-billion PKR portfolio management.",
    images: [
      {
        url: PROFILE_IMAGE_BASE64,
        width: 800,
        height: 800,
        alt: "Hassan Noman - Profile",
      },
    ],
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(dmSans.variable, poppins.variable, "antialiased relative")}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SecurityProvider>
            <GradientWave />
            <div className="glow-orb glow-orb-1" aria-hidden="true" />
            <div className="glow-orb glow-orb-2" aria-hidden="true" />
            <div className="relative z-10">
              {children}
            </div>
          </SecurityProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
