'use client';
import { Send } from 'lucide-react';
import { useState } from 'react';
import Btn from './Btn';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    }
  };

  const inputBase =
    'w-full bg-transparent border-b border-color-secondary/30 focus:border-tertiary outline-none py-3 text-sm font-mono text-foreground placeholder:text-foreground/30 transition-colors duration-200';

  return (
    <div>
      <p className="text-xs font-mono uppercase tracking-widest text-foreground/40 mb-8">[ Send a message ]</p>
      {status === 'sent' ? (
        <div className="border border-color-secondary/20 rounded-2xl p-8 text-center">
          <p className="font-primary font-medium text-xl mb-2">Message sent!</p>
          <p className="text-sm font-mono text-foreground/50">I'll get back to you soon.</p>
          <button onClick={() => setStatus('idle')} className="mt-4 text-sm font-mono text-tertiary hover:underline">
            Send another message
          </button>
        </div>
      ) : status === 'error' ? (
        <div className="border border-red-500/30 rounded-2xl p-8 text-center">
          <p className="font-primary font-medium text-xl mb-2 text-red-500">Failed to send</p>
          <p className="text-sm font-mono text-foreground/50">{errorMessage}</p>
          <button onClick={() => setStatus('idle')} className="mt-4 text-sm font-mono text-tertiary hover:underline">
            Try again
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div>
            <label htmlFor="name" className="text-xs font-mono text-foreground/40 uppercase tracking-wider block mb-2">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              className={inputBase}
            />
          </div>
          <div>
            <label htmlFor="email" className="text-xs font-mono text-foreground/40 uppercase tracking-wider block mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              className={inputBase}
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="text-xs font-mono text-foreground/40 uppercase tracking-wider block mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              placeholder="Tell me about your project…"
              value={form.message}
              onChange={handleChange}
              className={`${inputBase} resize-none`}
            />
          </div>
          <div>
            <Btn backgroundColor="lch(44.13 80.66 290.69)" type="submit">
              <span className="flex items-center gap-2">
                {status === 'sending' ? 'Sending…' : 'Send message'}
                <Send size={14} />
              </span>
            </Btn>
          </div>
        </form>
      )}
    </div>
  );
}
