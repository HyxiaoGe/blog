const STATUS_BASE_URL =
  process.env.UPTIME_STATUS_BASE_URL ?? "https://status.seanfield.org";
const STATUS_PAGE_SLUG = "dev-server";

export const STATUS_PAGE_URL = `${STATUS_BASE_URL}/status/${STATUS_PAGE_SLUG}`;

export type ServiceState =
  | "online"
  | "offline"
  | "pending"
  | "maintenance"
  | "unknown";

export interface ServiceStatus {
  monitorId: number;
  name: string;
  state: ServiceState;
  uptime24: number | null;
  checkedAt: string | null;
}

export type ServiceStatusMap = Record<string, ServiceStatus>;

interface StatusPageResponse {
  publicGroupList: Array<{
    monitorList: Array<{ id: number; name: string }>;
  }>;
}

interface Heartbeat {
  status: number;
  time: string;
}

interface HeartbeatResponse {
  heartbeatList: Record<string, Heartbeat[]>;
  uptimeList: Record<string, number>;
}

function normalizeMonitorKey(name: string): string {
  return `monitor-${name.replace(/^\[Public\]\s*/i, "").trim().toLowerCase()}`;
}

function toServiceState(status?: number): ServiceState {
  if (status === 1) return "online";
  if (status === 0) return "offline";
  if (status === 2) return "pending";
  if (status === 3) return "maintenance";
  return "unknown";
}

async function fetchStatusJson<T>(path: string): Promise<T> {
  const response = await fetch(`${STATUS_BASE_URL}${path}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 300 },
    signal: AbortSignal.timeout(5000),
  });

  if (!response.ok) {
    throw new Error(`Status API returned ${response.status} for ${path}`);
  }

  return response.json() as Promise<T>;
}

export async function getServiceStatuses(): Promise<ServiceStatusMap> {
  const [statusPage, heartbeatData] = await Promise.all([
    fetchStatusJson<StatusPageResponse>(`/api/status-page/${STATUS_PAGE_SLUG}`),
    fetchStatusJson<HeartbeatResponse>(
      `/api/status-page/heartbeat/${STATUS_PAGE_SLUG}`,
    ),
  ]);

  const monitors = statusPage.publicGroupList.flatMap(
    ({ monitorList }) => monitorList,
  );

  return Object.fromEntries(
    monitors.map((monitor) => {
      const heartbeats = heartbeatData.heartbeatList[String(monitor.id)] ?? [];
      const latest = heartbeats.at(-1);
      const uptime = heartbeatData.uptimeList[`${monitor.id}_24`];

      return [
        normalizeMonitorKey(monitor.name),
        {
          monitorId: monitor.id,
          name: monitor.name.replace(/^\[Public\]\s*/i, ""),
          state: toServiceState(latest?.status),
          uptime24: Number.isFinite(uptime) ? uptime : null,
          checkedAt: latest?.time ?? null,
        },
      ];
    }),
  );
}
