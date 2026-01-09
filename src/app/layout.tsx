import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Karthick Sakkaravarthi - Software Developer",
  description: "Personal website of Karthick Sakkaravarthi. Explore my projects, career updates, and blog posts.",
  keywords: ["Karthick Sakkaravarthi", "Software Developer", "Portfolio", "Projects", "Blog"],
  authors: [{ name: "Karthick Sakkaravarthi" }],
  openGraph: {
    title: "Karthick Sakkaravarthi - Software Developer",
    description: "Personal website of Karthick Sakkaravarthi. Explore my projects, career updates, and blog posts.",
    url: "https://karthick.sakkaravarthi.com",
    siteName: "Karthick Sakkaravarthi",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karthick Sakkaravarthi - Software Developer",
    description: "Personal website of Karthick Sakkaravarthi. Explore my projects, career updates, and blog posts.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
