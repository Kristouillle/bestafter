import type { APIRoute } from "astro";
import { buildFallbackDonationProgress, normalizeDonationProgress } from "../../../lib/donations";

const cacheSeconds = Number.parseInt(import.meta.env.DONATION_CACHE_SECONDS ?? "300", 10);
const fallbackGoalAmount = Number.parseInt(import.meta.env.DONATION_GOAL_AMOUNT ?? "10000", 10);
const fallbackCurrency = import.meta.env.DONATION_CURRENCY ?? "USD";

export const GET: APIRoute = async () => {
  const endpoint = import.meta.env.DONATION_API_URL;
  const token = import.meta.env.DONATION_API_TOKEN;

  if (!endpoint) {
    return new Response(JSON.stringify(buildFallbackDonationProgress(fallbackGoalAmount, fallbackCurrency)), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": `public, max-age=0, s-maxage=${cacheSeconds}`
      }
    });
  }

  try {
    const response = await fetch(endpoint, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined
    });

    if (!response.ok) {
      throw new Error(`Donation provider returned ${response.status}`);
    }

    const payload = await response.json();
    const progress = normalizeDonationProgress(payload, fallbackGoalAmount, fallbackCurrency);

    return new Response(JSON.stringify(progress), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": `public, max-age=0, s-maxage=${cacheSeconds}`
      }
    });
  } catch {
    return new Response(JSON.stringify(buildFallbackDonationProgress(fallbackGoalAmount, fallbackCurrency)), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": `public, max-age=0, s-maxage=${cacheSeconds}`
      }
    });
  }
};
