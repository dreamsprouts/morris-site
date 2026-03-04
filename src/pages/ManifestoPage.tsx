import { useAsyncContent } from '@/hooks/useAsyncContent'
import { getManifesto } from '@/lib/content'

export function ManifestoPage() {
  const { data, loading, error } = useAsyncContent(getManifesto)

  if (loading) return <PageSkeleton />
  if (error) return <div className="p-8 text-red-600">載入失敗</div>
  if (!data) return null

  return (
    <article className="py-12 sm:py-16 pb-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 readable">
        <header className="mb-12 sm:mb-16">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-sumi leading-tight">
            {data.title}
          </h1>
          {data.subtitle && (
            <p className="mt-4 text-lg text-sumi/80 leading-relaxed">
              {data.subtitle}
            </p>
          )}
        </header>
        <div className="space-y-12 sm:space-y-16 prose-breath">
          {data.sections.map((section, i) => (
            <section key={i}>
              <h2 className="font-serif text-xl font-semibold text-aisumicha mb-4">
                {section.heading}
              </h2>
              <p className="text-sumi/90 leading-relaxed whitespace-pre-line">
                {section.body}
              </p>
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
