import type { AppProps } from "next/app"
import { Inter } from "next/font/google"
import { HeaderClient } from "@/components/layout/header-client"
import { Footer } from "@/components/layout/footer"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { TranslationProvider } from "@/contexts/translation-context"
import Script from "next/script"
import { InstallPrompt } from "@/components/pwa/install-prompt"
import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TranslationProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className={`relative flex min-h-screen flex-col ${inter.className}`}>
          <HeaderClient />
          <main className="flex-1">
            <Component {...pageProps} />
          </main>
          <Footer />
          <InstallPrompt />
        </div>
        <Toaster />
      </ThemeProvider>
      <Script id="register-sw" strategy="afterInteractive">
        {`
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/sw.js').then(
                function(registration) {
                  console.log('Service Worker registration successful with scope: ', registration.scope);
                },
                function(err) {
                  console.log('Service Worker registration failed: ', err);
                }
              );
            });
          }
        `}
      </Script>
    </TranslationProvider>
  )
}
