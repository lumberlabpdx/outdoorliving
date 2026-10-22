// Build-time variables from .env (see .env.example) or the deploy workflow
interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_PUBLISHABLE_KEY?: string;
  // The site's full address; see SITE_URL in src/lib/site.ts
  readonly VITE_SITE_URL?: string;
}
