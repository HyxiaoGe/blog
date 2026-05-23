const STATUS_BASE = "https://status.seanfield.org";
const SLUG = "dev-server";

export type Heartbeat = {
  status: 0 | 1 | 2 | 3;
  time: string;
  msg: string;
  ping: number | null;
};

export type Monitor = { id: number; name: string; type: string };

export type StatusBundle = {
  monitors: Monitor[];
  heartbeats: Record<string, Heartbeat[]>;
  uptime24h: Record<string, number>;
};

export const STATUS_PUBLIC_URL = `${STATUS_BASE}/status/${SLUG}`;

export async function fetchStatus(): Promise<StatusBundle | null> {
  try {
    const [pageRes, hbRes] = await Promise.all([
      fetch(`${STATUS_BASE}/api/status-page/${SLUG}`, {
        next: { revalidate: 60 },
      }),
      fetch(`${STATUS_BASE}/api/status-page/heartbeat/${SLUG}`, {
        next: { revalidate: 60 },
      }),
    ]);
    if (!pageRes.ok || !hbRes.ok) return null;
    const page = await pageRes.json();
    const hb = await hbRes.json();
    return {
      monitors: page.publicGroupList.flatMap(
        (g: { monitorList: Monitor[] }) => g.monitorList
      ),
      heartbeats: hb.heartbeatList ?? {},
      uptime24h: hb.uptimeList ?? {},
    };
  } catch {
    return null;
  }
}

export function statusColor(status: 0 | 1 | 2 | 3 | undefined): string {
  if (status === 1) return "hsl(142 70% 45%)";
  if (status === 0) return "hsl(0 70% 55%)";
  if (status === 3) return "hsl(210 50% 55%)";
  if (status === 2) return "hsl(45 80% 55%)";
  return "var(--color-text-tertiary)";
}

export function statusLabel(status: 0 | 1 | 2 | 3): string {
  if (status === 1) return "up";
  if (status === 0) return "down";
  if (status === 3) return "maintenance";
  return "pending";
}

export type LiveStatus = {
  status: 0 | 1 | 2 | 3;
  ping: number | null;
  uptime24h: number | null;
  heartbeats: Heartbeat[];
};

export function lookupLive(
  bundle: StatusBundle,
  monitorName: string
): LiveStatus | null {
  const m = bundle.monitors.find((x) => x.name === monitorName);
  if (!m) return null;
  const beats = bundle.heartbeats[m.id.toString()] ?? [];
  const latest = beats[beats.length - 1];
  if (!latest) return null;
  return {
    status: latest.status,
    ping: latest.ping,
    uptime24h: bundle.uptime24h[`${m.id}_24`] ?? null,
    heartbeats: beats,
  };
}
