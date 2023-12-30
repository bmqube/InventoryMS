import { Inter } from "next/font/google";

import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Inventory Management System",
  description:
    "An efficient system for tracking goods across your supply chain. It optimizes the entire spectrum spanning from order placement with your vendor to order delivery to your customer, mapping the complete journey of a product.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
