import { Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { HomePage } from '@/pages/HomePage'
import { ManifestoPage } from '@/pages/ManifestoPage'
import { AboutPage } from '@/pages/AboutPage'
import { ProjectsPage } from '@/pages/ProjectsPage'
import { ProjectDetailPage } from '@/pages/ProjectDetailPage'
import { BlogIndexPage } from '@/pages/BlogIndexPage'
import { BlogPostPage } from '@/pages/BlogPostPage'
import { ContactPage } from '@/pages/ContactPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="manifesto" element={<ManifestoPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/:id" element={<ProjectDetailPage />} />
        <Route path="blog" element={<BlogIndexPage />} />
        <Route path="blog/:slug" element={<BlogPostPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
    </Routes>
  )
}
