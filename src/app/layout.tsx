import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/NextUIProvider";
import { Main } from "@/components/Main";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar></Navbar>
          <section className="relative flex flex-col h-screen">
            <Main>{children}</Main>
            <Footer></Footer>
          </section>
        </Providers>
      </body>
    </html>
  );
}
