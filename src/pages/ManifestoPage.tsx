import { useAsyncContent } from '@/hooks/useAsyncContent'
import { getManifesto } from '@/lib/content'

export function ManifestoPage() {
  const { data, loading, error } = useAsyncContent(getManifesto)

  if (loading) return <PageSkeleton />
  if (error) return <div className="p-8 text-red-600">載入失敗</div>
  if (!data) return null

  return (
    <article className="page-article">
      <div className="page-container readable">
        <header className="page-header">
          <h1 className="page-title">{data.title}</h1>
          {data.subtitle && (
            <p className="page-lead whitespace-pre-line">{data.subtitle}</p>
          )}
        </header>
        <div className="section-gap prose-breath">
          {data.sections.map((section, i) => (
            <section key={i}>
              <h2 className="section-title">{section.heading}</h2>
              <p className="body-text whitespace-pre-line">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </article>
  )
}

function PageSkeleton() {
  return (
    <div className="animate-pulse py-12 px-4">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="h-10 bg-rikyucha/20 rounded w-2/3" />
        <div className="h-4 bg-rikyucha/15 rounded w-full" />
        <div className="h-4 bg-rikyucha/15 rounded w-5/6" />
      </div>
    </div>
  )
}
