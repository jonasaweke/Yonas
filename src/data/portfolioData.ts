import {
  Project,
  CreatorAsset,
  CertificateInfo,
  SocialChannel,
  ToolItem,
  BlogPost,
} from '../types';

export const PERSONAL_INFO = {
  name: 'Yonas',
  brandName: 'YONAS',
  title: 'Video Editor · AI Developer · Content Creator',
  tagline: 'Obsessed with high-retention visual storytelling, 3D motion, and intelligent AI tools.',
  shortBio:
    'Video editor specializing in CapCut, Premiere Pro, After Effects, and Blender 3D. Certified programmer building AI tools and digital workflows. Content creator sharing free assets and building community on YouTube, Instagram, and TikTok.',
  email: 'yonasaweke19@gmail.com',
  location: 'Addis Ababa · Global Remote',
  availability: 'Available for Select Video Editing, 3D VFX & AI Collabs',
  stats: [
    { label: 'Videos Edited', value: '250+' },
    { label: 'Total Audience Reach', value: '450K+' },
    { label: 'Free Assets Shared', value: '5,000+' },
    { label: 'Retention Peak', value: '88%+' },
  ],
};

export const SOCIAL_CHANNELS: SocialChannel[] = [
  {
    name: 'YouTube',
    platform: 'YouTube',
    handle: '@yonascreates',
    url: 'https://youtube.com',
    audience: '45K+',
    metricLabel: 'Subscribers',
    highlight: 'Editing breakdowns, Blender 3D tutorials & AI experiments',
  },
  {
    name: 'TikTok',
    platform: 'TikTok',
    handle: '@yonas.edits',
    url: 'https://tiktok.com',
    audience: '120K+',
    metricLabel: 'Followers',
    highlight: 'Viral short-form edits, speed-ramps & sound design hooks',
  },
  {
    name: 'Instagram',
    platform: 'Instagram',
    handle: '@yonas_visuals',
    url: 'https://instagram.com',
    audience: '28K+',
    metricLabel: 'Followers',
    highlight: 'Photoshop thumbnails, 3D renders & daily discipline',
  },
  {
    name: 'GitHub',
    platform: 'GitHub',
    handle: 'yonas-ai',
    url: 'https://github.com',
    audience: 'Certified',
    metricLabel: 'Programmer',
    highlight: 'AI automation scripts, web apps & creator toolkits',
  },
];

export const TOOLBOX_ITEMS: ToolItem[] = [
  {
    id: 'tool-pr',
    name: 'Adobe Premiere Pro',
    category: 'Video & Motion',
    proficiency: '98%',
    experienceLevel: 'Advanced',
    highlight: 'Timeline pacing, color grading, multi-cam sync & sound mixing',
  },
  {
    id: 'tool-ae',
    name: 'After Effects',
    category: 'Video & Motion',
    proficiency: '92%',
    experienceLevel: 'Advanced',
    highlight: 'Kinetic typography, tracking, rotoscoping, HUD elements & VFX',
  },
  {
    id: 'tool-capcut',
    name: 'CapCut Desktop / Pro',
    category: 'Video & Motion',
    proficiency: '95%',
    experienceLevel: 'Mastery',
    highlight: 'Viral short-form pacing, dynamic auto-captions & sound effects',
  },
  {
    id: 'tool-blender',
    name: 'Blender 3D',
    category: '3D & Graphics',
    proficiency: '85%',
    experienceLevel: 'Proficient',
    highlight: '3D modeling, procedural lighting, camera tracking & product renders',
  },
  {
    id: 'tool-ps',
    name: 'Adobe Photoshop',
    category: '3D & Graphics',
    proficiency: '90%',
    experienceLevel: 'Advanced',
    highlight: 'High-CTR YouTube thumbnails, color science & composition art',
  },
  {
    id: 'tool-ai',
    name: 'AI Engineering & Prompting',
    category: 'Programming & AI',
    proficiency: '88%',
    experienceLevel: 'Certified',
    highlight: 'LLM agents, Midjourney / ComfyUI workflows & custom automations',
  },
  {
    id: 'tool-code',
    name: 'Python & Web Programming',
    category: 'Programming & AI',
    proficiency: '80%',
    experienceLevel: 'Intermediate',
    highlight: 'Python automation scripts, JavaScript/TypeScript, React UI tools',
  },
  {
    id: 'tool-marketing',
    name: 'Audience & Growth Marketing',
    category: 'Growth & Strategy',
    proficiency: '92%',
    experienceLevel: 'Expert',
    highlight: 'Viewer retention hooks, A/B title testing & viral content packaging',
  },
];

