"use client";

import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
  highlightedHtml: string;
}

export function CodeBlock({ code, language, filename, highlightedHtml }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block">
      <div className="code-block-header">
        <span>{filename || language}</span>
        <button className="code-block-copy" onClick={handleCopy}>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
    </div>
  );
}
