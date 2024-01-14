import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Toaster } from '@/components/ui/toaster'
import DesignerContextProvider from '@/components/context/DesignerContext'
import NextTopLoader from "nextjs-toploader";
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {

  title: 'Pager',
  description: 'App',
  icons: {
    icon: '/favicon.ico', // /public path
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextTopLoader/>
        <DesignerContextProvider>
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              >
            {children}
            <Toaster/>
          </ThemeProvider>
      </DesignerContextProvider>
      </body>
    </html>
    </ClerkProvider>
  )
}
