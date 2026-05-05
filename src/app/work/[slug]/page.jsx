import { notFound } from 'next/navigation';
import { PROJECTS } from '@/constants/data.constant';
import ProjectDetail from './ProjectDetail';

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: `${project.name} | Mugunth`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[projectIndex];

  if (!project) {
    notFound();
  }

  const nextProject = projectIndex < PROJECTS.length - 1 ? PROJECTS[projectIndex + 1] : null;
  const prevProject = projectIndex > 0 ? PROJECTS[projectIndex - 1] : null;

  return (
    <ProjectDetail
      project={project}
      nextProject={nextProject}
      prevProject={prevProject}
      projectIndex={projectIndex}
      totalProjects={PROJECTS.length}
    />
  );
}
