import { Project, CreatorAsset, SEOMetaTags, GlobalSEOSettings } from '../types';

export const DEFAULT_SEO_SETTINGS: GlobalSEOSettings = {
  siteName: 'yonas',
  titleSuffix: ' | Yonas — Video Editor & AI Developer',
  defaultDescription:
    'Obsessive portfolio for Yonas — Video Editor (Premiere Pro, After Effects, CapCut, Blender), AI Developer, Marketer, and Content Creator with free assets and creator community.',
  primaryDomain: 'https://yonas.me',
  videoDomain: 'https://video.yonas.me',
  ogDefaultImage:
    'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
  twitterHandle: '@yonascreates',
};

export const SEO_STORAGE_KEY = 'yonas_global_seo_settings_v1';

export function getStoredSEOSettings(): GlobalSEOSettings {
  if (typeof window === 'undefined') return DEFAULT_SEO_SETTINGS;
  try {
    const saved = localStorage.getItem(SEO_STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_SEO_SETTINGS, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn('Failed to parse SEO settings from storage', e);
  }
  return DEFAULT_SEO_SETTINGS;
}

export function saveStoredSEOSettings(settings: GlobalSEOSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SEO_STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save SEO settings', e);
  }
}

/**
 * Compute dynamic SEO tags for an individual Video Project post
 */
export function getVideoProjectSEO(
  project: Project,
  settings: GlobalSEOSettings = DEFAULT_SEO_SETTINGS
): SEOMetaTags {
  const cleanTitle = project.seoTitle?.trim()
    ? project.seoTitle.trim()
    : `${project.title} — Video Edit Breakdown & Timeline${settings.titleSuffix}`;

  const cleanDescription = project.seoDescription?.trim()
    ? project.seoDescription.trim()
    : `${project.tagline ? project.tagline + ' — ' : ''}${project.description}`.slice(0, 160);

  // Fallback canonical URL prioritizing post-specific setting or production video domain
  const canonicalUrl = project.canonicalUrl?.trim()
    ? project.canonicalUrl.trim()
    : `${settings.videoDomain}/#project=${project.id}`;

  const keywords = [
    'video editing',
    project.category.toLowerCase(),
    ...project.software.map((s) => s.toLowerCase()),
    'timeline breakdown',
    'pacing',
    'retention editing',
    'Yonas portfolio',
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: project.title,
    description: project.description,
    thumbnailUrl: [project.thumbnailUrl],
    uploadDate: '2025-01-15T08:00:00+00:00',
    duration: project.duration ? `PT${project.duration.replace(':', 'M')}S` : 'PT1M0S',
    author: {
      '@type': 'Person',
      name: 'Yonas',
      url: settings.primaryDomain,
      jobTitle: 'Video Editor & AI Developer',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Yonas Creator Studio',
      url: settings.primaryDomain,
    },
  };

  return {
    title: cleanTitle,
    description: cleanDescription,
    canonicalUrl,
    ogTitle: cleanTitle,
    ogDescription: cleanDescription,
    ogImage: project.thumbnailUrl || settings.ogDefaultImage,
    ogType: 'video.other',
    twitterCard: 'summary_large_image',
    keywords,
    jsonLd,
  };
}

/**
 * Compute dynamic SEO tags for an individual Creator Asset post
 */
export function getAssetSEO(
  asset: CreatorAsset,
  settings: GlobalSEOSettings = DEFAULT_SEO_SETTINGS
): SEOMetaTags {
  const cleanTitle = asset.seoTitle?.trim()
    ? asset.seoTitle.trim()
    : `${asset.title} — Free Creator Pack (${asset.fileFormat}) | Yonas Vault`;

  const cleanDescription = asset.seoDescription?.trim()
    ? asset.seoDescription.trim()
    : `Free download: ${asset.description} Includes ${asset.fileFormat}. Downloaded over ${asset.downloadCount} times.`.slice(
        0,
        160
      );

  const canonicalUrl = asset.canonicalUrl?.trim()
    ? asset.canonicalUrl.trim()
    : `${settings.primaryDomain}/#asset=${asset.id}`;

  const keywords = [
    'free creator assets',
    asset.category.toLowerCase(),
    asset.fileFormat.toLowerCase(),
    ...asset.tags.map((t) => t.toLowerCase()),
    'LUTs pack',
    'sound effects',
    'Blender 3D rig',
    'Yonas asset vault',
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DigitalDocument',
    name: asset.title,
    description: asset.description,
    fileFormat: asset.fileFormat,
    author: {
      '@type': 'Person',
      name: 'Yonas',
      url: settings.primaryDomain,
    },
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };

  return {
    title: cleanTitle,
    description: cleanDescription,
    canonicalUrl,
    ogTitle: cleanTitle,
    ogDescription: cleanDescription,
    ogImage: settings.ogDefaultImage,
    ogType: 'article',
    twitterCard: 'summary_large_image',
    keywords,
    jsonLd,
  };
}

/**
 * Compute SEO tags for Main Brand Hub
 */
