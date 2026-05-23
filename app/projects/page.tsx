import Image from "next/image";
import { projects, type ProjectWithGitHub } from "@/content/projects";
import { getScreenshot } from "@/lib/screenshot";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
};

const languageColors: Record<string, string> = {
  TypeScript: "hsl(210 80% 55%)",
  Python: "hsl(210 60% 50%)",
  Go: "hsl(190 70% 45%)",
};

async function getProjectsWithGitHub(): Promise<ProjectWithGitHub[]> {
  const results = await Promise.all(
    projects.map(async (project) => {
      const screenshotPromise = project.demo
        ? getScreenshot(project.demo)
        : Promise.resolve(null);
      try {
        const [repoRes, commitsRes, screenshot] = await Promise.all([
          fetch(`https://api.github.com/repos/${project.repo}`, {
            next: { revalidate: 3600 },
          }),
          fetch(
            `https://api.github.com/repos/${project.repo}/commits?per_page=1`,
            { next: { revalidate: 3600 } }
          ),
          screenshotPromise,
        ]);

        const repo = await repoRes.json();
        const commits = await commitsRes.json();

        return {
          ...project,
          stars: repo.stargazers_count ?? 0,
          forks: repo.forks_count ?? 0,
          updatedAt: repo.pushed_at ?? repo.updated_at ?? "",
          lastCommitMessage: Array.isArray(commits) && commits[0]
            ? commits[0].commit.message.split("\n")[0]
            : "",
          screenshot,
        };
      } catch {
        return {
          ...project,
          stars: 0,
          forks: 0,
          updatedAt: "",
          lastCommitMessage: "",
          screenshot: await screenshotPromise.catch(() => null),
        };
      }
    })
  );
  return results;
}

function timeAgo(dateStr: string): string {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export default async function ProjectsPage() {
  const enriched = await getProjectsWithGitHub();
  const categories = [...new Set(enriched.map((p) => p.category))];

  return (
    <div className="site-container">
      <h1
        style={{
          fontSize: "clamp(2rem, 5vw, 2.5rem)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          marginBottom: 12,
        }}
      >
        Projects
      </h1>
      <p
        style={{
          fontSize: 16,
          color: "var(--color-text-secondary)",
          marginBottom: 40,
        }}
      >
        Some things I&apos;ve built.
      </p>
      <div
        style={{
          height: 1,
          backgroundColor: "var(--color-border)",
          marginBottom: 40,
        }}
      />

      {categories.map((category) => (
        <section key={category} style={{ marginBottom: 48 }}>
          <h2
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 20,
              color: "var(--color-text-tertiary)",
            }}
          >
            {category}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 16,
            }}
          >
            {enriched
              .filter((p) => p.category === category)
              .map((project) => (
                <article
                  key={project.name}
                  className="card-hover"
                  style={{
                    borderRadius: 12,
                    border: "1px solid var(--color-border)",
                    backgroundColor: "var(--color-surface)",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                  }}
                >
                  {/* Screenshot (demo 项目才有) */}
                  {project.screenshot && project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.name} demo`}
                      style={{
                        display: "block",
                        position: "relative",
                        aspectRatio: "16 / 9",
                        backgroundColor: "var(--color-bg-secondary)",
                        borderBottom: "1px solid var(--color-border)",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={project.screenshot}
                        alt={`${project.name} preview`}
                        fill
                        sizes="(max-width: 768px) 100vw, 360px"
                        style={{ objectFit: "cover", objectPosition: "top" }}
                        unoptimized
                      />
                    </a>
                  )}

                  <div style={{ padding: 24, display: "flex", flexDirection: "column", flex: 1 }}>
                  {/* Header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 12,
                    }}
                  >
                    <h3
                      style={{
                        fontSize: 17,
                        fontWeight: 600,
                        color: "var(--color-text)",
                      }}
                    >
                      {project.name}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: 12,
                        color: "var(--color-text-tertiary)",
                      }}
                    >
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor:
                            languageColors[project.language] ||
                            "var(--color-text-tertiary)",
                          display: "inline-block",
                        }}
                      />
                      {project.language}
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: 14,
                      lineHeight: 1.6,
                      color: "var(--color-text-secondary)",
                      marginBottom: 16,
                      flex: 1,
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                      marginBottom: 16,
                    }}
                  >
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: 11,
                          fontWeight: 500,
                          padding: "3px 8px",
                          borderRadius: 6,
                          backgroundColor: "var(--color-bg-secondary)",
                          color: "var(--color-text-tertiary)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* GitHub stats */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      fontSize: 12,
                      color: "var(--color-text-tertiary)",
                      marginBottom: 12,
                    }}
                  >
                    {/* Stars */}
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      {project.stars}
                    </span>
                    {/* Forks */}
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="18" r="3" />
                        <circle cx="6" cy="6" r="3" />
                        <circle cx="18" cy="6" r="3" />
                        <path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9" />
                        <path d="M12 12v3" />
                      </svg>
                      {project.forks}
                    </span>
                    {/* Updated */}
                    {project.updatedAt && (
                      <span>Updated {timeAgo(project.updatedAt)}</span>
                    )}
                  </div>

                  {/* Last commit */}
                  {project.lastCommitMessage && (
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--color-text-tertiary)",
                        marginBottom: 16,
                        padding: "8px 10px",
                        borderRadius: 6,
                        backgroundColor: "var(--color-bg-secondary)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <span style={{ opacity: 0.6, marginRight: 6 }}>
                        latest:
                      </span>
                      {project.lastCommitMessage}
                    </div>
                  )}

                  {/* Links */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      fontSize: 13,
                      fontWeight: 500,
                    }}
                  >
                    <a
                      href={`https://github.com/${project.repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        color: "var(--color-text-secondary)",
                        textDecoration: "none",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                          color: "var(--color-text-secondary)",
                          textDecoration: "none",
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        Demo
                      </a>
                    )}
                  </div>
                  </div>
                </article>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
