import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import hMono from "@/assets/brand/h-glass-96.webp";
import hMonoLg from "@/assets/brand/h-glass-cut.webp";
import { APPLY_PATH, CONTACT_EMAIL, CTA_LABEL, ENTITY_LINE } from "@/site/contact";

/**
 * Shared page chrome: the announcement bar and fixed nav, then the footer.
 * The home page passes `home` so section links stay in-page anchors; every
 * other page links back to the home anchors.
 */
const NAV: [string, string][] = [
  ["Management", "#management"],
  ["The operation", "#operation"],
  ["Results", "#results"],
];

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`wordmark ${className || ""}`}>
      Halevora<span className="co"> <span className="amp">&amp;</span> Co</span>
    </span>
  );
}

export default function SiteChrome({ home = false, children }: { home?: boolean; children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const anchor = (hash: string) => (home ? hash : `/${hash}`);
  const current = (p: string): "page" | undefined => (pathname === p ? "page" : undefined);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <header className={`nav${scrolled ? " scrolled" : ""}`} id="nav">
        <div className="announce" role="status">
          <span className="dot" aria-hidden="true" />
          <span>Now accepting applications for <b>2027</b></span>
        </div>
        <div className="wrap nav-inner">
          <Link to="/" className="brand" aria-label="Halevora & Co, home">
            <img src={hMono} alt="" className="brand-mark" width={30} height={30} />
            <Wordmark />
          </Link>
          <nav className={`nav-links${open ? " open" : ""}`} id="navlinks" aria-label="Primary" onClick={() => setOpen(false)}>
            {NAV.map(([label, hash]) => <a key={hash} href={anchor(hash)}>{label}</a>)}
            <Link to={APPLY_PATH} aria-current={current(APPLY_PATH)}>Apply</Link>
            <Link to="/faq" aria-current={current("/faq")}>FAQ</Link>
            <Link to="/blog" aria-current={pathname.startsWith("/blog") ? "page" : undefined}>Blog</Link>
            <Link to={APPLY_PATH} className="btn btn--primary">{CTA_LABEL}</Link>
          </nav>
          <div className="nav-right">
            <Link to={APPLY_PATH} className="btn btn--primary nav-cta-sm">Apply</Link>
            <button className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="navlinks" onClick={() => setOpen((v) => !v)}>
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      <div id="main">{children}</div>

      <footer className="site">
        <div className="wrap">
          <div className="foot-top">
            <div className="foot-brand">
              <img src={hMonoLg} alt="The Halevora glass H monogram" className="foot-mono" width={96} height={91} loading="lazy" />
              <Link to="/" className="brand" aria-label="Halevora & Co"><Wordmark /></Link>
              <p>Selective creator management. Influence, engineered.</p>
              <span className="age-badge"><b>18+</b> Adults only. Every creator we work with is 18 or older.</span>
            </div>
            <div className="foot-col"><h5>Agency</h5><a href={anchor("#management")}>Management</a><a href={anchor("#operation")}>The operation</a><a href={anchor("#results")}>Results</a><Link to="/case-studies">Case studies</Link><a href={anchor("#ninety")}>The first 90 days</a></div>
            <div className="foot-col"><h5>Company</h5><Link to={APPLY_PATH}>Apply</Link><Link to="/faq">FAQ</Link><Link to="/blog">Blog</Link><a href={`mailto:${CONTACT_EMAIL}`}>Contact</a></div>
            <div className="foot-col"><h5>Legal</h5><Link to="/privacy">Privacy notice</Link><Link to="/applicant-privacy">Applicant privacy</Link></div>
          </div>
          <div className="foot-bottom">
            <span>© 2026 Halevora &amp; Co. All rights reserved. {ENTITY_LINE}</span>
            <span>{CONTACT_EMAIL}</span>
          </div>
          <p className="foot-note">Applications go to a private intake channel and are never stored on this website.</p>
        </div>
      </footer>
    </>
  );
}
