import { Link } from "react-router-dom";
import SiteChrome from "@/components/SiteChrome";
import { useRouteSeo } from "@/site/hooks";
import { ArrowRight } from "@/site/icons";
import bird from "@/assets/brand/bird-cut.webp";

export default function NotFound() {
  useRouteSeo("/404");
  return (
    <SiteChrome>
      <main className="page-head notfound">
        <div className="wrap split">
          <div>
            <span className="eyebrow" style={{ display: "block", marginBottom: 18 }}>404</span>
            <h1 className="h-hero">Not here. <em>Not lost either.</em></h1>
            <p className="sub" style={{ marginTop: 18 }}>The page you wanted is not on this site. Everything else is one click away.</p>
            <p style={{ marginTop: 28 }}><Link to="/" className="btn btn--primary">Back to the start <ArrowRight className="arr" width={16} height={16} /></Link></p>
          </div>
          <img src={bird} alt="" width={800} height={663} style={{ maxWidth: 320, opacity: 0.9 }} />
        </div>
      </main>
    </SiteChrome>
  );
}
