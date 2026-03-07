export interface Project {
  name: string;
  repo: string;
  description: string;
  tech: string[];
  demo?: string;
  language: string;
  category: string;
}

export interface ProjectWithGitHub extends Project {
  stars: number;
  forks: number;
  updatedAt: string;
  lastCommitMessage: string;
}

export const projects: Project[] = [
  {
    name: "Fusion UI",
    description:
      "现代化 AI 对话应用，基于 Next.js 和 Electron 构建，支持多模型对话、文件处理和向量搜索。",
    tech: ["Next.js", "Electron", "Tailwind CSS", "shadcn/ui"],
    repo: "HyxiaoGe/fusion-ui",
    demo: "https://fusion-ui-self.vercel.app",
    language: "TypeScript",
    category: "AI 应用",
  },
  {
    name: "Fusion API",
    description:
      "统一的多模型 AI 聊天集成平台，支持文心一言、通义千问、DeepSeek、OpenAI 等大模型，提供向量检索和文件处理功能。",
    tech: ["FastAPI", "LangChain", "ChromaDB"],
    repo: "HyxiaoGe/fusion-api",
    language: "Python",
    category: "AI 应用",
  },
  {
    name: "AI Audio Assistant UI",
    description:
      "面向音视频内容理解的 AI 助手前端，支持上传与 YouTube 链接，ASR 转写、结构化摘要与实时进度。",
    tech: ["Next.js", "Tailwind CSS", "WebSocket", "Auth.js"],
    repo: "HyxiaoGe/ai-audio-assistant-ui",
    language: "TypeScript",
    category: "AI 应用",
  },
  {
    name: "AI Audio Assistant API",
    description:
      "音视频助手后端：多厂商 LLM/ASR 统一接入，支持转写、结构化摘要、成本优化与健康监控。",
    tech: ["FastAPI", "Celery", "MinIO"],
    repo: "HyxiaoGe/ai-audio-assistant-web",
    language: "Python",
    category: "AI 应用",
  },
  {
    name: "PromptHub",
    description:
      "Prompt 管理与分享平台，集中管理和复用 AI 提示词。",
    tech: ["FastAPI", "PostgreSQL"],
    repo: "HyxiaoGe/prompthub",
    language: "Python",
    category: "开发工具",
  },
  {
    name: "Idea Generator UI",
    description:
      "AI 图像生成实验平台前端，探索 Gemini、FLUX 等模型的图像生成能力。",
    tech: ["Next.js", "Tailwind CSS"],
    repo: "HyxiaoGe/idea-generator-ui",
    language: "TypeScript",
    category: "AI 应用",
  },
  {
    name: "Idea Generator Web",
    description:
      "AI 图像生成实验平台，探索 Google Gemini 3 Pro Image 等模型的图像生成能力。",
    tech: ["Python", "Streamlit"],
    repo: "HyxiaoGe/idea-generator-web",
    demo: "https://nano-banana-lab-kkqghjvwjmgj6mp4nssdzd.streamlit.app/",
    language: "Python",
    category: "AI 应用",
  },
];
