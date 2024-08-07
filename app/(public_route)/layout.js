import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import connectDB from "@/lib/db";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Auth by Lucia Auth",
  description: "Generated by create next app",
};

const initialDatabase = async () => {
  try {
    await connectDB();
  } catch (err) {
    console.log(err);
  }
};

initialDatabase();

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="cupcake">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
