import './globals.css';
import Navbar from '../components/Navbar';
import Loader from '@/components/Loader';

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });

export const metadata = {
  title: 'Mugunth | Portfolio',
  description: 'A Designer and Developer',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-primary">
        <Loader>
          <Navbar />
          {children}
        </Loader>
      </body>
    </html>
  );
}
