import { Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import type { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import { ArrowLeft } from 'lucide-react';
import useSound from 'use-sound';
import { formatPostDate } from './blogData';
import type { BlogPost } from '../types';

interface BlogPostProps {
  post: BlogPost;
}

// Defined once at module scope: a new object here would remount the whole
// rendered tree on every parent render.
const components: Components = {
  // Only the props an anchor from markdown can actually carry, so react-markdown's
  // `node` never leaks through to the DOM as an unknown attribute.
  a({ href, title, children }) {
    const external = !!href && /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        title={title}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  },
};

const remarkPlugins = [remarkGfm];
const rehypePlugins = [rehypeSlug, rehypeHighlight];

export default function BlogPost({ post }: BlogPostProps) {
  const [playClick] = useSound('/sounds/toc-click.wav', { volume: 0.5 });

  return (
    <div className="blog-post">
      <Link to="/blog" className="blog-back" onClick={() => playClick()}>
        <ArrowLeft size={16} /> Back to All Posts
      </Link>

      <article className="blog-article">
        <header className="blog-article-header">
          <h1 className="blog-article-title">{post.title}</h1>
          <div className="blog-meta">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            {post.tags.map((tag) => (
              <span key={tag} className="blog-tag">{tag}</span>
            ))}
          </div>
        </header>

        <div className="blog-prose">
          <Markdown
            remarkPlugins={remarkPlugins}
            rehypePlugins={rehypePlugins}
            components={components}
          >
            {post.body}
          </Markdown>
        </div>
      </article>
    </div>
  );
}
