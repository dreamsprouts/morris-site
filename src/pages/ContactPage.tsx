import { useAsyncContent } from '@/hooks/useAsyncContent'
import { getContact } from '@/lib/content'

export function ContactPage() {
  const { data, loading, error } = useAsyncContent(getContact)

  if (loading) return <PageSkeleton />
  if (error) return <div className="p-8 text-red-600">載入失敗</div>
  if (!data) return null

  return (
    <article className="page-article">
      <div className="page-container readable">
        <header className="page-header">
          <h1 className="page-title">{data.title}</h1>
          {data.lead && (
            <p className="page-lead">{data.lead}</p>
          )}
        </header>

        <section className="mb-12 sm:mb-16">
          <h2 className="section-title">
            聯絡管道
          </h2>
          <ul className="space-y-3">
            {data.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-sumi hover:text-aisumicha underline underline-offset-2 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {(data.formTitle || data.formDescription) && (
          <section className="pt-12 sm:pt-16">
            {data.formTitle && (
              <h2 className="section-title">
                {data.formTitle}
              </h2>
            )}
            {data.formDescription && (
              <p className="body-text text-sumi/75 text-sm mb-4">{data.formDescription}</p>
            )}
            <form
              action={
                import.meta.env.VITE_FORMSPREE_ID
                  ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`
                  : '#'
              }
              method="POST"
              className="space-y-4"
            >
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-sumi/80 mb-1">
                  你的 Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-rikyucha/30 rounded bg-kinari text-sumi placeholder-sumi/40 focus:outline-none focus:ring-2 focus:ring-aisumicha/30 focus:border-aisumicha"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-sumi/80 mb-1">
                  訊息
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-3 py-2 border border-rikyucha/30 rounded bg-kinari text-sumi placeholder-sumi/40 focus:outline-none focus:ring-2 focus:ring-aisumicha/30 focus:border-aisumicha resize-y"
                  placeholder="想說的話……"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-aisumicha text-shironeri text-sm font-medium rounded hover:bg-aisumicha/90 transition-colors"
              >
                送出
              </button>
            </form>
          </section>
        )}
      </div>
    </article>
  )
}

function PageSkeleton() {
  return (
    <div className="animate-pulse py-12 px-4">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="h-10 bg-rikyucha/20 rounded w-1/4" />
        <div className="h-4 bg-rikyucha/15 rounded w-full" />
        <div className="h-24 bg-rikyucha/15 rounded" />
      </div>
    </div>
  )
}
