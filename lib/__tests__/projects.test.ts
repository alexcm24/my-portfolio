import { describe, it, expect } from "vitest";
import { projects } from "@/lib/projects";

describe("projects data", () => {
  it("has at least 3 projects", () => {
    expect(projects.length).toBeGreaterThanOrEqual(3);
  });

  it("every project has required, non-empty fields", () => {
    for (const p of projects) {
      expect(p.num).toMatch(/^\d{2}$/);
      expect(p.title.trim().length).toBeGreaterThan(0);
      expect(p.description.trim().length).toBeGreaterThan(0);
      expect(p.tech.length).toBeGreaterThan(0);
      expect(p.links.length).toBeGreaterThan(0);
    }
  });

  it("every link href is absolute http(s) or root-relative", () => {
    for (const p of projects) {
      for (const l of p.links) {
        expect(l.label.trim().length).toBeGreaterThan(0);
        expect(l.href).toMatch(/^(https?:\/\/|\/)/);
      }
    }
  });
});
