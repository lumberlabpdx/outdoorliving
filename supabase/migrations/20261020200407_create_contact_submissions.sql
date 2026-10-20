-- Callback requests from the site's contact form. Visitors (the anon role) can insert rows but
-- not read them; view submissions in the Supabase dashboard's Table Editor. The length checks
-- mirror the form's validation in src/lib/contact-schema.ts.
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  phone TEXT NOT NULL CHECK (char_length(phone) BETWEEN 1 AND 30),
  project_description TEXT NOT NULL CHECK (char_length(project_description) BETWEEN 1 AND 2000),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.contact_submissions TO anon;
GRANT ALL ON public.contact_submissions TO service_role;

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Visitors can submit a callback request"
ON public.contact_submissions FOR INSERT TO anon
WITH CHECK (true);
