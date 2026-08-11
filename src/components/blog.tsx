import { memo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import BlogList from "./bloglist";
import BlogPost from "./blogpost";
import { getPostBySlug } from "./blogData";
import "../styles/blog.css";

interface BlogProps {
  slug: string | null;
}

/*
 * Rendered into the landing page's own window (see IntroWindow's `secondary`), not
 * into a window of its own — the chrome, the close control and the box this fills
 * all belong to that component. This owns its own scroller so a post can scroll
 * inside a window whose bottom edge is the bottom of the viewport.
 */
function Blog({ slug }: BlogProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const post = slug ? getPostBySlug(slug) : undefined;

  // Reading a new post should start at the top, not wherever the list was left
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [slug]);

  return (
    <div className="blog-scroll" ref={scrollRef}>
      {slug === null ? (
        <BlogList />
      ) : post ? (
        <BlogPost post={post} />
      ) : (
        <div className="blog-missing">
          <h2>No post called “{slug}”.</h2>
          <Link to="/blog" className="blog-missing-back">Back to Blog</Link>
        </div>
      )}
    </div>
  );
}

/*
 * Memoised because Intro re-renders on every navigation, and react-markdown reparses
 * the whole article each time it renders. Closing a long post held the main thread for
 * ~300ms — long enough that the window visibly sat still after the click before the
 * collapse started. The slug is frozen while closing, so this skips that work entirely.
 */
export default memo(Blog);
