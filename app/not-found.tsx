"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const NotFoundPage = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center text-muted-foreground'>
        <h1 className='text-4xl'>404</h1>
        <p>We couldn&apos;t find that page.</p>
        <Button variant="secondary" asChild>
            <Link href='/'>Go back home</Link>
        </Button>
    </div>
  )
}

export default NotFoundPage