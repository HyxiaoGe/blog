export default function Loading() {
  return (
    <div className="site-container" aria-busy="true" aria-live="polite">
      <div className="loading-skeleton loading-title" />
      <div className="loading-skeleton loading-line" />
      <div className="loading-skeleton loading-line loading-line-short" />
      <span className="sr-only">页面加载中</span>
    </div>
  );
}
