import SiteChrome from "@/components/SiteChrome";
import { useRouteSeo } from "@/site/hooks";
import { CONTACT_EMAIL } from "@/site/contact";

export default function ApplicantPrivacy() {
  useRouteSeo("/applicant-privacy");
  return (
    <SiteChrome>
      <main className="page-head">
        <div className="wrap wrap--prose prose">
          <span className="eyebrow" style={{ display: "block", marginBottom: 18 }}>Applicant privacy</span>
          <h1>Your application, <em>and where it goes.</em></h1>
          <p>Last updated September 2026. This notice covers the application form and any application you send us by message.</p>

          <h2>Where your answers go</h2>
          <p>The form posts your answers over an encrypted connection to our private intake channel, where only the senior operators who review applications can read them.</p>
          <p>Nothing is stored in a database on this website, and no copy is kept on the web server.</p>

          <h2>What we ask for and why</h2>
          <ul>
            <li>Name, creator name, email, phone and location, so we can reply on the channel you prefer.</li>
            <li>Main platform, profile links and an earnings range, so the review is built from your real position.</li>
            <li>Where the ceiling is right now, so the right role lead reads it.</li>
            <li>Confirmation that you are 18 or older. We do not review applications from anyone younger.</li>
          </ul>

          <h2>How long we keep it</h2>
          <p>If we do not go ahead together, your application is deleted from the intake channel within 90 days. If you join Halevora &amp; Co, the details move into your account file under your management agreement.</p>

          <h2>Withdrawing</h2>
          <p>Message us on the channel you applied from, or write to {CONTACT_EMAIL}, and we delete the application. You can also ask for a copy of what we hold.</p>

          <h2>Who else sees it</h2>
          <p>No one. Applications are never sold, shared with brands, or used for anything other than reviewing your fit with Halevora &amp; Co.</p>
        </div>
      </main>
    </SiteChrome>
  );
}
