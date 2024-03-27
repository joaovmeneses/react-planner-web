import Image from "next/image";
import Link from "next/link";
import Counter from "../shared/contextZustand/CounterByClass";

export default function Home() {
  return (
    <>
      <main className="flex flex-row">
        <Link href="/register">Register</Link>
      </main>
      <div>
        <Counter />
      </div>
    </>
  );
}
