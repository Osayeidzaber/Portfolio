export interface ProjectDetails {
  name: string;
  description: string;
  html_url: string;
  homepage?: string;
  preview_image?: string;
  technologies: string[];
  features: string[];
  stats: {
    stars: number;
    forks: number;
  };
  created_at: string;
  language?: string;
  topics?: string[];
} 