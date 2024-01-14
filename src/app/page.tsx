import Image from "next/image";
import Content from "@/components/menu/Content";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-row">
      {/* <Link href="/register">Register</Link> */}
      <Content/>
    </main>
  );
}