export const PROGRAMMING_CERTIFICATE: CertificateInfo = {
  id: 'cert-prog-2025',
  name: 'Certified Software Programming & AI Systems',
  issuer: 'Global Tech Accreditation & Coding Institute',
  issueDate: 'Verified 2024 - 2025',
  credentialId: 'CERT-PROG-YN-94821',
  description:
    'Formal qualification covering algorithmic logic, object-oriented design, Python scripting, full-stack web fundamentals, and modern AI API integrations.',
  skills: ['Python', 'JavaScript/TypeScript', 'Web Architecture', 'AI Automation', 'Data Structures'],
  verified: true,
};

export const PROJECTS_SHOWCASE: Project[] = [
  {
    id: 'proj-1',
    title: 'Neon Cyberpunk Kinetic Reel',
    category: 'Video Editing',
    software: ['After Effects', 'Premiere Pro', 'Blender'],
    tagline: 'High-velocity 60 FPS edit featuring custom 3D passes & intense sound design',
    description:
      'Engineered a fast-paced showreel with frame-by-frame beat sync, seamless match cuts, speed ramps, and 3D camera projections generated in Blender.',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '16:9',
    duration: '0:48',
    stats: [
      { label: 'Retention Rate', value: '86%' },
      { label: 'Sound Layers', value: '42 tracks' },
    ],
    details: [
      'Custom glitch transitions engineered in After Effects without third-party plugins',
      'Original 3D neon assets modeled and rendered in Blender EEVEE',
      'Dynamic audio mix combining bass risers, whooshes, and impact hits',
    ],
    featured: true,
  },
  {
    id: 'proj-2',
    title: 'Viral Shorts Retention Breakdown',
    category: 'Video Editing',
    software: ['CapCut Pro', 'Premiere Pro', 'Photoshop'],
    tagline: 'Short-form masterclass edit that racked up 1.4M views with 92% completion',
    description:
      'Formulated an obsessive visual retention strategy for vertical video: kinetic pop-up typography, zoom pulses every 1.8 seconds, and subtle sound reinforcement.',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '9:16',
    duration: '0:34',
    stats: [
      { label: 'Total Views', value: '1.4M+' },
      { label: 'Avg Watch Time', value: '104%' },
    ],
    details: [
      'Engineered in CapCut Desktop with precision keyframed audio cues',
      'Color-graded with custom custom teal-and-orange LUT for phone screens',
      'Crafted custom sticker overlays and animated emojis in Photoshop',
    ],
    featured: true,
  },
  {
    id: 'proj-3',
    title: 'Futuristic Sneaker 3D Commercial',
    category: '3D & Motion',
    software: ['Blender 3D', 'After Effects', 'Photoshop'],
    tagline: 'Photorealistic 3D product animation with dynamic particle simulations',
    description:
      'Modeled, textured, and animated an athletic shoe exploding into technical components. Rendered with realistic light dispersion and layered smoke in After Effects.',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '16:9',
    duration: '0:22',
    stats: [
      { label: 'Render Engine', value: 'Cycles X' },
      { label: 'Polygons', value: '180K' },
    ],
    details: [
      'Subsurface scattering shaders crafted for realistic rubber and fabric textures',
      'Rigged explosion breakdown displaying midsole air cushioning geometry',
      'Final chromatic aberration and motion blur dialed in After Effects',
    ],
    featured: true,
  },
  {
    id: 'proj-4',
    title: 'High-CTR YouTube Thumbnail Suite',
    category: 'Thumbnails & Graphics',
    software: ['Photoshop', 'Blender'],
    tagline: '14.2% average CTR thumbnail package crafted for top-tier creators',
    description:
      'High-contrast thumbnails designed using color theory, lighting rim highlights, facial emotion retouching, and 3D floating icons rendered in Blender.',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '16:9',
    duration: 'Static 4K',
    stats: [
      { label: 'Tested CTR', value: '14.2%' },
      { label: 'Impressions', value: '3.8M' },
    ],
    details: [
      'Custom rim-light glow and depth-of-field separation techniques',
      'Optimized for both mobile YouTube feeds and widescreen 4K displays',
      'Includes layered editable smart objects for instant title swaps',
    ],
    featured: true,
  },
  {
    id: 'proj-5',
    title: 'AI Auto-Cut & Caption Generator',
    category: 'AI & Tools',
    software: ['Python', 'AI APIs', 'TypeScript'],
    tagline: 'Custom CLI & web tool converting raw footage into captioned shorts',
    description:
      'Built a programming tool using Python and speech-to-text models that detects silence, removes pauses, generates stylized animated SRT captions, and exports to CapCut XML.',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '16:9',
    duration: 'Tool',
    stats: [
      { label: 'Editing Time Saved', value: '75%' },
      { label: 'Code Base', value: 'Python + TS' },
    ],
    details: [
      'Speech-to-text alignment with millisecond timestamp accuracy',
      'Word-by-word active highlighting mimicking popular creator captions',
      'Open-source repository available for creators in our community',
    ],
    featured: true,
  },
  {
    id: 'proj-6',
    title: 'Dark Moody Fitness Montage',
    category: 'Video Editing',
    software: ['Premiere Pro', 'After Effects', 'Photoshop'],
    tagline: 'Cinematic training video capturing the relentless daily discipline of lifting',
    description:
      'Intense gym training montage marrying heavy sound design, seamless shutter speed transitions, dramatic chiaroscuro lighting, and motivational voiceover.',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '16:9',
    duration: '1:12',
    stats: [
      { label: 'Shares', value: '18K+' },
      { label: 'Audience Vibe', value: '100% Raw' },
    ],
    details: [
      'Custom sound foley: barbell clanks, heavy chalk slaps, and breathing cadence',
      'Monochrome and deep contrast grading calibrated specifically for dark mode',
      'Reflects personal dedication to fitness, lifting, and daily physical discipline',
    ],
    featured: false,
  },
];

