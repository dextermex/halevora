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
              <p>Two steps. A senior operator replies within three working days.</p>
            </div>
          </div>
          <div className="reveal" data-delay="1"><ApplyForm /></div>
        </div>
      </div>
    </CausticSweep>
  );
}
