import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-montserrat",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "Natural Gender Selection Methods | Shettles & Chinese Calendar Planner",
  description:
    "Explore traditional gender selection methods with our easy-to-use calculators. Learn about the Shettles Method and Chinese Birth Calendar for conception planning.",
  keywords: [
    "gender selection",
    "shettles method",
    "chinese birth calendar",
    "conception planning",
    "family planning",
    "fertility tracker",
  ],
  openGraph: {
    title: "Natural Gender Selection Methods | Shettles & Chinese Calendar Planner",
    description:
      "Explore traditional gender selection methods with our easy-to-use calculators. Learn about the Shettles Method and Chinese Birth Calendar for conception planning.",
    type: "website",
  },
  icons: {
    icon: "/images/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${openSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
