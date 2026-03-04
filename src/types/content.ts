export interface Meta {
  locale: string
  updatedAt: string
}

export interface HomeCut {
  id: string
  headline: string
  subline?: string | null
  body?: string | null
  ctaLabel?: string | null
  ctaHref?: string | null
}

export interface HomeContent {
  meta: Meta
  cuts: HomeCut[]
}

export interface ManifestoSection {
  heading: string
  body: string
}

export interface ManifestoContent {
  meta: Meta
  title: string
  subtitle?: string
  sections: ManifestoSection[]
}

export interface AboutSection {
  heading?: string
  body: string
}

export interface AboutContent {
  meta: Meta
  title: string
  lead?: string
  sections: AboutSection[]
}

export interface ProjectItem {
  id: string
  title: string
  summary: string
  status: 'done' | 'in-progress' | 'planned'
  href?: string | null
  year?: string | null
}

export interface ProjectsContent {
  meta: Meta
  title?: string
  lead?: string
  projects: ProjectItem[]
}

export interface ProjectDetailContent {
  meta: Meta
  id: string
  title: string
  summary: string
  status: 'done' | 'in-progress' | 'planned'
  year?: string | null
  href?: string | null
  body: string
}

export interface BlogPostMeta {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  featured?: boolean
}

export interface BlogIndexContent {
  meta: Meta
  title: string
  posts: BlogPostMeta[]
}

export interface PostContent {
  meta: Meta
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  featured?: boolean
  body: string
}

export interface ContactLink {
  label: string
  href: string
  type?: 'email' | 'social' | 'other'
}

export interface ContactContent {
  meta: Meta
  title: string
  lead?: string
  links: ContactLink[]
  formTitle?: string
  formDescription?: string
}