export const AUDIENCE_ASSETS: CreatorAsset[] = [
  {
    id: 'asset-luts',
    title: 'Obsessive Cinematic LUTs Pack',
    category: 'LUTs & Color',
    description:
      '10 hand-calibrated .CUBE color grading LUTs designed for CapCut, Premiere Pro, and DaVinci. Creates moody contrast, clean skin tones, and rich shadows.',
    fileFormat: '.CUBE (10 Presets)',
    fileSize: '42 MB',
    downloadCount: '3.4K',
    badge: 'Most Popular',
    tags: ['CapCut', 'Premiere Pro', 'Color Grading', 'Cinematic'],
  },
  {
    id: 'asset-sfx',
    title: 'Viral Creator Sound FX Vault',
    category: 'Sound FX',
    description:
      '65+ studio-mastered sound effects: deep sub drops, kinetic swooshes, film risers, camera clicks, and modern UI pops. 100% royalty-free.',
    fileFormat: '.WAV (24-bit 48kHz)',
    fileSize: '128 MB',
    downloadCount: '5.1K',
    badge: 'Essential',
    tags: ['Sound Design', 'Shorts', 'Pacing', 'Whoosh'],
  },
  {
    id: 'asset-blender',
    title: 'Blender 3D Studio Lighting Rig',
    category: '3D Assets',
    description:
      'Ready-to-render studio scene with procedural softboxes, rim lights, and reflective floor shaders. Drop any 3D model in and hit F12 for instant photorealism.',
    fileFormat: '.BLEND File',
    fileSize: '85 MB',
    downloadCount: '1.9K',
    badge: 'Free Preset',
    tags: ['Blender', 'Lighting', 'EEVEE', 'Cycles'],
  },
  {
    id: 'asset-psd',
    title: 'High-CTR YouTube Thumbnail Kit',
    category: 'PSD Templates',
    description:
      '5 fully layered Photoshop thumbnail templates with editable text styles, glowing neon outlines, brush stroke assets, and grid alignment guides.',
    fileFormat: '.PSD Layered',
    fileSize: '210 MB',
    downloadCount: '2.8K',
    badge: 'Layered PSD',
    tags: ['Photoshop', 'Thumbnails', 'CTR', 'YouTube'],
  },
  {
    id: 'asset-ai',
    title: 'AI Content Generation & Automation Prompts',
    category: 'AI Workflows',
    description:
      'Curated playbook of 40+ prompt engineering formulas for video scripting, Midjourney thumbnail art, and Python automation snippets for editors.',
    fileFormat: '.PDF & .JSON',
    fileSize: '8 MB',
    downloadCount: '4.2K',
    badge: 'AI Guide',
    tags: ['AI Prompts', 'Midjourney', 'Automation', 'Python'],
  },
];

