import { useParams, Link } from 'react-router-dom'
import { useAsyncContent } from '@/hooks/useAsyncContent'
import { getPost } from '@/lib/content'
import { format } from 'date-fns'
import { zhTW } from 'date-fns/locale'

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const { data, loading, error } = useAsyncContent(
    () => (slug ? getPost(slug) : Promise.resolve(null)),
    [slug]
  )

  if (loading) return <PageSkeleton />
  if (error) return <div className="p-8 text-red-600">載入失敗</div>
  if (!data) {
    return (
      <div className="py-16 px-4 text-center">
        <p className="text-sumi/70">找不到這篇文章。</p>
        <Link to="/blog" className="mt-4 inline-block text-aisumicha hover:underline">
          回到文章列表
        </Link>
      </div>
    )
  }

  return (
    <article className="py-12 sm:py-16 pb-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 readable">
        <Link
          to="/blog"
          className="text-sm text-aisumicha hover:underline mb-6 inline-block"
        >
          ← 文章列表
        </Link>
        <header className="mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-sumi leading-tight">
            {data.title}
          </h1>
          <time
            dateTime={data.publishedAt}
            className="mt-3 block text-sm text-sumi/60"
          >
            {format(new Date(data.publishedAt), 'yyyy年M月d日', { locale: zhTW })}
          </time>
        </header>
        <div className="prose-breath text-sumi/90 leading-relaxed whitespace-pre-line">
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
          <div className="h-4 bg-rikyucha/15 rounded w-3/4" />
        </div>
      </div>
    </div>
  )
}
