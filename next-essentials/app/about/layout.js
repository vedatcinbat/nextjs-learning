import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App - About",
  description: "Generated by create next app",
};

export default function AboutLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}