import { Code2, Download, MapPin, Palette, Sparkles } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Btn from '../../components/Btn';
import { ABOUT, SKILLS } from '../../constants/data.constant';
import { getNextRoute } from '../../constants/routes.constant';

const ICON_MAP = { Code2, Palette, Sparkles };

export const metadata = {
  title: 'About | Mugunth',
  description: 'Designer & Developer from India',
};

const nextPage = getNextRoute('/about');

export default function About() {
  const subtitle = (
    <span className="flex items-center gap-2">
      <MapPin size={14} />
      <span>{ABOUT.location}</span>
    </span>
  );

  return (
    <main className="min-h-screen">
      <PageHero title="About." subtitle={subtitle} nextPage={nextPage}>
        {/* ── Bio ── */}
        <section className="grid md:grid-cols-[1fr_1.2fr] gap-16 mb-24 mt-10">
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-foreground/40 mb-4">[ Who I am ]</p>
              <p className="text-lg md:text-xl font-primary leading-relaxed text-foreground/80">{ABOUT.bio}</p>
            </div>
            <p className="text-sm font-mono text-foreground/50 leading-relaxed">{ABOUT.bio2}</p>
            <div className="flex items-center gap-4">
              <Btn>
                <a href="#" download className="flex items-center gap-2">
                  <Download size={14} /> Download CV
                </a>
              </Btn>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-mono text-foreground/40">{ABOUT.availability}</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6 self-start">
            {[
              { label: 'Year started', value: ABOUT.yearsActive },
              { label: 'Role', value: ABOUT.role },
              { label: 'Location', value: ABOUT.location },
              { label: 'Status', value: ABOUT.availability },
            ].map((stat) => (
              <div key={stat.label} className="border border-color-secondary/20 rounded-2xl p-5">
                <p className="text-xs font-mono text-foreground/40 mb-2 uppercase tracking-wider">{stat.label}</p>
                <p className="font-medium font-primary text-lg">{stat.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Skills ── */}
        <section>
          <p className="text-xs font-mono uppercase tracking-widest text-foreground/40 mb-10">[ Skills & tools ]</p>
          <div className="grid md:grid-cols-3 gap-8">
            {SKILLS.map((group) => {
              const Icon = ICON_MAP[group.icon];
              return (
                <div key={group.category} className="border border-color-secondary/20 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-6">
                    {Icon && <Icon size={16} className="text-tertiary" />}
                    <p className="font-medium font-primary">{group.category}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs font-mono px-3 py-1 border border-color-secondary/30 rounded-full text-foreground/60 hover:border-tertiary hover:text-foreground transition-colors duration-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </PageHero>
    </main>
  );
}
