const MICROLINK = "https://api.microlink.io";

type MicrolinkResponse = {
  status: string;
  data?: { screenshot?: { url?: string; width?: number; height?: number } };
};

export async function getScreenshot(url: string): Promise<string | null> {
  const params = new URLSearchParams({
    url,
    screenshot: "true",
    meta: "false",
    "viewport.width": "1280",
    "viewport.height": "720",
    waitForTimeout: "1500",
  });
  try {
    const res = await fetch(`${MICROLINK}/?${params.toString()}`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as MicrolinkResponse;
    return json.data?.screenshot?.url ?? null;
  } catch {
    return null;
  }
}
