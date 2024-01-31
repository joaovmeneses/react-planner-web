import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-center bg-blue-600">
      <Link href="/register">Register</Link>
      <Link href="/site">Site</Link>
      <Link href="/test_timer">TEST</Link>

    </main>
  );
}
