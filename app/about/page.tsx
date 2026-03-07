import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

const techStack = [
  { category: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["FastAPI", "Python", "Go", "Node.js"] },
  { category: "AI/ML", items: ["LangChain", "OpenAI", "Gemini", "ChromaDB"] },
  { category: "DevOps", items: ["Docker", "GitHub Actions", "Nginx", "PostgreSQL"] },
];

export default function AboutPage() {
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
        About Me
      </h1>
      <div
        style={{
          height: 1,
          backgroundColor: "var(--color-border)",
          margin: "32px 0",
        }}
      />

      {/* Intro */}
      <div className="prose" style={{ marginBottom: 48 }}>
        <p>
          Hi, I&apos;m <strong>Sean</strong>，一名软件工程师，坐标深圳。
        </p>
        <p>
          我热衷于探索 AI 应用开发，喜欢用技术解决实际问题。目前主要做全栈开发，专注于 AI 应用和开发工具的构建。
        </p>
        <p>
          工作之余，我会维护一些开源项目，把学到的东西写成博客分享。信奉一句话：<em>&quot;Execution beats perfection.&quot;</em>
        </p>
      </div>

      {/* Tech Stack */}
      <section style={{ marginBottom: 48 }}>
        <h2
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 24,
            color: "var(--color-text-tertiary)",
          }}
        >
          Tech Stack
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 16,
          }}
        >
          {techStack.map((group) => (
            <div
              key={group.category}
              style={{
                padding: 20,
                borderRadius: 12,
                border: "1px solid var(--color-border)",
                backgroundColor: "var(--color-surface)",
              }}
            >
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: 12,
                  color: "var(--color-text)",
                }}
              >
                {group.category}
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {group.items.map((item) => (
                  <span
                    key={item}
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      padding: "4px 10px",
                      borderRadius: 6,
                      backgroundColor: "var(--color-bg-secondary)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section>
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
          Find Me
        </h2>
        <div style={{ display: "flex", gap: 20 }}>
          <a
            href="https://github.com/HyxiaoGe"
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 14,
              fontWeight: 500,
              color: "var(--color-text-secondary)",
              textDecoration: "none",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>
      </section>
    </div>
  );
}
