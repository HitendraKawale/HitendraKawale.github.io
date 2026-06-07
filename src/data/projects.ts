export type Project = {
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  status: "Built" | "Research" | "In Progress";
  href?: string;
  featured?: boolean;
};

// Add new projects here — they appear automatically on /projects
// Set featured: true to show on the home page (max 3 recommended)
export const projects: Project[] = [];
