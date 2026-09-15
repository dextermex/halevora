import SiteChrome from "@/components/SiteChrome";
import { useRouteSeo } from "@/site/hooks";
import { CONTACT_EMAIL } from "@/site/contact";

export default function Privacy() {
  useRouteSeo("/privacy");
  return (
    <SiteChrome>
      <main className="page-head">
        <div className="wrap wrap--prose prose">
          <span className="eyebrow" style={{ display: "block", marginBottom: 18 }}>Privacy notice</span>
          <h1>What this site collects: <em>almost nothing.</em></h1>
          <p>Last updated September 2026. This notice explains what halevora.com collects, why, and what it never does.</p>

          <h2>Who we are</h2>
          <p>Halevora &amp; Co is a creator management company. You can reach us at {CONTACT_EMAIL}.</p>

          <h2>What this website collects</h2>
          <p>Nothing by default. The site sets no tracking cookies and loads no analytics or advertising scripts. It uses no cookies at all, which is why there is no cookie banner.</p>
          <p>Fonts and every other file are served from this domain. No third-party script, font or image is loaded on this site.</p>

          <h2>Applications</h2>
          <p>When you send the application form, your answers travel over an encrypted connection to our private intake channel. They are never written to a database on this website.</p>
          <p>See the <a href="/applicant-privacy">applicant privacy notice</a> for how long we keep an application and how to withdraw it.</p>

          <h2>Messaging</h2>
          <p>If you contact us by email, WhatsApp or Telegram, those services apply their own terms. We use the conversation only to answer you and, if you join, to run your account.</p>

          <h2>Your rights</h2>
          <p>You can ask what we hold about you, ask us to correct or delete it, and object to any processing. Write to {CONTACT_EMAIL}. We reply within 30 days.</p>
          <p>If you are in the EU or UK you may also complain to your local data protection authority.</p>

          <h2>Adults only</h2>
          <p>This site and our services are for people aged 18 or older. We do not knowingly collect data from anyone younger.</p>

          <h2>Changes</h2>
          <p>We update this page when anything changes and note the date at the top.</p>
        </div>
      </main>
    </SiteChrome>
  );
}
