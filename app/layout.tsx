import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanstackProvider from "@/components/TanStackProvider/TanStackProvider";
import { AuthProvider } from "@/components/AuthProvider/AuthProvider";

export const metadata: Metadata = {
  title: `Notehub`,
  description: `A simple note-taking app to quickly jot down and organize your thoughts.`,
  openGraph: {
    title: `notehub`,
    description: " A simple note-taking app to quickly jot down and organize your thoughts.",
    url: `https://08-zustand-woad-kappa.vercel.app/`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: "Notehub",
      },
    ],
  }
}
const roboto = Roboto({
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
  subsets: ['latin'],
})
export default function RootLayout({
  children, modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <TanstackProvider>
          <AuthProvider>
        <Header />
          {modal}
          {children}
            <Footer />
            </AuthProvider>
          </TanstackProvider>
      </body>
    </html>
  );
}
