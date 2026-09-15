import ApplyForm from "@/site/ApplyForm";
import CausticSweep from "@/site/motion/CausticSweep";

/** Two-step form, private intake, 18+, privacy line. */
export default function ApplySection() {
  return (
    <CausticSweep className="sec" id="apply">
      <div className="wrap">
        <div className="split split--r">
          <div className="sticky">
            <div className="sec-head reveal" style={{ marginBottom: 24 }}>
              <span className="eyebrow">Applications</span>
              <h2 className="h-sec">Apply for <em>2027.</em></h2>
              <p>Two short steps. A senior operator reviews every application and replies within three working days.</p>
            </div>
            <p className="caption reveal" data-delay="1">Your answers go to a private intake channel. Nothing is stored on this website.</p>
          </div>
          <div className="reveal" data-delay="1"><ApplyForm /></div>
        </div>
      </div>
    </CausticSweep>
  );
}
