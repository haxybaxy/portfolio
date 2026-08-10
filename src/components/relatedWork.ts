import { jobData } from "./jobData";
import { projectsData } from "./projectsData";
import type { Job, Project } from "../types";

/**
 * The experience <-> project relation is declared once, on Job.relatedProjects,
 * and resolved in both directions here so the two datasets cannot drift apart.
 * Projects are identified by title (the only unique field) but selected by
 * index, since that is what the projects UI addresses them with.
 */
export interface RelatedProject {
  project: Project;
  index: number;
}

export function getRelatedProjects(job: Job): RelatedProject[] {
  if (!job.relatedProjects) {
    return [];
  }

  return job.relatedProjects.reduce<RelatedProject[]>((acc, title) => {
    const index = projectsData.findIndex((project) => project.title === title);
    if (index === -1) {
      console.warn(`relatedWork: job "${job.value}" references unknown project "${title}"`);
      return acc;
    }
    acc.push({ project: projectsData[index], index });
    return acc;
  }, []);
}

export function getRelatedJobs(projectTitle: string): Job[] {
  return jobData.filter((job) => job.relatedProjects?.includes(projectTitle));
}
