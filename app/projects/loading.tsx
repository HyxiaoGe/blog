export default function ProjectsLoading() {
  return (
    <div className="site-container" aria-busy="true" aria-live="polite">
      <div className="loading-skeleton loading-title" />
      <div className="project-loading-grid">
        {Array.from({ length: 4 }, (_, index) => (
          <div className="loading-skeleton project-loading-card" key={index} />
        ))}
      </div>
      <span className="sr-only">项目数据加载中</span>
    </div>
  );
}
