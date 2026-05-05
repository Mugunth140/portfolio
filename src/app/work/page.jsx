import PageHero from '@/components/PageHero';
import ProjectCard from '../../components/ProjectCard';
import { PROJECTS } from '../../constants/data.constant';
import { getNextRoute } from '../../constants/routes.constant';

export const metadata = {
  title: 'Work | Mugunth',
  description: 'Selected projects by Mugunth',
};

const nextPage = getNextRoute('/work');

export default function Work() {
  return (
    <main className="min-h-screen">
      <PageHero
        title="Work."
        subtitle={`${PROJECTS.length} selected ${PROJECTS.length === 1 ? 'project' : 'projects'}`}
        nextPage={nextPage}
      >
        {/* Project list */}
        <div className="flex flex-col">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </PageHero>
    </main>
  );
}
