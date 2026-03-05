import { Link } from 'react-router-dom'
import { useAsyncContent } from '@/hooks/useAsyncContent'
import { getProjects } from '@/lib/content'

const statusLabel: Record<string, string> = {
  done: '完成',
  'in-progress': '進行中',
  planned: '規劃中',
}

const statusColor: Record<string, string> = {
  done: 'bg-seiji/20 text-aisumicha',
  'in-progress': 'bg-yamabuki/20 text-rikyucha',
  planned: 'bg-sakura/50 text-sumi/70',
}

export function ProjectsPage() {
  const { data, loading, error } = useAsyncContent(getProjects)

  if (loading) return <PageSkeleton />
  if (error) return <div className="p-8 text-red-600">載入失敗</div>
  if (!data) return null

  return (
    <article className="page-article">
      <div className="page-container">
        <header className="page-header readable">
          <h1 className="page-title">{data.title ?? '專案'}</h1>
          {data.lead && (
            <p className="page-lead">{data.lead}</p>
          )}
        </header>
        <ul className="section-gap">
          {data.projects.map((project) => (
            <li key={project.id}>
              <Link
                to={`/projects/${project.id}`}
                className="block border border-rikyucha/20 rounded-lg p-5 sm:p-6 bg-shironeri/30 hover:border-aisumicha/40 transition-colors group"
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h2 className="font-serif text-xl font-semibold text-sumi group-hover:text-aisumicha transition-colors">
                    {project.title}
                  </h2>
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${statusColor[project.status] ?? statusColor.planned}`}
                  >
                    {statusLabel[project.status] ?? project.status}
                  </span>
                  {project.year && (
                    <span className="text-sm text-sumi/60">{project.year}</span>
                  )}
                </div>
                <p className="body-text text-sumi/85">{project.summary}</p>
                <span className="mt-3 inline-flex text-sm text-aisumicha group-hover:underline">
                  閱讀更多 →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

function PageSkeleton() {
  return (
    <div className="animate-pulse py-12 px-4">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="h-10 bg-rikyucha/20 rounded w-1/4" />
        <div className="h-24 bg-rikyucha/15 rounded" />
        <div className="h-24 bg-rikyucha/15 rounded" />
      </div>
    </div>
  )
}
