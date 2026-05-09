import Link from 'next/link';
import { SOCIALS } from '../constants/routes.constant';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary">
      {/* Footer content */}
      <div className="border-t border-color-secondary/20">
        <div className="px-6 md:px-12 lg:px-20 py-8 md:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand */}
          <div>
            <p className="font-medium text-lg font-primary">Mugunth</p>
            <p className="text-sm font-mono text-foreground/40 mt-1">Designer &amp; Developer</p>
          </div>

          {/* Social links */}
          <ul className="flex flex-wrap gap-6">
            {SOCIALS.map((social) => (
              <li key={social.name}>
                <Link
                  href={social.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-mono text-foreground/50 hover:text-tertiary transition-colors duration-200"
                >
                  {social.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Copy */}
          <p className="text-xs font-mono text-foreground/30">© {year} Mugunth. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
