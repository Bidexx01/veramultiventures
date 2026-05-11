import type { Metadata, Viewport } from "next"
import { Inter, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
})
export const metadata: Metadata = {
  title: "Vera Multiventures — Food Sealer Machine | Keep Garri, Semo & More Fresh | Pay On Delivery",
  description: "Seal your garri, semo, beans, crayfish and food sachets airtight in 2 seconds. Stop wasting food and money. USB rechargeable. Pay on delivery, nationwide shipping in Nigeria.",
  openGraph: {
    title: "Vera Multiventures — Food Sealer Machine | Keep Your Food Fresh",
    description: "Seal garri, semo, beans, crayfish in seconds. USB rechargeable. Pay on delivery nationwide in Nigeria.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vera Multiventures — Food Sealer Machine",
    description: "Seal your food sachets airtight in 2 seconds. Pay on delivery nationwide.",
  },
}
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#14532D",
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
