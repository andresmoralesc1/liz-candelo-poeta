// Single source of truth for the contact recipient. Safe to import from
// client components — no Node-only dependencies here.
//
// While the project is on its demo domain, the default is the IANA-reserved
// example.com (universally recognized as "not real"). When the production
// domain is live, set NEXT_PUBLIC_OWNER_EMAIL in the host env so the contact
// form, newsletter, and footer all use the real inbox.

export const ownerEmail =
  process.env.NEXT_PUBLIC_OWNER_EMAIL?.trim() || "lizcandelo@example.com";
