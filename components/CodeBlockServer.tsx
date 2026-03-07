import { codeToHtml } from "shiki";
import { CodeBlock } from "./CodeBlock";

interface Props {
  children: string;
  className?: string;
}

export async function CodeBlockServer({ children, className }: Props) {
  const language = className?.replace("language-", "") || "text";
  const code = children.trim();

  const html = await codeToHtml(code, {
    lang: language,
    theme: "vitesse-dark",
  });

  return <CodeBlock code={code} language={language} highlightedHtml={html} />;
}
