import Image from 'next/image'
import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex flex-col justify-center bg-blue-600'>
      <Link href='/register'>
        Register
      </Link>

    </main>
  )
}
