export interface DonationProgress {
  currentAmount: number;
  goalAmount: number;
  currency: string;
  progressPercent: number;
  updatedAt: string;
}

interface ProviderPayload {
  amountRaised?: number;
  currentAmount?: number;
  total?: number;
  raised?: number;
  goalAmount?: number;
  goal?: number;
  currency?: string;
}

const numberKeys = ["amountRaised", "currentAmount", "total", "raised"] as const;
const goalKeys = ["goalAmount", "goal"] as const;

function parseNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return null;
}

function readFirstNumber(payload: ProviderPayload, keys: readonly string[]): number | null {
  for (const key of keys) {
    const parsed = parseNumber(payload[key as keyof ProviderPayload]);
    if (parsed !== null) {
      return parsed;
    }
  }

  return null;
}

export function normalizeDonationProgress(
  payload: ProviderPayload,
  fallbackGoalAmount: number,
  fallbackCurrency: string
): DonationProgress {
  const currentAmount = Math.max(0, readFirstNumber(payload, numberKeys) ?? 0);
  const goalAmount = Math.max(0, readFirstNumber(payload, goalKeys) ?? fallbackGoalAmount);
  const currency = typeof payload.currency === "string" ? payload.currency : fallbackCurrency;
  const progressPercent = goalAmount > 0 ? Math.min(100, (currentAmount / goalAmount) * 100) : 0;

  return {
    currentAmount,
    goalAmount,
    currency,
    progressPercent,
    updatedAt: new Date().toISOString()
  };
}

export function buildFallbackDonationProgress(goalAmount: number, currency: string): DonationProgress {
  return {
    currentAmount: 0,
    goalAmount,
    currency,
    progressPercent: 0,
    updatedAt: new Date().toISOString()
  };
}
