import type { APIRoute } from "astro";
import fs from "node:fs/promises";
import path from "node:path";

export const prerender = false;

const BLOG_DIR = path.resolve(process.cwd(), "src/content/blog");
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
// Permanent draft that keeps the collection non-empty so the dev-server
// content watcher stays registered. Must never be deleted or overwritten.
export const SEED_SLUG = "scriptorium-seed";

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const POST: APIRoute = async ({ request }) => {
  if (!import.meta.env.DEV) return json(403, { error: "Admin is dev-only." });

  const body = await request.json().catch(() => null);
  if (!body) return json(400, { error: "Invalid JSON body." });

  const { title, description, date, tags, draft, content } = body;
  if (!title?.trim() || !description?.trim())
    return json(400, { error: "Title and description are required." });
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date ?? ""))
    return json(400, { error: "Date must be YYYY-MM-DD." });
  if (tags && (!Array.isArray(tags) || tags.some((t: unknown) => typeof t !== "string")))
    return json(400, { error: "Tags must be a list of strings." });

  const slug = slugify(title);
  if (!SLUG_RE.test(slug))
    return json(400, { error: "Title must contain at least one letter or number." });
  if (slug === SEED_SLUG)
    return json(400, { error: "That slug is reserved." });

  const file = path.join(BLOG_DIR, `${slug}.md`);
  try {
    await fs.access(file);
    return json(409, { error: `A post with slug "${slug}" already exists.` });
  } catch {
    // file doesn't exist — good
  }

  const cleanTags = (tags ?? []).map((t: string) => t.trim()).filter(Boolean);
  const frontmatter = [
    "---",
    `title: ${JSON.stringify(title.trim())}`,
    `description: ${JSON.stringify(description.trim())}`,
    `date: ${date}`,
    ...(cleanTags.length ? [`tags: ${JSON.stringify(cleanTags)}`] : []),
    ...(draft ? ["draft: true"] : []),
    "---",
  ].join("\n");

  await fs.writeFile(file, `${frontmatter}\n\n${(content ?? "").trim()}\n`);
  return json(201, { ok: true, slug });
};

export const DELETE: APIRoute = async ({ url }) => {
  if (!import.meta.env.DEV) return json(403, { error: "Admin is dev-only." });

  const slug = url.searchParams.get("slug") ?? "";
  if (!SLUG_RE.test(slug)) return json(400, { error: "Invalid slug." });
  if (slug === SEED_SLUG) return json(403, { error: "The seed post cannot be deleted." });

  try {
    await fs.unlink(path.join(BLOG_DIR, `${slug}.md`));
  } catch {
    return json(404, { error: `No post with slug "${slug}".` });
  }
  return json(200, { ok: true, removed: slug });
};
