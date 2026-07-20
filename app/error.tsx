"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="site-container" role="alert" style={{ paddingTop: 48, textAlign: "center" }}>
      <h1 style={{ fontSize: 32, marginBottom: 12 }}>页面暂时无法加载</h1>
      <p style={{ color: "var(--color-text-secondary)", marginBottom: 24 }}>
        可能是临时网络问题，请稍后重试。
      </p>
      <button className="retry-button" type="button" onClick={reset}>
        重新加载
      </button>
    </div>
  );
}
