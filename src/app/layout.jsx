import CustomCursor from '@/components/CustomCursor';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';
import '@/plugins/gsap.plugin';
import Navbar from '../components/Navbar';
import './globals.css';

export const metadata = {
  title: 'Mugunth | Portfolio',
  description: 'A Designer and Developer',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-primary custom-cursor-enabled">
        <CustomCursor />
        <Loader>
          <Navbar />
          {children}
        </Loader>
      </body>
    </html>
  );
}
