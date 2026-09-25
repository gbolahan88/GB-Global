import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import AppShell from "@/components/AppShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GB Global Services LTD | Technology • Trade • Solutions",
  description:
    "GB Global Services LTD provides technology solutions, automobiles, mobile devices, pet trading, exchange services, and other business solutions.",
  metadataBase: new URL("https://www.gbglobalservices.name.ng"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "GB Global Services LTD | Technology • Trade • Solutions",
    description:
      "GB Global Services LTD provides technology solutions, automobiles, mobile devices, pet trading, exchange services, and other business solutions.",
    url: "https://www.gbglobalservices.name.ng",
    siteName: "GB Global Services LTD",
    images: [
      {
        url: "/GBglobal_logo.png",
        width: 512,
        height: 512,
        alt: "GB Global Services LTD logo",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  other: {
    "google-adsense-account": "ca-pub-6813534262196551",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.gbglobalservices.name.ng/#organization",
  name: "GB Global Services LTD",
  alternateName: "GB Global Services",
  url: "https://www.gbglobalservices.name.ng",
  logo: "https://www.gbglobalservices.name.ng/GBglobal_logo.png",
  image: "https://www.gbglobalservices.name.ng/GBglobal_logo.png",
  description:
    "GB Global Services LTD provides technology solutions, automobiles, mobile devices, pet trading, exchange services, and other business solutions.",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Osun",
    addressCountry: "NG",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+234-813-949-8576",
    contactType: "customer service",
    email: "gbglobalservicesltd@gmail.com",
  },
  // Replace/add real profile URLs you actually have — remove any you don't
  sameAs: [
    "https://www.facebook.com/share/19jzPvvmN2/?mibextid=wwXIfr",
    "https://www.instagram.com/gbglobal_ng01?stkn=aDc5dmJoNG50bnFz&utm_source=qr",
    "https://www.linkedin.com/in/gbolahan-oni-57b140282/",
  ],
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web & Mobile Development" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gadget Sales" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Automobile Sales" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pet Trading" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Exchange Services" } },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => { try { const saved = localStorage.getItem("gb-global-theme"); const system = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"; document.documentElement.dataset.theme = saved === "light" || saved === "dark" ? saved : system; } catch {} })();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#050816]">
        <AppShell>{children}</AppShell>
        <Analytics />
      </body>
    </html>
  );
}