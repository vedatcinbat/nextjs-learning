import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";

export default function Home() {
  // We can use console.log to see the message in the terminal not in the browser 
  // becasue this code is running on the server side
  console.log('Home Page');
  return (
    <main>
      <Header />
      <p>Let's ge started!</p>
      {/* <p><a href="/about">About Us</a></p> */}
      <p><Link href="/about">About Us</Link></p>
    </main>
  );
}
