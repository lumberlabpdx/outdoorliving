// The business details the site repeats: the page title and footer, the call/text links, and the
// search-engine data. Change one here and every place that shows it follows.
export const SITE_NAME = "Lumber Lab Outdoor Construction";

// Written the way search engines show it; the call and text links drop the dashes
export const PHONE = "+1-971-319-3445";
export const PHONE_LINK = PHONE.replace(/-/g, "");

export const EMAIL = "lumberlab.pdx@gmail.com";

// The live site's address, ending in "/". The deploy workflow passes in the one GitHub Pages
// reports, which follows a custom domain once it's set up; other builds use the current address.
// `||`, not `??`, so an empty variable falls back too
const siteUrl = import.meta.env.VITE_SITE_URL || "https://lumberlabpdx.github.io/outdoorliving";
export const SITE_URL = siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`;
