import type { APIRoute } from "astro";
import fs from "node:fs/promises";
import path from "node:path";
import type { Project } from "../../data/projects";

export const prerender = false;

const DATA_FILE = path.resolve(process.cwd(), "src/data/projects.json");
const STATUSES = ["Built", "Research", "In Progress"] as const;

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

async function readProjects(): Promise<Project[]> {
  return JSON.parse(await fs.readFile(DATA_FILE, "utf-8"));
}

async function writeProjects(projects: Project[]) {
  await fs.writeFile(DATA_FILE, JSON.stringify(projects, null, 2) + "\n");
}

export const POST: APIRoute = async ({ request }) => {
  if (!import.meta.env.DEV) return json(403, { error: "Admin is dev-only." });

  const body = await request.json().catch(() => null);
  if (!body) return json(400, { error: "Invalid JSON body." });

  const { title, subtitle, description, stack, status, href, featured } = body;
  if (!title?.trim() || !subtitle?.trim() || !description?.trim())
    return json(400, { error: "Title, subtitle, and description are required." });
  if (!STATUSES.includes(status))
    return json(400, { error: `Status must be one of: ${STATUSES.join(", ")}.` });
  if (!Array.isArray(stack) || stack.some((s: unknown) => typeof s !== "string"))
    return json(400, { error: "Stack must be a list of strings." });

  const project: Project = {
    title: title.trim(),
    subtitle: subtitle.trim(),
    description: description.trim(),
    stack: stack.map((s: string) => s.trim()).filter(Boolean),
    status,
    ...(href?.trim() ? { href: href.trim() } : {}),
    ...(featured ? { featured: true } : {}),
  };

  const projects = await readProjects();
  projects.push(project);
  await writeProjects(projects);
  return json(201, { ok: true, count: projects.length });
};

export const DELETE: APIRoute = async ({ url }) => {
  if (!import.meta.env.DEV) return json(403, { error: "Admin is dev-only." });

  const index = Number(url.searchParams.get("index"));
  const projects = await readProjects();
  if (!Number.isInteger(index) || index < 0 || index >= projects.length)
    return json(400, { error: "Invalid project index." });

  const [removed] = projects.splice(index, 1);
  await writeProjects(projects);
  return json(200, { ok: true, removed: removed.title });
};
