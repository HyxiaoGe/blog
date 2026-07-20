import Link from "next/link";

export default function NotFound() {
  return (
    <div className="site-container" style={{ paddingTop: 48, textAlign: "center" }}>
      <p style={{ color: "var(--color-accent)", fontWeight: 700, marginBottom: 12 }}>404</p>
      <h1 style={{ fontSize: 32, marginBottom: 12 }}>没有找到这个页面</h1>
      <p style={{ color: "var(--color-text-secondary)", marginBottom: 24 }}>
        链接可能已经失效，或者页面已被移动。
      </p>
      <Link className="retry-button" href="/">
        返回首页
      </Link>
    </div>
  );
}
