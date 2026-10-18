import { useEffect } from "react";
import { Link, Route, Routes, useLocation, useParams } from "react-router";
import { formatDate, home, pages, posts, summary, type Page } from "./content";
import Markdown from "./Markdown";

const SITE_TITLE = "Jamie Quigley's Website";

function Title({ page }: { page?: string }) {
  return <title>{page ? `${page} :: ${SITE_TITLE}` : SITE_TITLE}</title>;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__logo">
          <Link to="/">
            <div className="logo">Home</div>
          </Link>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="copyright">
          <span>© {new Date().getFullYear()} Jamie Quigley</span>
          <span>
            :: Theme based on <a href="https://github.com/panr/hugo-theme-terminal">terminal</a> by{" "}
            <a href="https://twitter.com/panr">panr</a>&nbsp;
          </span>
          <span>
            :: <a href="https://github.com/Sciencentistguy/jamiequigley.com">Source code</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

function PostMeta({ page }: { page: Page }) {
  if (!page.date) return null;
  return (
    <div className="post-meta">
      <span className="post-date">{formatDate(page.date)}</span>
    </div>
  );
}

function PostList() {
  return (
    <div className="posts">
      {posts.map((post) => (
        <div className="post on-list" key={post.slug}>
          <h1 className="post-title">
            <Link to={`/posts/${post.slug}`}>{post.title}</Link>
          </h1>
          <PostMeta page={post} />
          <div className="post-content">
            <Markdown>{summary(post)}</Markdown>
          </div>
          <div>
            <Link className="read-more button" to={`/posts/${post.slug}`}>
              Read more →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

function Home() {
  return (
    <>
      <Title />
      <div className="index-content">
        <Markdown>{home.body}</Markdown>
      </div>
      <PostList />
    </>
  );
}

function Posts() {
  return (
    <>
      <Title page="Posts" />
      <PostList />
    </>
  );
}

function Article({ page }: { page: Page }) {
  return (
    <div className="post">
      <Title page={page.title} />
      {page.title && <h1 className="post-title">{page.title}</h1>}
      <PostMeta page={page} />
      <div className="post-content">
        <Markdown anchors>{page.body}</Markdown>
      </div>
    </div>
  );
}

function Post() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);
  return post ? <Article page={post} /> : <NotFound />;
}

function StandalonePage() {
  const { slug } = useParams();
  const page = pages.find((p) => p.slug === slug);
  return page ? <Article page={page} /> : <NotFound />;
}

function NotFound() {
  return (
    <div className="post">
      <Title page="404" />
      <h1 className="post-title">404 — Page not found...</h1>
      <div className="post-content">
        <Link to="/">Back to home page&nbsp;→</Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="container headings--one-size">
      <ScrollToTop />
      <Header />
      <div className="content">
        <Routes>
          <Route index element={<Home />} />
          <Route path="posts" element={<Posts />} />
          <Route path="posts/:slug" element={<Post />} />
          <Route path=":slug" element={<StandalonePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
