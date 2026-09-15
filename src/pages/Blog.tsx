import { Link } from "react-router-dom";
import SiteChrome from "@/components/SiteChrome";
import { BLOG_POSTS, readMinutes } from "@/pages/blog/blogData";
import { useReveal, useRouteSeo } from "@/site/hooks";
import { ArrowRight } from "@/site/icons";

export default function Blog() {
  useRouteSeo("/blog");
  useReveal();
  return (
    <SiteChrome>
      <main>
        <section className="page-head">
          <div className="wrap">
            <span className="eyebrow">Notes</span>
            <h1 className="h-hero">Notes from <em>the operation.</em></h1>
            <p>Short and specific. Pricing, messaging, traffic and retention, from the people running the roster.</p>
          </div>
        </section>
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="post-grid">
              {BLOG_POSTS.map((p, i) => (
                <article className="glass glass--hover post-card reveal" data-delay={(i % 3)} key={p.slug}>
                  <span className="meta">{p.date} · {readMinutes(p)} min</span>
                  <h3><Link to={`/blog/${p.slug}`}>{p.title}</Link></h3>
                  <p>{p.dek}</p>
                  <Link to={`/blog/${p.slug}`} className="textlink more">Read <ArrowRight className="arr" width={16} height={16} /></Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
