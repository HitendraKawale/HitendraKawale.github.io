export type Project = {
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  status: "Built" | "Research" | "In Progress";
  href?: string;
};

export const projects: Project[] = [
  {
    title: "Mini OpenAI Platform",
    subtitle: "OpenAI-style local AI platform",
    description:
      "A production-style AI platform with FastAPI microservices for chat completions, embeddings, RAG workflows, request tracing, caching, rate limiting, Docker Compose, Prometheus, and Grafana.",
    stack: ["FastAPI", "Docker", "Qdrant", "Ollama", "Prometheus", "Grafana"],
    status: "Built",
    href: "https://github.com/HitendraKawale",
  },
  {
    title: "LLM Evaluation Platform",
    subtitle: "Backend for testing and comparing LLM outputs",
    description:
      "A backend system for managing model configs, datasets, prompt templates, evaluation runs, persisted outputs, scoring summaries, and model comparison workflows.",
    stack: ["FastAPI", "Postgres", "SQLAlchemy", "Alembic", "Ollama"],
    status: "Built",
    href: "https://github.com/HitendraKawale",
  },
  {
    title: "3DGS Scribble Segmentation",
    subtitle: "Interactive segmentation for 3D Gaussian Splatting",
    description:
      "A research-style computer vision project extending a 3D Gaussian Splatting segmentation pipeline with scribble-guided refinement, context-aware filtering, and mask-based evaluation.",
    stack: ["Python", "PyTorch", "3DGS", "SAM", "Computer Vision"],
    status: "Research",
    href: "https://github.com/HitendraKawale",
  },
  {
    title: "Chat2Study",
    subtitle: "RAG system for turning AI chats into study material",
    description:
      "A RAG application that ingests AI chat conversations, extracts artifacts, indexes content, supports retrieval, and generates study notes from long technical conversations.",
    stack: ["FastAPI", "Next.js", "Postgres", "Redis", "Ollama"],
    status: "In Progress",
    href: "https://github.com/HitendraKawale",
  },
];
