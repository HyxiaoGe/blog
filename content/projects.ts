export interface Project {
  name: string;
  repo: string;
  description: string;
  tech: string[];
  demo?: string;
  language: string;
  category: string;
  /** Uptime Kuma monitor name (e.g. "[Public] Chrono"). If set, card renders live status. */
  monitorName?: string;
}

export interface ProjectWithGitHub extends Project {
  stars: number;
  forks: number;
  updatedAt: string;
  lastCommitMessage: string;
  screenshot: string | null;
}

export const projects: Project[] = [
  {
    name: "Chrono",
    description:
      "Multi-Agent AI 时间线调研系统：输入关键词，多个 Agent 并行调研，渐进式 SSE 推送，生成交互式 Timeline。",
    tech: ["Next.js", "FastAPI", "Pydantic AI", "Tavily"],
    repo: "HyxiaoGe/chrono",
    demo: "https://chrono.seanfield.org",
    language: "Python",
    category: "AI 应用",
    monitorName: "[Public] Chrono",
  },
  {
    name: "Fusion",
    description:
      "多模型 AI 对话应用，统一接入 DeepSeek、OpenAI、文心、通义千问等大模型，支持文件处理、向量检索与多端使用。",
    tech: ["Next.js", "Electron", "FastAPI", "LangChain", "ChromaDB"],
    repo: "HyxiaoGe/fusion-ui",
    demo: "https://fusion.seanfield.org",
    language: "Python",
    category: "AI 应用",
    monitorName: "[Public] Fusion",
  },
  {
    name: "AI Audio",
    description:
      "AI 音视频内容理解助手，支持上传与 YouTube 链接，多厂商 LLM/ASR 接入，输出转写、结构化摘要与实时进度。",
    tech: ["Next.js", "FastAPI", "Celery", "MinIO", "WebSocket"],
    repo: "HyxiaoGe/ai-audio-assistant-ui",
    demo: "https://audio.seanfield.org",
    language: "Python",
    category: "AI 应用",
    monitorName: "[Public] Audio",
  },
];
