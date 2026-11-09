import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// TODO: replace with your real production domain
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vcrown.tech";
const SITE_NAME = "Vcrown Technologies";
const DESCRIPTION =
  "Vcrown Technologies is an independent software engineering and design studio building fast web platforms, mobile apps, AI integrations, and scalable cloud products.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Vcrown Technologies | Web, Mobile & AI Software Development Studio",
    template: "%s | Vcrown Technologies",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "software development studio",
    "custom web application development",
    "mobile app development",
    "Next.js developers",
    "React Native developers",
    "AI integration services",
    "MVP development",
    "cloud engineering",
    "UI/UX design systems",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Vcrown Technologies | We build digital products that scale",
    description: DESCRIPTION,
    locale: "en_US",
    // Add app/opengraph-image.png (1200x630) and Next will wire it up automatically
  },
  twitter: {
    card: "summary_large_image",
    title: "Vcrown Technologies | We build digital products that scale",
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08090E",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: SITE_NAME,
      url: SITE_URL,
      description: DESCRIPTION,
      provider: { "@id": `${SITE_URL}/#organization` },
      serviceType: [
        "Custom web application development",
        "Mobile app development",
        "UI/UX and design systems",
        "AI integrations and microservices",
        "Cloud engineering and DevOps",
        "MVP development",
      ],
      areaServed: "Worldwide",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}