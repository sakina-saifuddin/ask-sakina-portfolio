import { notFound } from "next/navigation";
import { projects } from "@/data/portfolio";
import { ProjectBook } from "@/components/ProjectBook";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return { title: project ? `${project.title} — the book` : "Project book" };
}

export default async function ProjectBookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return <ProjectBook project={project} />;
}
