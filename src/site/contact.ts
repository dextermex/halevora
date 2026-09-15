/** Canonical links and labels. Every call to action on the site resolves to
 * one of these. The apply form posts to INTAKE_ENDPOINT (worker.js), which
 * forwards to the private intake channel and stores nothing. */
export const SITE_ORIGIN = "https://halevora.com";
export const CONTACT_EMAIL = "support@halevora.com";
/** Optional direct channel shown as a fallback when the intake endpoint is
 * unavailable. Leave empty to hide. */
export const TELEGRAM_URL = "";
export const INTAKE_ENDPOINT = "/api/intake";
export const APPLY_PATH = "/apply";
export const CTA_LABEL = "Apply for 2027";
export const ENTITY_LINE = "Halevora & Co is part of Halevora Holdings.";
