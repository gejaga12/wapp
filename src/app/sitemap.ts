import type { MetadataRoute } from "next";

import { siteMetadata } from "@/lib/siteMetadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteMetadata.siteUrl,
      lastModified,
    },
  ];
}