export const FITNESS_DISCIPLINE = {
  title: 'Daily Discipline: Lifting & Movement',
  subtitle: 'Iron sharpens mind. Physical conditioning fuels relentless creative output.',
  description:
    'Behind every 40-hour video timeline and complex code build is a daily ritual of heavy lifting, calisthenics, and movement. Fitness is not just a hobby—it is the mental engine that breeds focus, grit, and obsessive attention to detail.',
  metrics: [
    { label: 'Weekly Sessions', value: '5-6 Days' },
    { label: 'Focus', value: 'Hypertrophy & Mobility' },
    { label: 'Mindset', value: 'Zero Excuses' },
  ],
};

export const COMMUNITY_INFO = {
  name: 'Yonas Creator Community',
  tagline: 'A hub for video editors, 3D artists, and AI builders.',
  description:
    'Join our growing network of hungry creators. We review video cuts, trade project files, test AI tools, and share opportunities.',
  membersCount: '10,000+',
  platforms: [
    {
      name: 'Discord Server',
      label: 'Join 4,500+ Editors & Creators',
      link: 'https://discord.com',
      badge: 'Live Voice & Feed',
    },
    {
      name: 'Telegram Channel',
      label: 'Instant Asset Drops & Project Files',
      link: 'https://telegram.org',
      badge: 'Asset Drops',
    },
    {
      name: 'Creator Newsletter',
      label: 'Weekly Viral Edits & AI Breakdown',
      link: '#contact',
      badge: 'Weekly VIP',
    },
  ],
};

