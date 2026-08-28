"use client";

import { useEffect, useState } from "react";
import {
  getOwnerRecruitmentPath,
  absoluteUrl,
  publicOrigin,
  withBasePath,
} from "@/lib/site";

/** Same-origin absolute URLs that include GitHub Pages basePath when needed. */
export function useSiteOrigin() {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(publicOrigin(window.location.origin));
  }, []);

  function recruitmentUrl(ref?: string) {
    return absoluteUrl(getOwnerRecruitmentPath(ref), origin || undefined);
  }

  function url(path: string) {
    return absoluteUrl(path, origin || undefined);
  }

  function asset(path: string) {
    return withBasePath(path);
  }

  return { origin, recruitmentUrl, url, asset, ready: Boolean(origin) };
}
