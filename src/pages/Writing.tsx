import { blogPosts, formatPostDate, postHref } from '../data/blog'
import { LINK, MUTED, SECTION_TITLE } from '../surface'

function Writing() {
  return (
    <div className="flex w-full max-w-3xl flex-col gap-10">
      <a href="/#about" className={`inline-flex items-center gap-2 self-start text-sm ${LINK}`}>
        <span aria-hidden="true">←</span> Back
      </a>
      <h1 className={SECTION_TITLE}>Writing</h1>

      {blogPosts.length === 0 && <p className="opacity-70">Nothing published yet.</p>}

      <ul className="flex flex-col gap-4">
        {blogPosts.map((post) => (
          <li key={post.slug} className="grid gap-x-8 gap-y-1 sm:grid-cols-[10rem_1fr]">
            <time dateTime={post.date} className={MUTED}>
              {formatPostDate(post.date)}
            </time>
            <a href={postHref(post.slug)} className={`justify-self-start text-lg font-bold ${LINK}`}>
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Writing
