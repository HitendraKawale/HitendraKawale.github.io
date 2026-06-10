import raw from "./projects.json";

export type Project = {
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  status: "Built" | "Research" | "In Progress";
  href?: string;
  featured?: boolean;
};

// Project data lives in projects.json so the local admin panel (/admin in dev)
// can read and write it. Set featured: true to show on the home page (max 3).
export const projects: Project[] = raw as Project[];
