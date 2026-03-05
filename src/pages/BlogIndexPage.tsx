import { Link } from 'react-router-dom'
import { useAsyncContent } from '@/hooks/useAsyncContent'
import { getBlogIndex } from '@/lib/content'
import { format } from 'date-fns'
import { zhTW } from 'date-fns/locale'

export function BlogIndexPage() {
  const { data, loading, error } = useAsyncContent(getBlogIndex)

  if (loading) return <PageSkeleton />
  if (error) return <div className="p-8 text-red-600">載入失敗</div>
  if (!data) return null

  return (
    <article className="page-article">
      <div className="page-container">
        <header className="page-header">
          <h1 className="page-title">{data.title}</h1>
        </header>
        <ul className="section-gap">
          {data.posts.map((post) => (
            <li key={post.slug}>
              <Link
                to={`/blog/${post.slug}`}
                className="block group border-b border-rikyucha/15 pb-6 hover:border-aisumicha/30 transition-colors"
              >
                <h2 className="font-serif text-xl font-semibold text-sumi group-hover:text-aisumicha transition-colors">
                  {post.title}
                </h2>
                <p className="mt-2 body-text text-sumi/75 text-sm line-clamp-2">
                  {post.excerpt}
                </p>
                <time
                  dateTime={post.publishedAt}
                  className="mt-2 block text-xs text-sumi/55"
                >
                  {format(new Date(post.publishedAt), 'yyyy年M月d日', { locale: zhTW })}
                </time>
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
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="h-10 bg-rikyucha/20 rounded w-1/4" />
        <div className="h-20 bg-rikyucha/15 rounded" />
        <div className="h-20 bg-rikyucha/15 rounded" />
      </div>
    </div>
  )
}
