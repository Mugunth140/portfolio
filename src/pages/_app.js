import '@/styles/globals.scss'
import { AnimatePresence } from 'framer-motion'
import Navbar from '@/components/Navbar/navbar';

export default function App({ Component, pageProps, router }) {
    return (
        <div className='main'>
            <Navbar />
            <AnimatePresence mode='wait'>
                <Component key={router.route} {...pageProps} />
            </AnimatePresence>
        </div>
    )
}
