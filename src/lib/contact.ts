import type { ContactInput } from "./contact-schema";
import { getSupabase } from "./supabase";

export const REQUEST_FAILED_MESSAGE =
  "We couldn't send your request. Please call or text us instead.";

// Saves a callback request straight from the browser. Row-level security lets visitors insert
// into contact_submissions but never read it back (see supabase/migrations).
export async function requestCallback(data: ContactInput) {
  try {
    const supabase = await getSupabase();
    const { error } = await supabase.from("contact_submissions").insert({
      name: data.name,
      phone: data.phone,
      project_description: data.projectDescription,
    });
    if (error) throw error;
  } catch (error) {
    console.error("contact submission failed:", error);
    throw new Error(REQUEST_FAILED_MESSAGE, { cause: error });
  }
}
