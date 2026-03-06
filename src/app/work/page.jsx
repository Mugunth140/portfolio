import AnimatedText from '../../components/AnimatedText';
import ProjectCard from '../../components/ProjectCard';
import { PROJECTS } from '../../constants/data.constant';

export const metadata = {
  title: 'Work | Mugunth',
  description: 'Selected projects by Mugunth',
};

export default function Work() {
  return (
    <main className="min-h-screen px-6 md:px-12 lg:px-20 pt-16 pb-24">
      {/* ── Header ── */}
      <div className="border-b border-color-secondary/20 pb-6 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <AnimatedText
          text="Work."
          tag="h1"
          className="font-humane text-[18vw] md:text-[12vw] leading-none uppercase tracking-tight text-foreground"
        />
        <p className="text-sm font-mono text-foreground/40 mb-2">
          {PROJECTS.length} selected {PROJECTS.length === 1 ? 'project' : 'projects'}
        </p>
      </div>

      {/* ── Project list ── */}
      <div className="flex flex-col">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </main>
  );
}
