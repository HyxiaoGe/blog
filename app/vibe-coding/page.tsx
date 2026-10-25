import {
  getGitHubProfileData,
  type GitHubProfileData,
  type GitHubProfileRepository,
} from "@/lib/github-profile";
import {
  getServiceStatuses,
  type ServiceStatus,
  type ServiceStatusMap,
} from "@/lib/uptime-status";
import type { Metadata } from "next";
import type { CSSProperties } from "react";

export const metadata: Metadata = {
  title: "Vibe Coding",
  description: "Sean 的项目与最近关注的开源作品。",
};

export const revalidate = 3600;

const numberFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

function formatCount(value: number): string {
  return numberFormatter.format(value).toLowerCase();
}

function formatStarredAt(date: string): string {
  const days = Math.max(
    0,
    Math.floor((Date.now() - new Date(date).getTime()) / 86_400_000),
  );

  if (days === 0) return "今天收藏";
  if (days === 1) return "昨天收藏";
  if (days < 30) return `${days} 天前收藏`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} 个月前收藏`;

  return `${Math.floor(months / 12)} 年前收藏`;
}

const statusLabels = {
  online: "Online",
  offline: "Offline",
  pending: "Pending",
  maintenance: "Maintenance",
  unknown: "Unknown",
} as const;

const hiddenTopicPrefixes = ["monitor-", "product-", "component-"];
const MAX_TOPICS = 6;

function getDisplayTopics(topics: string[]): string[] {
  return topics
    .filter((topic) => !hiddenTopicPrefixes.some((prefix) => topic.startsWith(prefix)))
    .slice(0, MAX_TOPICS);
}

interface ProjectProfile {
  name: string;
  monitorKey?: string;
  highlight?: string;
}

// 置顶仓库的展示名、状态监控与一句话亮点；未列出的仓库按仓库名展示、不显示状态。
const projectProfiles: Record<string, ProjectProfile> = {
  fusion: {
    name: "Fusion",
    monitorKey: "monitor-fusion",
    highlight: "长回答流式处理提速约 80 倍；并发压测 18 个 Agent 运行，执行轨迹全部完整记录。",
  },
  "agent-tools": {
    name: "Agent Tools",
    highlight: "网页读取先免费直连、1.5 秒后并行请求付费服务，单次读取上限 10 秒。",
  },
  watchmend: {
    name: "WatchMend",
    highlight: "确定性规则负责发现问题，LLM 只做只读诊断与降噪。",
  },
  "auth-service": {
    name: "Auth Service",
    monitorKey: "monitor-auth",
    highlight: "一套服务支撑多个独立应用的登录与跨应用单点登录。",
  },
};

function getProjectProfile(repository: GitHubProfileRepository): ProjectProfile {
  return projectProfiles[repository.name.toLowerCase()] ?? { name: repository.name };
}

function formatUptime(uptime: number | null): string | null {
  if (uptime === null) return null;
  return `${(uptime * 100).toFixed(2)}% uptime`;
}

function ProjectStatus({
  monitorKey,
  statuses,
}: {
  monitorKey: string | undefined;
  statuses: ServiceStatusMap | null;
}) {
  if (!monitorKey) return null;

  const status: ServiceStatus | undefined = statuses?.[monitorKey];

  if (!status) {
    return (
      <div className="vibe-service-summary">
        <span className="vibe-service-status vibe-service-status-unknown">
          <i aria-hidden="true" />
          Status unavailable
        </span>
      </div>
    );
  }

  const uptime = formatUptime(status.uptime24);

  return (
    <div className="vibe-service-summary">
      <span className={`vibe-service-status vibe-service-status-${status.state}`}>
        <i aria-hidden="true" />
        {statusLabels[status.state]}
      </span>
      {uptime && <span className="vibe-service-uptime">{uptime}</span>}
    </div>
  );
}

async function loadProfileData(): Promise<GitHubProfileData | null> {
  try {
    return await getGitHubProfileData();
  } catch {
    return null;
  }
}

async function loadServiceStatuses(): Promise<ServiceStatusMap | null> {
  try {
    return await getServiceStatuses();
  } catch {
    return null;
  }
}

export default async function VibeCodingPage() {
  const [data, statuses] = await Promise.all([
    loadProfileData(),
    loadServiceStatuses(),
  ]);
  const projects = data?.pinned ?? [];

  return (
    <div className="site-container-wide vibe-repos-page">
      <header className="vibe-repos-header">
        <h1>Projects &amp; inspirations.</h1>
        <p>我独立设计、开发并长期运维的线上项目，以及最近关注的开源作品。</p>
      </header>

      {!data ? (
        <div className="vibe-data-notice" role="status">
          <strong>暂时无法读取 GitHub 数据</strong>
          <span>请稍后刷新页面。</span>
        </div>
      ) : (
        <>
          <section className="vibe-repos-section" aria-labelledby="pinned-title">
            <div className="vibe-repos-section-heading">
              <h2 id="pinned-title">Projects</h2>
              <span>{projects.length}</span>
            </div>

            <div className="vibe-pinned-grid">
              {projects.map((repository, index) => {
                const profile = getProjectProfile(repository);
                const topics = getDisplayTopics(repository.topics);

                return (
                  <article
                    className="vibe-pinned-card"
                    key={repository.nameWithOwner}
                    style={{
                      "--repo-color":
                        repository.primaryLanguage?.color || "var(--color-accent)",
                      "--card-index": index,
                    } as CSSProperties}
                  >
                    <div className="vibe-pinned-card-heading">
                      <h3>{profile.name}</h3>
                      <ProjectStatus monitorKey={profile.monitorKey} statuses={statuses} />
                    </div>

                    <p className="vibe-repo-description">
                      {repository.description || "这个项目还没有添加简介。"}
                    </p>

                    {profile.highlight && (
                      <p className="vibe-repo-highlight">{profile.highlight}</p>
                    )}

                    {(repository.primaryLanguage || topics.length > 0) && (
                      <div className="vibe-repo-topics" aria-label="项目 Topics">
                        {repository.primaryLanguage && (
                          <span className="vibe-repo-topic-language">
                            <i
                              aria-hidden="true"
                              style={{
                                backgroundColor:
                                  repository.primaryLanguage.color || "var(--color-accent)",
                              }}
                            />
                            {repository.primaryLanguage.name}
                          </span>
                        )}
                        {topics.map((topic) => (
                          <span key={topic}>{topic}</span>
                        ))}
                      </div>
                    )}

                    <div className="vibe-repo-meta">
                      <span>★ {formatCount(repository.stargazerCount)}</span>
                      <a
                        className="vibe-repo-link"
                        href={repository.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub ↗
                      </a>
                      {repository.homepageUrl && (
                        <a
                          className="vibe-product-link"
                          href={repository.homepageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View product ↗
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section
            className="vibe-repos-section vibe-starred-section"
            aria-labelledby="starred-title"
          >
            <div className="vibe-repos-section-heading">
              <h2 id="starred-title">Recently Starred</h2>
              <span>{data.recentlyStarred.length}</span>
            </div>

            <div className="vibe-starred-list">
              {data.recentlyStarred.map((repository) => (
                <a
                  className="vibe-starred-item"
                  href={repository.url}
                  key={`${repository.nameWithOwner}-${repository.starredAt}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    "--repo-color":
                      repository.primaryLanguage?.color ||
                      "var(--color-accent)",
                  } as CSSProperties}
                >
                  <div className="vibe-starred-copy">
                    <h3>{repository.nameWithOwner}</h3>
                    <p>{repository.description || "这个仓库还没有添加简介。"}</p>
                    <span>{formatStarredAt(repository.starredAt)}</span>
                  </div>

                  <div className="vibe-starred-meta">
                    {repository.primaryLanguage && (
                      <span className="vibe-repo-language">
                        <i
                          aria-hidden="true"
                          style={{
                            backgroundColor:
                              repository.primaryLanguage.color ||
                              "var(--color-text-tertiary)",
                          }}
                        />
                        {repository.primaryLanguage.name}
                      </span>
                    )}
                    <span>★ {formatCount(repository.stargazerCount)}</span>
                    <i aria-hidden="true">↗</i>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
