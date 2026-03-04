import type {
  HomeContent,
  ManifestoContent,
  AboutContent,
  ProjectsContent,
  ProjectDetailContent,
  BlogIndexContent,
  PostContent,
  ContactContent,
} from '@/types/content'

export async function getHome(): Promise<HomeContent> {
  const m = await import('../../content/zh/home.json')
  return m.default as HomeContent
}

export async function getManifesto(): Promise<ManifestoContent> {
  const m = await import('../../content/zh/manifesto.json')
  return m.default as ManifestoContent
}

export async function getAbout(): Promise<AboutContent> {
  const m = await import('../../content/zh/about.json')
  return m.default as AboutContent
}

export async function getProjects(): Promise<ProjectsContent> {
  const m = await import('../../content/zh/projects.json')
  return m.default as ProjectsContent
}

const projectDetailModules = import.meta.glob<{ default: ProjectDetailContent }>('../../content/zh/projects/*.json')

export async function getProject(id: string): Promise<ProjectDetailContent | null> {
  const key = `../../content/zh/projects/${id}.json`
  const load = projectDetailModules[key]
  if (!load) return null
  const m = await load()
  return m.default
}

export async function getBlogIndex(): Promise<BlogIndexContent> {
  const m = await import('../../content/zh/blog-index.json')
  return m.default as BlogIndexContent
}

export async function getContact(): Promise<ContactContent> {
  const m = await import('../../content/zh/contact.json')
  return m.default as ContactContent
}

const postModules = import.meta.glob<{ default: PostContent }>('../../content/zh/posts/*.json')

export async function getPost(slug: string): Promise<PostContent | null> {
  const key = `../../content/zh/posts/${slug}.json`
  const load = postModules[key]
  if (!load) return null
  const m = await load()
  return m.default
}

export async function getAllPostSlugs(): Promise<string[]> {
  return Object.keys(postModules).map((path) => {
    const match = path.match(/\/posts\/(.+)\.json$/)
    return match ? match[1] : ''
  }).filter(Boolean)
}
