"use client";

import { useEffect } from "react";

// The design kit's modules (nav, hover motion, moments, diagrams) scan and change the DOM, so they
// load once React has hydrated the page instead of racing it.
const MODULES = [
  "/assets/system.js",
  "/assets/motion/motion.js",
  "/assets/layout/layout.js",
  "/assets/diagrams/mount.js",
];

export default function KitScripts() {
  useEffect(() => {
    for (const src of MODULES) {
      if (document.querySelector(`script[src="${src}"]`)) continue;
      const s = document.createElement("script");
      s.type = "module";
      s.src = src;
      document.body.appendChild(s);
    }
  }, []);
  return null;
}