export function getMainHubSEO(settings: GlobalSEOSettings = DEFAULT_SEO_SETTINGS): SEOMetaTags {
  return {
    title: 'yonas - Video Editor, AI Developer & Content Creator',
    description: settings.defaultDescription,
    canonicalUrl: `${settings.primaryDomain}/`,
    ogTitle: 'yonas - Video Editor, AI Developer & Content Creator',
    ogDescription: settings.defaultDescription,
    ogImage: settings.ogDefaultImage,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    keywords: [
      'video editor',
      'AI developer',
      'content creator',
      'Premiere Pro',
      'After Effects',
      'CapCut',
      'Blender 3D',
      'free LUTs',
      'creator community',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Yonas',
      url: settings.primaryDomain,
      jobTitle: 'Video Editor & AI Developer',
      sameAs: [
        'https://youtube.com/@yonascreates',
        'https://tiktok.com/@yonas.edits',
        'https://instagram.com/@yonas_visuals',
        'https://github.com/yonas-ai',
      ],
    },
  };
}

/**
 * Compute SEO tags for Video Portfolio Subdomain (video.yonas.me)
 */
export function getVideoSubdomainSEO(settings: GlobalSEOSettings = DEFAULT_SEO_SETTINGS): SEOMetaTags {
  return {
    title: `Video Editing & 3D Motion Vault | Yonas Portfolio (video.yonas.me)`,
    description:
      'High-velocity cuts, algorithmic viewer retention, and 3D visual effects crafted with Adobe Premiere Pro, After Effects, CapCut Pro, and Blender.',
    canonicalUrl: `${settings.videoDomain}/`,
    ogTitle: `Video Editing & 3D Motion Vault | Yonas Portfolio`,
    ogDescription:
      'Explore flagship video editing projects, aspect ratio filters (16:9, 9:16), and pacing breakdowns.',
    ogImage: settings.ogDefaultImage,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    keywords: [
      'video portfolio',
      'video editor showreel',
      'short form video editor',
      'YouTube video editor',
      '3D motion graphics',
      'CapCut editor',
      'Blender animations',
    ],
  };
}

/**
 * Compute SEO tags for Restricted Admin Console (strictly noindex)
 */
export function getAdminSEO(): SEOMetaTags {
  return {
    title: 'Admin Console | Restricted Owner Studio — yonas.me',
    description: 'Private creator administration console for Yonas.',
    canonicalUrl: 'https://admin.yonas.me/',
    noIndex: true, // Crucial for security and search hygiene: prevent admin page indexing
  };
}

/**
 * Apply dynamic SEO meta tags directly to the browser DOM
 */
export function applySEOMetaTags(meta: SEOMetaTags): void {
  if (typeof document === 'undefined') return;

  // 1. Set document title
  document.title = meta.title;

  // 2. Helper to set or create meta tag
  const setMeta = (attributeName: string, attributeValue: string, content: string) => {
    let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attributeName, attributeValue);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  // 3. Set standard meta tags
  setMeta('name', 'description', meta.description);

  if (meta.keywords && meta.keywords.length > 0) {
    setMeta('name', 'keywords', meta.keywords.join(', '));
  }

  // 4. Set Open Graph tags
  setMeta('property', 'og:title', meta.ogTitle || meta.title);
  setMeta('property', 'og:description', meta.ogDescription || meta.description);
  setMeta('property', 'og:url', meta.canonicalUrl);
  if (meta.ogImage) {
    setMeta('property', 'og:image', meta.ogImage);
  }
  setMeta('property', 'og:type', meta.ogType || 'website');

  // 5. Set Twitter Card tags
  setMeta('name', 'twitter:card', meta.twitterCard || 'summary_large_image');
  setMeta('name', 'twitter:title', meta.ogTitle || meta.title);
  setMeta('name', 'twitter:description', meta.ogDescription || meta.description);
  if (meta.ogImage) {
    setMeta('name', 'twitter:image', meta.ogImage);
  }
  setMeta('name', 'twitter:url', meta.canonicalUrl);

  // 6. Set or update canonical URL link
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', meta.canonicalUrl);

  // 7. Manage Robots meta tag (noindex for admin, index for public)
  let robotsMeta = document.querySelector('meta[name="robots"]');
  if (meta.noIndex) {
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', 'noindex, nofollow');
  } else {
    if (robotsMeta) {
      robotsMeta.setAttribute('content', 'index, follow, max-image-preview:large');
    }
  }

  // 8. Inject or update JSON-LD Structured Data for Google Rich Snippets
  const existingJsonLd = document.getElementById('dynamic-seo-ld-json');
  if (meta.jsonLd && !meta.noIndex) {
    if (existingJsonLd) {
      existingJsonLd.textContent = JSON.stringify(meta.jsonLd);
    } else {
      const script = document.createElement('script');
      script.id = 'dynamic-seo-ld-json';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(meta.jsonLd);
      document.head.appendChild(script);
    }
  } else if (existingJsonLd) {
    existingJsonLd.remove();
  }
}
