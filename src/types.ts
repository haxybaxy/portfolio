export type Theme = 'light' | 'dark';

export type SectionId = 'about' | 'experience' | 'projects' | 'blog';

export type VimMode = 'NORMAL' | 'VISUAL';

export interface Job {
  value: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  content: string[];
  skills: string[];
  /** Titles of projects in projectsData that came out of this role */
  relatedProjects?: string[];
}

export interface Project {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  tmuxname: string;
  github?: string;
  link?: string;
  icons: Record<string, string>;
}

export interface BlogPost {
  /** Derived from the filename, so posts can be reordered without breaking URLs */
  slug: string;
  title: string;
  /** ISO YYYY-MM-DD */
  date: string;
  description: string;
  tags: string[];
  draft?: boolean;
  /** Raw markdown, everything after the frontmatter block */
  body: string;
}

export interface Skill {
  name: string;
  icon: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}
