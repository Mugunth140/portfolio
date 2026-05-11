import type { Metadata } from 'next';
import ContactClient from '@/components/ContactClient';

export const metadata: Metadata = {
  title: 'Contact',
  description: "Let's build something real. Open to freelance, contracts, and full-time roles.",
};

export default function ContactPage() {
  return <ContactClient />;
}
