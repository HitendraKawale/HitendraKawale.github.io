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
export const projects: Project[] = [
  {
    title: "Mini OpenAI Platform",
    subtitle: "OpenAI-style local AI platform",
    description:
      "Production-style AI platform with FastAPI microservices for chat completions, embeddings, and RAG workflows. Includes request tracing, caching, rate limiting, and a full Docker Compose observability stack.",
    stack: ["FastAPI", "Docker", "Qdrant", "Ollama", "Prometheus", "Grafana"],
    status: "Built",
    href: "https://github.com/HitendraKawale",
    featured: true,
  },
  {
    title: "LLM Evaluation Platform",
    subtitle: "Backend for testing and comparing LLM outputs",
    description:
      "Backend system for managing model configs, datasets, prompt templates, evaluation runs, persisted outputs, and scoring summaries — full model comparison workflow in one place.",
    stack: ["FastAPI", "PostgreSQL", "SQLAlchemy", "Alembic", "Ollama"],
    status: "Built",
    href: "https://github.com/HitendraKawale",
    featured: true,
  },
  {
    title: "3DGS Scribble Segmentation",
    subtitle: "Interactive segmentation for 3D Gaussian Splatting",
    description:
      "Research-grade computer vision project extending a 3D Gaussian Splatting segmentation pipeline with scribble-guided refinement, context-aware filtering, and mask-based evaluation.",
    stack: ["Python", "PyTorch", "3DGS", "SAM", "Computer Vision"],
    status: "Research",
    href: "https://github.com/HitendraKawale",
    featured: true,
  },
  {
    title: "Chat2Study",
    subtitle: "RAG system for turning AI chats into study material",
    description:
      "RAG application that ingests AI chat conversations, extracts artifacts, indexes content, and generates structured study notes from long technical sessions.",
    stack: ["FastAPI", "Next.js", "PostgreSQL", "Redis", "Ollama"],
    status: "In Progress",
    href: "https://github.com/HitendraKawale",
  },
];
