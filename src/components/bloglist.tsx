import { Link } from 'react-router-dom';
import useSound from 'use-sound';
import { blogPosts, formatPostDate } from './blogData';

// Cards are anchors, not click handlers: a post is only discoverable and
// shareable if there is a real href pointing at it.
export default function BlogList() {
  const [playClick] = useSound('/sounds/toc-click.wav', { volume: 0.5 });

  if (blogPosts.length === 0) {
    return <p className="blog-empty">Nothing published yet.</p>;
  }

  return (
    <div className="blog-list">
      {blogPosts.map((post) => (
        <Link
          key={post.slug}
          to={`/blog/${post.slug}`}
          className="blog-card"
          onClick={() => playClick()}
        >
          <span className="blog-card-meta">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            {post.draft && <span className="blog-draft-badge">draft</span>}
          </span>
          <h2 className="blog-card-title">{post.title}</h2>
          <p className="blog-card-description">{post.description}</p>
          {post.tags.length > 0 && (
            <span className="blog-card-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="blog-tag">{tag}</span>
              ))}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}
