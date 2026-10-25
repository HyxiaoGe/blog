import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Sean，坐标深圳的 Agent 全栈工程师。",
};

const highlights = [
  {
    title: "从 0 到上线做完 Fusion",
    detail:
      "2025-02 至今 3100+ 次提交、520+ 个合并 PR，前后端合计 5600+ 个测试用例；PR 门禁检查，合并后自动构建并发布。",
  },
  {
    title: "长回答流式处理提速约 80 倍",
    detail:
      "模型 104 秒就生成完的 4.8 万字回答，服务端处理却要 1247 秒。定位到每个增量都对全文重新扫描的平方级开销，优化后降到 15.5 秒。",
  },
  {
    title: "Agent 执行轨迹不再丢失",
    detail:
      "并行调用 3 个以上工具时，约 18% 的运行会丢掉整段轨迹。用诊断日志定位到瞬时的写入名额争用，拆开旁路写入后，并发压测 18 个运行全部完整记录。",
  },
  {
    title: "按实测数据做选型",
    detail:
      "网页读取对比同一批 120 个网址的耗时与正文质量，设计「免费直连 → 并行付费 → 兜底」的读取调度，单次读取上限 10 秒。",
  },
];

const projects = [
  {
    name: "Fusion",
    description: "面向任务执行的 AI 工作台，模型在单个 Agent 循环里自选工具，回答来源可追溯。",
    url: "https://github.com/HyxiaoGe/fusion",
  },
  {
    name: "Agent Tools",
    description: "给 Agent 用的生图、搜索、网页读取服务，统一经网关鉴权和记账。",
    url: "https://github.com/HyxiaoGe/agent-tools",
  },
  {
    name: "WatchMend",
    description: "面向自托管服务器的巡检与告警，确定性规则发现问题，LLM 只读诊断。",
    url: "https://github.com/HyxiaoGe/watchmend",
  },
  {
    name: "Auth Service",
    description: "多应用统一认证：OAuth、邮箱验证码、PKCE、JWT / JWKS 与跨应用 SSO。",
    url: "https://github.com/HyxiaoGe/auth-service",
  },
];

const techStack = [
  { category: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["Python", "FastAPI", "PostgreSQL", "Redis", "Java"] },
  { category: "AI / Agent", items: ["Agent Loop", "Tool Calling", "MCP", "LiteLLM", "RAG", "Milvus"] },
  { category: "DevOps", items: ["Docker", "GitHub Actions", "Prometheus", "Loki", "Nginx"] },
];

const links = [
  {
    label: "GitHub",
    href: "https://github.com/HyxiaoGe",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/hyxiao97",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
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
          Hi, I&apos;m <strong>Sean</strong>，坐标深圳的 Agent 全栈工程师。
        </p>
        <p>
          我把 LLM、工具调用和工作流做成真正可用的线上产品：从交互、前后端和数据，到部署、监控与持续迭代，一个人负责到底。我的做法是让模型处理理解、判断与表达，用确定性的系统守住权限、状态和可靠性边界。
        </p>
        <p>
          这个博客记录我在开发中遇到的真实问题、排查过程和取舍，也包括失败的尝试。信奉一句话：<em>&quot;Execution beats perfection.&quot;</em>
        </p>
      </div>

      <section className="about-section">
        <h2 className="about-heading">What I&apos;ve Built</h2>
        <ul className="about-highlights">
          {highlights.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong>
              <p>{item.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="about-section">
        <h2 className="about-heading">Projects</h2>
        <div className="about-projects">
          {projects.map((project) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="about-project"
            >
              <strong>
                {project.name}
                <span aria-hidden="true">↗</span>
              </strong>
              <p>{project.description}</p>
            </a>
          ))}
        </div>
        <Link href="/vibe-coding" className="about-more">
          查看项目运行状态与更多作品 →
        </Link>
      </section>

      {/* Tech Stack */}
      <section className="about-section">
        <h2 className="about-heading">Tech Stack</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
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
        <h2 className="about-heading">Find Me</h2>
        <div style={{ display: "flex", gap: 20 }}>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
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
              {link.icon}
              {link.label}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
