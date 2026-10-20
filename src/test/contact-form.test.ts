import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/contact-schema";

const valid = {
  name: "Dana Whitfield",
  phone: "(503) 555-0142",
  projectDescription: "A 400 sq ft cedar deck with a fire pit.",
};

describe("contact form validation", () => {
  it("accepts a complete callback request", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects a blank name", () => {
    const result = contactSchema.safeParse({ ...valid, name: "   " });
    expect(result.success).toBe(false);
  });

  it("rejects a blank phone number", () => {
    expect(contactSchema.safeParse({ ...valid, phone: "" }).success).toBe(false);
  });

  it("rejects a phone number containing letters", () => {
    expect(contactSchema.safeParse({ ...valid, phone: "call me 503-5550" }).success).toBe(false);
  });

  it("accepts a phone number with digits, spaces, dashes, parentheses and a plus", () => {
    expect(contactSchema.safeParse({ ...valid, phone: "+1 (503) 555-0142" }).success).toBe(true);
  });

  it("rejects a blank project description", () => {
    expect(contactSchema.safeParse({ ...valid, projectDescription: "" }).success).toBe(false);
  });

  it("rejects a project description over 2000 characters", () => {
    expect(
      contactSchema.safeParse({ ...valid, projectDescription: "x".repeat(2001) }).success,
    ).toBe(false);
  });

  it("rejects a name over 100 characters", () => {
    expect(contactSchema.safeParse({ ...valid, name: "a".repeat(101) }).success).toBe(false);
  });
});
