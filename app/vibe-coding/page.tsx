import {
  getGitHubProfileData,
  type GitHubLanguage,
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

function getMonitorTopic(topics: string[]): string | null {
  return topics.find((topic) => topic.startsWith("monitor-")) ?? null;
}

const hiddenTopicPrefixes = ["monitor-", "product-", "component-"];

function isDisplayTopic(topic: string): boolean {
  return (
    topic !== "product-primary" &&
    !hiddenTopicPrefixes.some((prefix) => topic.startsWith(prefix))
  );
}

function getProductTopic(repository: GitHubProfileRepository): string | null {
  return (
    repository.topics.find(
      (topic) => topic.startsWith("product-") && topic !== "product-primary",
    ) ?? null
  );
}

function formatProductName(value: string): string {
  return value
    .replace(/^product-/, "")
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getComponentLabel(repository: GitHubProfileRepository): string {
  const topic = repository.topics.find((item) => item.startsWith("component-"));
  if (!topic) return "Repository";

  return topic
    .replace(/^component-/, "")
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

interface ProductGroup {
  key: string;
  name: string;
  primary: GitHubProfileRepository;
  repositories: GitHubProfileRepository[];
  languages: GitHubLanguage[];
  topics: string[];
  monitorTopic: string | null;
  stars: number;
}

function groupPinnedRepositories(
  repositories: GitHubProfileRepository[],
): ProductGroup[] {
  const groups = new Map<string, GitHubProfileRepository[]>();

  for (const repository of repositories) {
    const productTopic = getProductTopic(repository);
    const key = productTopic ?? `repository-${repository.nameWithOwner}`;
    groups.set(key, [...(groups.get(key) ?? []), repository]);
  }

  return Array.from(groups, ([key, members]) => {
    const primary =
      members.find((repository) => repository.topics.includes("product-primary")) ??
      members.find((repository) => repository.homepageUrl) ??
      members[0];
    const productTopic = key.startsWith("product-") ? key : null;

    return {
      key,
      name: productTopic ? formatProductName(productTopic) : primary.name,
      primary,
      repositories: members,
      languages: Array.from(
        new Map(
          members
            .map((repository) => repository.primaryLanguage)
            .filter((language): language is GitHubLanguage => language !== null)
            .map((language) => [language.name, language]),
        ).values(),
      ),
      topics: Array.from(
        new Set(members.flatMap((repository) => repository.topics.filter(isDisplayTopic))),
      ),
      monitorTopic:
        members.map((repository) => getMonitorTopic(repository.topics)).find(Boolean) ??
        null,
      stars: members.reduce((total, repository) => total + repository.stargazerCount, 0),
    };
  });
}

function formatUptime(uptime: number | null): string | null {
  if (uptime === null) return null;
  return `${(uptime * 100).toFixed(2)}% uptime`;
}

function ProjectStatus({
  monitorTopic,
  statuses,
}: {
  monitorTopic: string | null;
  statuses: ServiceStatusMap | null;
}) {
  if (!monitorTopic) return null;

  const status: ServiceStatus | undefined = statuses?.[monitorTopic];

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
  const products = data ? groupPinnedRepositories(data.pinned) : [];

  return (
    <div className="site-container-wide vibe-repos-page">
      <header className="vibe-repos-header">
        <h1>Projects &amp; inspirations.</h1>
        <p>我正在构建的项目，以及最近关注的开源作品。</p>
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
              <h2 id="pinned-title">Products</h2>
              <span>{products.length}</span>
            </div>

            <div className="vibe-pinned-grid">
              {products.map((product, index) => (
                <article
                  className="vibe-pinned-card"
                  key={product.key}
                  style={{
                    "--repo-color":
                      product.primary.primaryLanguage?.color ||
                      "var(--color-accent)",
                    "--card-index": index,
                  } as CSSProperties}
                >
                  <div className="vibe-pinned-card-heading">
                    <h3>{product.name}</h3>
                    <ProjectStatus
                      monitorTopic={product.monitorTopic}
                      statuses={statuses}
                    />
                  </div>

                  <p className="vibe-repo-description">
                    {product.primary.description || "这个产品还没有添加简介。"}
                  </p>

                  {(product.languages.length > 0 || product.topics.length > 0) && (
                    <div className="vibe-repo-topics" aria-label="产品 Topics">
                      {product.languages.map((language) => (
                        <span className="vibe-repo-topic-language" key={language.name}>
                          <i
                            aria-hidden="true"
                            style={{
                              backgroundColor:
                                language.color || "var(--color-accent)",
                            }}
                          />
                          {language.name}
                        </span>
                      ))}
                      {product.topics.map((topic) => (
                        <span key={topic}>{topic}</span>
                      ))}
                    </div>
                  )}

                  <div className="vibe-product-repositories">
                    <span className="vibe-product-repositories-label">Repositories</span>
                    {product.repositories.map((repository) => (
                      <a
                        href={repository.url}
                        key={repository.nameWithOwner}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>{repository.name}</span>
                        <small>{getComponentLabel(repository)}</small>
                        <i aria-hidden="true">↗</i>
                      </a>
                    ))}
                  </div>

                  <div className="vibe-repo-meta">
                    <span>★ {formatCount(product.stars)}</span>
                    {product.primary.homepageUrl && (
                      <a
                        className="vibe-product-link"
                        href={product.primary.homepageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View product ↗
                      </a>
                    )}
                  </div>
                </article>
              ))}
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
