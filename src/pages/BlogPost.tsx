import { Link, useParams } from "react-router-dom";
import SiteChrome from "@/components/SiteChrome";
import { BLOG_POSTS, postBySlug, readMinutes } from "@/pages/blog/blogData";
import { useSeo } from "@/site/hooks";
import { APPLY_PATH, CTA_LABEL } from "@/site/contact";
import { ArrowRight } from "@/site/icons";
import NotFound from "./NotFound";
import { renderBody } from "./blog/render";

export default function BlogPost() {
  const { slug } = useParams();
  const post = slug ? postBySlug(slug) : undefined;
  useSeo(post ? post.seoTitle || `${post.title} | Halevora & Co` : "Page not found | Halevora & Co", post?.seoDesc || post?.dek);
  if (!post) return <NotFound />;
  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);
  const body = post.body.replace(/^\s*##\s+.*\n+/, "");
  return (
    <SiteChrome>
      <main>
        <article className="page-head" style={{ paddingBottom: 0 }}>
          <div className="wrap wrap--prose prose">
            <p className="meta"><Link to="/blog">Notes</Link><span>{post.date}</span><span>{readMinutes(post)} min</span></p>
            <h1>{post.title}</h1>
            <p className="post-dek">{post.dek}</p>
            <div className="post-body" dangerouslySetInnerHTML={{ __html: renderBody(body) }} />
            <p style={{ marginTop: 40 }}><Link to={APPLY_PATH} className="btn btn--primary">{CTA_LABEL} <ArrowRight className="arr" width={16} height={16} /></Link></p>
          </div>
        </article>
        <section className="sec">
          <div className="wrap wrap--prose">
            <span className="eyebrow" style={{ display: "block", marginBottom: 8 }}>More notes</span>
            <div className="related">
              {related.map((p) => (
                <article className="glass glass--hover post-card" key={p.slug} style={{ minHeight: 0 }}>
                  <span className="meta">{p.date}</span>
                  <h3><Link to={`/blog/${p.slug}`}>{p.title}</Link></h3>
                  <p>{p.dek}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
