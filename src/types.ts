export type Theme = 'light' | 'dark';

export type SectionId = 'about' | 'experience' | 'projects';

export type VimMode = 'NORMAL' | 'VISUAL';

export interface Job {
  value: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  content: string[];
  skills: string[];
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

export interface Skill {
  name: string;
  icon: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}
