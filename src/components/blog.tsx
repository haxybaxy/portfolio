import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Window from "./window";
import Nvim from "./nvim";
import BlogList from "./bloglist";
import BlogPost from "./blogpost";
import { blogPosts, getPostBySlug } from "./blogData";
import "../styles/blog.css";

interface BlogProps {
  onClose: () => void;
  slug: string | null;
}

export default function Blog({ onClose, slug }: BlogProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);

  const post = slug ? getPostBySlug(slug) : undefined;

  // Reading a new post should start at the top, not wherever the list was left
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
    setPercent(0);
  }, [slug]);

  const handleScroll = () => {
    const element = scrollRef.current;
    if (!element) return;

    const scrollable = element.scrollHeight - element.clientHeight;
    setPercent(scrollable <= 0 ? 0 : Math.round((element.scrollTop / scrollable) * 100));
  };

  // The status bar reports real position in the source, the way nvim would
  const totalLines = post ? post.body.split('\n').length : Math.max(blogPosts.length, 1);
  const lineNumber = Math.max(1, Math.round((percent / 100) * totalLines));

  return (
    <Window
      title="blog"
      id="blog"
      filename="blog - nvim"
      onClose={onClose}
      hideTitle={post !== undefined}
      bottomBar={
        <Nvim
          filename={post ? post.slug : 'index'}
          lineNumber={lineNumber}
          charNumber={1}
          percent={percent}
          insertError=""
          vimMode="NORMAL"
        />
      }
    >
      <div className="blog-scroll" ref={scrollRef} onScroll={handleScroll}>
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
    </Window>
  );
}
