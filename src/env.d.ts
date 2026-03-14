/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly DONATION_API_URL?: string;
  readonly DONATION_API_TOKEN?: string;
  readonly DONATION_EMBED_URL?: string;
  readonly DONATION_GOAL_AMOUNT?: string;
  readonly DONATION_CURRENCY?: string;
  readonly DONATION_CACHE_SECONDS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