export const CERTIFICATES_LIST: CertificateInfo[] = [
  PROGRAMMING_CERTIFICATE,
  {
    id: 'cert-adv-ai-2025',
    name: 'Advanced AI Systems & Prompt Engineering',
    issuer: 'Deep Learning & Intelligent Interfaces Guild',
    issueDate: 'Verified 2025',
    credentialId: 'CERT-AI-SYS-4482',
    description:
      'Certified mastery in LLM agent orchestration, fine-tuning creator pipelines, multimodal generation workflows, and automated video transcript generation.',
    skills: ['LLM Orchestration', 'Multimodal APIs', 'Agentic Workflows', 'Python', 'Vector Search'],
    verified: true,
  },
  {
    id: 'cert-editing-color-2024',
    name: 'Master Video Editing & Cinematic Color Science',
    issuer: 'Creative Visual Arts Academy',
    issueDate: 'Verified 2024',
    credentialId: 'CERT-EDIT-COL-1893',
    description:
      'Advanced timeline architecture, dynamic rhythm pacing, acoustic sound design layering, and ACES color grading workflows across Premiere Pro and DaVinci.',
    skills: ['Timeline Pacing', 'Sound Foley', 'Color Grading', 'After Effects VFX', 'Keyframe Dynamics'],
    verified: true,
  },
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'The 1.8-Second Rule: Engineering Viral Retention on YouTube & TikTok',
    category: 'Video Editing',
    excerpt:
      'How micro-zooms, kinetic subtitle pacing, and selective acoustic sound effects hold viewer attention past the algorithmic 30-second cliff.',
    content: `Retention isn't an accident—it's an engineering problem. When editing high-retention short-form and long-form video content, viewer fatigue sets in every 2.5 to 3 seconds if the visual stimuli remain static.

### The Anatomy of a Hook
1. **Visual Disruption**: Introduce motion or a visual pattern interrupt within the first 60 frames.
2. **Frequency Modulation**: Avoid monotonous voiceover. Cut silence down to less than 150ms using automated silence-removal scripts.
3. **Sound Foley Layering**: Every text pop must be anchored by a subtle sub-bass thud or crisp click at -18dB so it registers subconsciously without overwhelming the ear.

By combining timeline rhythm in Premiere Pro with kinetic tracking in After Effects, we consistently push short-form retention above 85%.`,
    readTime: '4 min read',
    date: 'Sep 2026',
    coverImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    tags: ['CapCut', 'Premiere Pro', 'Viral Retention', 'Sound Design'],
    published: true,
  },
  {
    id: 'blog-2',
    title: 'Building Custom AI Automation Scripts for Video Editors',
    category: 'AI & Tools',
    excerpt:
      'Why learning intermediate programming transformed my editing turnaround time by 75% through automated batch rendering and speech-to-keyframe pipelines.',
    content: `Most editors waste hours on repetitive tasks: syncing multi-cam angles, formatting vertical subtitles, rendering out 12 variations of social cuts, and organizing b-roll folders.

### The Programmer-Editor Advantage
As a certified programmer, I build custom Python scripts and React desktop utilities that interface directly with local FFmpeg and Whisper AI models. 

- **Automatic Marker Generation**: Parses audio waveforms and places timeline markers on dramatic audio drops.
- **Dynamic Subtitle Synchronization**: Generates perfectly styled animated kinetic subtitles with word-by-word JSON timestamps.
- **Batch Export Pipelines**: One-click generation of 16:9 YouTube masters and 9:16 Shorts with auto-reframing.`,
    readTime: '6 min read',
    date: 'Aug 2026',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    tags: ['Python', 'AI Scripts', 'FFmpeg', 'Automation'],
    published: true,
  },
  {
    id: 'blog-3',
    title: 'Photoreal 3D Lighting in Blender: The Creator Product Blueprint',
    category: '3D & VFX',
    excerpt:
      'Step-by-step setup of procedural softboxes, rim lights, and camera depth of field that make 3D assets pop on high-resolution displays.',
    content: `High-end creator videos no longer rely solely on 2D graphics. Adding three-dimensional product reveals or kinetic title shields created in Blender gives videos an unmistakably premium production tier.

### The 3-Light Rule in EEVEE & Cycles
- **Key Rim Light**: Positioned 45 degrees behind the product at 350W with subtle warm temperature (4500K).
- **Soft Ambient Fill**: Massive procedural area light with roughness set to 0.4 to prevent harsh specular burn.
- **Dynamic Floor Shadow**: Subtle glass or dark metallic plane reflecting the neon rim colors.

Download my ready-to-render studio scene in the Asset Vault to replicate this setup in one click.`,
    readTime: '5 min read',
    date: 'Jul 2026',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    tags: ['Blender 3D', 'Lighting', 'EEVEE', 'Cycles'],
    published: true,
  },
];

