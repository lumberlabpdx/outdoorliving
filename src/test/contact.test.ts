import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { requestCallback } from "@/lib/contact";
import { getSupabase } from "@/lib/supabase";

vi.mock("@/lib/supabase", () => ({ getSupabase: vi.fn() }));

const request = {
  name: "Dana Whitfield",
  phone: "(503) 555-0142",
  projectDescription: "A 400 sq ft cedar deck with a fire pit.",
};

function mockInsertResult(result: { error: unknown }) {
  const insert = vi.fn().mockResolvedValue(result);
  const from = vi.fn(() => ({ insert }));
  vi.mocked(getSupabase).mockResolvedValue({ from } as never);
  return { from, insert };
}

describe("requestCallback", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("saves the request to contact_submissions", async () => {
    const { from, insert } = mockInsertResult({ error: null });

    await requestCallback(request);

    expect(from).toHaveBeenCalledWith("contact_submissions");
    expect(insert).toHaveBeenCalledWith({
      name: "Dana Whitfield",
      phone: "(503) 555-0142",
      project_description: "A 400 sq ft cedar deck with a fire pit.",
    });
  });

  it("shows a friendly error when the database rejects the request", async () => {
    mockInsertResult({ error: { message: "new row violates row-level security policy" } });

    await expect(requestCallback(request)).rejects.toThrow("We couldn't send your request");
  });

  it("shows a friendly error when Supabase isn't configured", async () => {
    vi.mocked(getSupabase).mockRejectedValue(new Error("Supabase is not configured"));

    await expect(requestCallback(request)).rejects.toThrow("We couldn't send your request");
  });
});
