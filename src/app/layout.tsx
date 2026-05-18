import type { Metadata } from "next";
import { Fjalla_One, Syne } from "next/font/google";
import "./globals.css";

const fjalla = Fjalla_One({
  variable: "--font-fjalla",
  subsets: ["latin"],
  weight: "400",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://autocentrumzuidplas.nl"),
  title: {
    default: "Autocentrum Zuidplas – Occasions in Nieuwerkerk aan den IJssel",
    template: "%s | Autocentrum Zuidplas",
  },
  description:
    "Autocentrum Zuidplas – lokaal autobedrijf in Nieuwerkerk aan den IJssel. Tweedehands auto's, eerlijke prijzen en persoonlijk advies.",
  openGraph: {
    title: "Autocentrum Zuidplas",
    description:
      "Tweedehands auto's en onderdelen — Nieuwerkerk aan den IJssel.",
    url: "https://autocentrumzuidplas.nl",
    siteName: "Autocentrum Zuidplas",
    locale: "nl_NL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Stack+Sans+Text:wght@200..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${fjalla.variable} ${syne.variable} antialiased bg-black text-[#ededed]`}
      >
        {children}
      </body>
    </html>
  );
}
