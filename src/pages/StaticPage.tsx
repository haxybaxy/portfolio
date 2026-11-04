import { WRITING_HREF } from '../data/blog'
import Post from './Post'
import Writing from './Writing'

/** Every page but the scrolling one. Production serves this as plain HTML, so nothing in it can rely on hydrating. */
function StaticPage({ path }: { path: string }) {
  const slug = path.startsWith(`${WRITING_HREF}/`) ? path.slice(WRITING_HREF.length + 1) : ''

  return (
    <main className="flex min-h-svh flex-col items-center px-6 pt-28 pb-24">{slug ? <Post slug={slug} /> : <Writing />}</main>
  )
}

export default StaticPage
