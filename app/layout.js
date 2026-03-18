import "./globals.css";
import { Inter } from "next/font/google";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Providers from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: {
    default: "Hike The Himalaya - Majestic Mountain Journeys",
    template: "%s | Hike The Himalaya"
  },
  description: "Experience the ultimate adventure with Hike The Himalaya. Curated treks, tours, and mountain escapes in Himachal. Top taxi service, Chandigarh to Manali tour packages, and premium Himalayan expeditions.",
  keywords: [
    "Himachal tour packages",
    "Manali tour package",
    "Shimla tour package",
    "Spiti Valley tour",
    "trekking in India",
    "Himalayan trekking",
    "adventure travel India",
    "budget Himachal trip",
    "Kasol trek package",
    "travel packages India",
    "Himachal Pradesh tour packages",
    "best Himachal tour packages",
    "cheap Himachal tour packages",
    "Manali honeymoon package",
    "group tour Himachal",
    "book tour packages online",
    "Kullu Manali tour package",
    "Kasol Kheerganga trek",
    "Bir Billing paragliding",
    "Dharamshala tour package",
    "Dalhousie tour package",
    "trekking packages India",
    "best treks in India",
    "camping in Himachal",
    "best time to visit Spiti Valley",
    "budget trip to Himachal",
    "hidden places in Himachal",
    "offbeat Himachal destinations",
    "top 10 taxi service in Chandigarh",
    "top 10 tour and travels in Himachal",
    "top 10 treks in Himachal",
    "top 10 manali tour packages",
    "near taxi",
    "taxi service",
    "tour and travels",
    "top taxi service",
    "chandigarh to manali tour package",
    "Hike The Himalaya",
    "hike the himalaya shimla",
    "Himachal Tourism"
  ],
  authors: [{ name: "Hike The Himalaya" }],
  creator: "Hike The Himalaya",
  publisher: "Hike The Himalaya",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Hike The Himalaya - Majestic Mountain Journeys",
    description: "Curated treks, tours, and mountain escapes in Himachal. Experience the best taxi service and tour packages.",
    url: "https://hikethehimalaya.in",
    siteName: "Hike The Himalaya",
    images: [
      {
        url: "/icon.png",
        width: 800,
        height: 600,
        alt: "Hike The Himalaya Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hike The Himalaya - Majestic Mountain Journeys",
    description: "Curated treks, tours, and mountain escapes in Himachal. Experience the best taxi service and tour packages.",
    images: ["/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "6jJmWjt9pLjFPzRY_Y0wHoyh1MZx7DC8nyi7Cgu-b1o",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body 
        className={`${inter.variable} antialiased font-sans`} 
        suppressHydrationWarning
      >
        <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

