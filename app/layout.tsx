import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import TawkToChat from "@/components/TawkToChat"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FormBharat - Open Source Form Builder for India",
  description: "Create beautiful forms for your business. Free and open source.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XVR0TV1G8V"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XVR0TV1G8V');
          `}
        </Script>
        
        {children}
        <Toaster />
        <TawkToChat />
      </body>
    </html>
  )
}
