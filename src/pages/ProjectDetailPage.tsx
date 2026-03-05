import { useParams, Link } from 'react-router-dom'
import { useAsyncContent } from '@/hooks/useAsyncContent'
import { getProject } from '@/lib/content'

const statusLabel: Record<string, string> = {
  done: '完成',
  'in-progress': '進行中',
  planned: '規劃中',
}

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data, loading, error } = useAsyncContent(
    () => (id ? getProject(id) : Promise.resolve(null)),
    [id]
  )

  if (loading) return <PageSkeleton />
  if (error) return <div className="p-8 text-red-600">載入失敗</div>
  if (!data) {
    return (
      <div className="py-16 px-4 text-center">
        <p className="text-sumi/70">找不到此專案。</p>
        <Link to="/projects" className="mt-4 inline-block text-aisumicha hover:underline">
          回到專案列表
        </Link>
      </div>
    )
  }

  return (
    <article className="page-article">
      <div className="page-container readable">
        <Link
          to="/projects"
          className="text-sm text-aisumicha hover:underline mb-6 inline-block"
        >
          ← 專案列表
        </Link>
        <header className="page-header">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs px-2 py-0.5 rounded bg-rikyucha/20 text-rikyucha">
              {statusLabel[data.status] ?? data.status}
            </span>
            {data.year && (
              <span className="text-sm text-sumi/60">{data.year}</span>
            )}
          </div>
          <h1 className="page-title">{data.title}</h1>
          <p className="page-lead mt-3">{data.summary}</p>
        </header>
        <div className="prose-breath body-text whitespace-pre-line">
          {data.body}
        </div>
      </div>
    </article>
  )
}

function PageSkeleton() {
  return (
    <div className="animate-pulse py-12 px-4">
      <div className="mx-auto max-w-2xl space-y-4">
        <div className="h-4 bg-rikyucha/15 rounded w-24" />
        <div className="h-10 bg-rikyucha/20 rounded w-full" />
        <div className="h-4 bg-rikyucha/15 rounded w-32" />
        <div className="space-y-2 mt-8">
          <div className="h-4 bg-rikyucha/15 rounded w-full" />
          <div className="h-4 bg-rikyucha/15 rounded w-full" />
        </div>
      </div>
    </div>
  )
}
