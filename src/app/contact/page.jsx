import { ArrowRight, Dribbble, Github, Instagram, Linkedin, Mail } from 'lucide-react';
import AnimatedText from '../../components/AnimatedText';
import ContactForm from '../../components/ContactForm';
import { SOCIALS } from '../../constants/routes.constant';

const SOCIAL_ICONS = { Github, LinkedIn: Linkedin, Instagram, Dribbble };

export const metadata = {
  title: 'Contact | Mugunth',
  description: 'Get in touch with Mugunth',
};

export default function Contact() {
  return (
    <main className="min-h-screen px-6 md:px-12 lg:px-20 pt-16 pb-24">
      {/* ── Header ── */}
      <div className="border-b border-color-secondary/20 pb-6 mb-16">
        <AnimatedText
          text="Contact."
          tag="h1"
          className="font-humane text-[16vw] md:text-[12vw] leading-none uppercase tracking-tight text-foreground"
        />
      </div>

      {/* ── Big email CTA ── */}
      <section className="mb-24">
        <p className="text-xs font-mono uppercase tracking-widest text-foreground/40 mb-6">[ Say hello ]</p>
        <a
          href="mailto:hello@mugunth.live"
          className="group flex items-end gap-4 text-[6vw] md:text-[4vw] font-humane uppercase leading-none text-foreground hover:text-tertiary transition-colors duration-300"
        >
          <Mail size={32} className="mb-1 text-tertiary" />
          hello@mugunth.live
          <ArrowRight
            size={28}
            className="mb-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300"
          />
        </a>
      </section>

      {/* ── Form + Socials ── */}
      <section className="grid md:grid-cols-[1.2fr_1fr] gap-20">
        <ContactForm />

        {/* Socials */}
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-foreground/40 mb-8">[ Find me on ]</p>
          <ul className="flex flex-col gap-4">
            {SOCIALS.map((social) => {
              const Icon = SOCIAL_ICONS[social.name];
              return (
                <li key={social.name}>
                  <a
                    href={social.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 py-4 border-b border-color-secondary/20 hover:border-tertiary transition-colors duration-200"
                  >
                    {Icon && (
                      <Icon size={16} className="text-foreground/40 group-hover:text-tertiary transition-colors" />
                    )}
                    <span className="font-primary font-medium group-hover:text-tertiary transition-colors">
                      {social.name}
                    </span>
                    <ArrowRight
                      size={14}
                      className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 text-tertiary"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </main>
  );
}
