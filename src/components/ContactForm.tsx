'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate shipping
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-12 max-w-2xl w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col gap-4">
          <label className="section-label">Name</label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full bg-transparent border-b border-[var(--border)] py-4 font-display font-medium text-[var(--text-lg)] uppercase focus:border-[var(--accent)] outline-none transition-colors placeholder:text-[var(--text-muted)] opacity-50 focus:opacity-100"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-4">
          <label className="section-label">Email</label>
          <input
            type="email"
            placeholder="john@example.com"
            className="w-full bg-transparent border-b border-[var(--border)] py-4 font-display font-medium text-[var(--text-lg)] uppercase focus:border-[var(--accent)] outline-none transition-colors placeholder:text-[var(--text-muted)] opacity-50 focus:opacity-100"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <label className="section-label">Message</label>
        <textarea
          rows={4}
          placeholder="Tell me about your project..."
          className="w-full bg-transparent border-b border-[var(--border)] py-4 font-display font-medium text-[var(--text-lg)] uppercase focus:border-[var(--accent)] outline-none transition-colors resize-none placeholder:text-[var(--text-muted)] opacity-50 focus:opacity-100"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={status === 'submitting'}
        className="group relative self-start px-12 py-6 bg-[var(--accent)] text-[#ffffff] font-display font-bold uppercase tracking-widest text-[var(--text-xs)] rounded-full overflow-hidden transition-all duration-300 disabled:opacity-50 hover:bg-[var(--accent-dark)]"
      >
        <span className="relative z-10">
          {status === 'idle' && 'Send Message →'}
          {status === 'submitting' && 'Shipping...'}
          {status === 'success' && 'Sent Successfully ✓'}
        </span>
      </button>
    </div>
  );
}
