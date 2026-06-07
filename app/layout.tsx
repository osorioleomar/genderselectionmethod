import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import Script from "next/script";
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
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "qoebo51gmq");`}
        </Script>
      </body>
    </html>
  );
}
