export type ProjectCategory = 'All' | 'Video Editing' | '3D & Motion' | 'Thumbnails & Graphics' | 'AI & Tools';

export type SubdomainType = 'main' | 'video' | 'admin';

export interface BlogPost {
  id: string;
  title: string;
  category: 'Video Editing' | 'AI & Tools' | 'Growth & Marketing' | '3D & VFX';
  excerpt: string;
  content: string;
  readTime: string;
  date: string;
  coverImage: string;
  tags: string[];
  published: boolean;
}

export interface Project {
  id: string;
  title: string;
  category: 'Video Editing' | '3D & Motion' | 'Thumbnails & Graphics' | 'AI & Tools';
  software: string[];
  tagline: string;
  description: string;
  thumbnailUrl: string;
  videoPreviewUrl?: string;
  aspectRatio: '16:9' | '9:16';
  duration?: string;
  stats?: { label: string; value: string }[];
  details: string[];
  featured: boolean;
  // Dynamic SEO Meta Tags
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
}

export interface CreatorAsset {
  id: string;
  title: string;
  category: 'LUTs & Color' | 'Sound FX' | '3D Assets' | 'PSD Templates' | 'AI Workflows';
  description: string;
  fileFormat: string;
  fileSize: string;
  downloadCount: string;
  badge?: string;
  tags: string[];
  // Dynamic SEO Meta Tags
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
}

export interface CertificateInfo {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  credentialUrl?: string;
  description: string;
  skills: string[];
  verified: boolean;
}

export type Certificate = CertificateInfo;

export interface SocialChannel {
  name: string;
  platform: 'YouTube' | 'Instagram' | 'TikTok' | 'GitHub' | 'Discord';
  handle: string;
  url: string;
  audience: string;
  metricLabel: string;
  highlight: string;
}

export interface ToolItem {
  id: string;
  name: string;
  category: 'Video & Motion' | '3D & Graphics' | 'Programming & AI' | 'Growth & Strategy';
  proficiency: string;
  highlight: string;
  experienceLevel: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  serviceType: 'Video Editing' | '3D Animation' | 'AI & Code Project' | 'Creator Sponsorship' | 'Other';
  budget?: string;
  message: string;
  verified?: boolean;
  createdAt: string;
  synced?: boolean;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface SEOMetaTags {
  title: string;
  description: string;
  canonicalUrl: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'video.other';
  twitterCard?: 'summary' | 'summary_large_image';
  noIndex?: boolean;
  keywords?: string[];
  jsonLd?: Record<string, any>;
}

export interface GlobalSEOSettings {
  siteName: string;
  titleSuffix: string;
  defaultDescription: string;
  primaryDomain: string; // e.g., 'https://yonas.me'
  videoDomain: string; // e.g., 'https://video.yonas.me'
  ogDefaultImage: string;
  twitterHandle: string;
  googleSiteVerification?: string;
}
