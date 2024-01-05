import UserInterface from '@/components/UserInterface'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
   <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <UserInterface backendName='go' />
   </div>
  )
}
