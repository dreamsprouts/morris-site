import { useAsyncContent } from '@/hooks/useAsyncContent'
import { getHome } from '@/lib/content'
import { CtaButton } from '@/components/CtaButton'

export function HomePage() {
  const { data, loading, error } = useAsyncContent(getHome)

  if (loading) return <HomeSkeleton />
  if (error) return <div className="p-8 text-red-600">載入失敗</div>
  if (!data) return null

  return (
    <article className="pb-20 bg-kinari">
      {/* 單一固定寬度容器：所有 cut 同寬、左右 margin 一致、切齊 */}
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 bg-kinari">
        {data.cuts.map((cut) => {
          const isFirst = cut.id === 'hook'
          return (
            <section
              key={cut.id}
            className={
              isFirst
                ? 'min-h-[70vh] flex flex-col justify-center border-b border-rikyucha/15'
                : 'border-b border-rikyucha/15'
            }
              style={{
                paddingTop: isFirst ? 'clamp(4rem, 12vw, 8rem)' : 'clamp(3rem, 10vw, 6rem)',
                paddingBottom: isFirst ? 'clamp(4rem, 12vw, 8rem)' : 'clamp(3rem, 10vw, 6rem)',
              }}
            >
              <div className="readable text-left">
                <h2
                className={
                  isFirst
                    ? 'font-serif text-3xl sm:text-4xl md:text-[2.75rem] font-semibold text-sumi leading-[1.25] tracking-tight whitespace-pre-line'
                    : 'font-serif text-2xl sm:text-3xl font-semibold text-sumi leading-tight whitespace-pre-line'
                }
              >
                {cut.headline}
              </h2>
              {cut.subline && (
                <p className="mt-5 sm:mt-6 text-sumi/80 leading-relaxed text-lg sm:text-xl max-w-xl whitespace-pre-line">
                  {cut.subline}
                </p>
              )}
              {cut.body && (
                <p className="mt-5 text-sumi/85 leading-[1.75] prose-breath whitespace-pre-line">
                  {cut.body}
                </p>
              )}
              {cut.ctaLabel && cut.ctaHref && (
                <div className="mt-8 sm:mt-10">
                  <CtaButton to={cut.ctaHref} label={cut.ctaLabel} />
                </div>
              )}
              </div>
            </section>
          )
        })}
      </div>
    </article>
  )
}

function HomeSkeleton() {
  return (
    <div className="animate-pulse space-y-16 py-12 px-4">
      <div className="mx-auto max-w-2xl space-y-4">
        <div className="h-8 bg-rikyucha/20 rounded w-4/5" />
        <div className="h-4 bg-rikyucha/15 rounded w-full" />
        <div className="h-4 bg-rikyucha/15 rounded w-3/4" />
      </div>
      <div className="mx-auto max-w-2xl space-y-4">
        <div className="h-8 bg-rikyucha/20 rounded w-1/3" />
        <div className="h-4 bg-rikyucha/15 rounded w-full" />
      </div>
    </div>
  )
}
