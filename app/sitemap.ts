import type { MetadataRoute } from "next";
import { patternPaths, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
  "/",
  "/foundations",
  "/components",
  "/patterns",
  "/patterns/clinical",
  "/patterns/patient",
  "/prototypes",
  "/numo-home",
  "/notes",
  "/tablet-appointment",
  "/prototype-login",
  "/prototype-patient",
  "/user-preferences",
  "/oauth/consent"
];
  return [...paths, ...patternPaths].map((path) => ({
    url: new URL(path, `${site.url}/`).href,
  }));
}
