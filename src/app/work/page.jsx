'use client';

import PageHero from '@/components/PageHero';
import ProjectCard from '../../components/ProjectCard';
import NextPageTransition from '@/components/NextPageTransition';
import { PROJECTS } from '../../constants/data.constant';

export default function Work() {
  return (
    <main className="min-h-screen">
      <PageHero title="Work." subtitle={`${PROJECTS.length} selected projects`}>
        <div className="flex flex-col">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </PageHero>
      <NextPageTransition nextRoute="/contact" nextTitle="Contact" />
    </main>
  );
}
