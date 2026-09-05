"use client";

import { useEffect, useState } from "react";
import { getOwnerRecruitmentPath, absoluteUrl } from "@/lib/site";

/** Same-origin absolute URLs that never point at an expired temporary deploy. */
export function useSiteOrigin() {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  function recruitmentUrl(ref?: string) {
    return absoluteUrl(getOwnerRecruitmentPath(ref), origin || undefined);
  }

  function url(path: string) {
    return absoluteUrl(path, origin || undefined);
  }

  return { origin, recruitmentUrl, url, ready: Boolean(origin) };
}
