import { useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { CONTACT_EMAIL, INTAKE_ENDPOINT, TELEGRAM_URL } from "./contact";
import { ArrowRight, Check, Shield } from "./icons";
import { EASE_GLASS } from "./motion/ease";

const PLATFORMS = ["OnlyFans", "Fanvue", "Fansly", "Telegram"] as const;
const EARNINGS = ["Not yet earning", "Under $2K a month", "$2K to $10K a month", "$10K to $50K a month", "$50K to $150K a month", "Over $150K a month", "Prefer not to say"];
const HELP = ["Traffic", "Conversation and sales", "Content production", "Pricing and strategy", "Account operations", "A second platform"];

type Status = "idle" | "sending" | "ok" | "bad";

/**
 * Two-step intake. The first screen asks only for the essentials; the second
 * for the pages. Posts JSON to the edge endpoint in worker.js, which forwards
 * to the private intake channel and stores nothing. If the endpoint is
 * unreachable the form offers email (and Telegram, when configured) instead.
 */
export default function ApplyForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [dir, setDir] = useState(1);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  function validate(fd: FormData, which: 1 | 2) {
    const d = Object.fromEntries(fd.entries()) as Record<string, string>;
    const errs: Record<string, string> = {};
    if (which === 1) {
      if (!d.name?.trim()) errs.name = "Add your name.";
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email || "")) errs.email = "Enter a valid email address.";
      if (!d.phone?.trim()) errs.phone = "Add a number for WhatsApp or Telegram.";
      if (!d.platform) errs.platform = "Choose the platform you mainly earn on.";
    } else {
      if (!d.age) errs.age = "You must be 18 or older to apply.";
      if (!d.privacy) errs.privacy = "Please agree to the applicant privacy notice.";
    }
    setErrors(errs);
    if (Object.keys(errs).length) {
      formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return false;
    }
    return true;
  }

  function next() {
    const form = formRef.current;
    if (!form) return;
    if (validate(new FormData(form), 1)) {
      setDir(1);
      setStep(2);
      requestAnimationFrame(() => form.querySelector<HTMLElement>("#ap-creator")?.focus());
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (step === 1) { next(); return; }
    if (!validate(fd, 1) || !validate(fd, 2)) return;
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;
    const help = fd.getAll("help").map(String);
    const links = String(data.links || "").split(/\n+/).map((s) => s.trim()).filter(Boolean).slice(0, 5);
    setStatus("sending");
    const payload = { ...data, help, links, source: window.location.pathname, ts: new Date().toISOString() };
    try {
      const res = await fetch(INTAKE_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("bad");
    }
  }

  if (status === "ok") {
    return (
      <div className="glass apply-done" role="status" aria-live="polite">
        <span className="check"><Check width={18} height={18} /></span>
        <h3>Received. <em>A senior operator has it.</em></h3>
        <p className="sub">You will hear from us within three working days on the channel you gave.</p>
      </div>
    );
  }

  return (
    <form className="glass apply-form" ref={formRef} onSubmit={onSubmit} noValidate aria-label="Application for 2027">
      <div className="af-steps" aria-label="Progress">
        <span className={`af-step ${step === 1 ? "on" : "done"}`}>1 · You</span>
        <span className={`af-step ${step === 2 ? "on" : ""}`}>2 · Your pages</span>
      </div>

      {/* Step 1 stays mounted (hidden) so its values submit with step 2. */}
      <div className="form-grid" hidden={step !== 1}>
        <div className="field">
          <label htmlFor="ap-name">Name</label>
          <input id="ap-name" name="name" className="input" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? "ap-name-err" : undefined} />
          {errors.name ? <span className="err" id="ap-name-err">{errors.name}</span> : null}
        </div>
        <div className="field">
          <label htmlFor="ap-email">Email</label>
          <input id="ap-email" name="email" type="email" inputMode="email" className="input" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? "ap-email-err" : undefined} />
          {errors.email ? <span className="err" id="ap-email-err">{errors.email}</span> : null}
        </div>
        <div className="field span2">
          <label htmlFor="ap-phone">Phone <span className="hint">(WhatsApp or Telegram)</span></label>
          <input id="ap-phone" name="phone" type="tel" inputMode="tel" className="input" autoComplete="tel" required aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "ap-phone-err" : undefined} />
          {errors.phone ? <span className="err" id="ap-phone-err">{errors.phone}</span> : null}
        </div>
        <fieldset className="field span2 fieldset">
          <legend>Main platform</legend>
          <div className="seg" role="radiogroup" aria-invalid={!!errors.platform}>
            {PLATFORMS.map((p) => (
              <label key={p}><input type="radio" name="platform" value={p} required /> {p}</label>
            ))}
          </div>
          {errors.platform ? <span className="err">{errors.platform}</span> : null}
        </fieldset>
        <div className="span2 privacy-line">
          <Shield />
          <p><b>Private by design.</b> Your answers go to a private intake channel. Nothing is stored on this website.</p>
        </div>
        <div className="span2 cta-row">
          <button type="button" className="btn btn--primary btn--lg" onClick={next}>
            Continue <ArrowRight className="arr" width={18} height={18} />
          </button>
          <span className="cta-note">Two steps · Under two minutes</span>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {step === 2 ? (
          <motion.div className="form-grid" key="step2" initial={{ opacity: 0, x: 28 * dir }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -28 * dir }} transition={{ duration: 0.5, ease: EASE_GLASS }}>
            <div className="field">
              <label htmlFor="ap-creator">Creator name <span className="hint">(optional)</span></label>
              <input id="ap-creator" name="creator" className="input" autoComplete="nickname" />
            </div>
            <div className="field">
              <label htmlFor="ap-location">Location</label>
              <input id="ap-location" name="location" className="input" autoComplete="country-name" placeholder="City, country" />
            </div>
            <div className="field span2">
              <label htmlFor="ap-links">Creator and social links</label>
              <textarea id="ap-links" name="links" className="textarea" placeholder="https://" rows={3} />
              <span className="hint">One full link per line, up to five.</span>
            </div>
            <div className="field span2">
              <label htmlFor="ap-earn">Approximate monthly earnings</label>
              <select id="ap-earn" name="earnings" className="select" defaultValue="">
                <option value="" disabled>Choose a range</option>
                {EARNINGS.map((e) => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
            <fieldset className="field span2 fieldset">
              <legend>Where is the ceiling right now?</legend>
              <div className="seg">
                {HELP.map((h) => (
                  <label key={h}><input type="checkbox" name="help" value={h} /> {h}</label>
                ))}
              </div>
            </fieldset>
            <div className="field span2">
              <label htmlFor="ap-more">Anything else <span className="hint">(optional)</span></label>
              <textarea id="ap-more" name="more" className="textarea" rows={2} />
            </div>
            <div className="span2 consent">
              <label className="checkrow">
                <input type="checkbox" name="age" value="yes" required aria-invalid={!!errors.age} />
                <span>I confirm that I am at least 18 years old.</span>
              </label>
              {errors.age ? <span className="err">{errors.age}</span> : null}
              <label className="checkrow">
                <input type="checkbox" name="privacy" value="yes" required aria-invalid={!!errors.privacy} />
                <span>I agree to the <Link to="/applicant-privacy" className="link">applicant privacy notice</Link> and to contact from Halevora &amp; Co by phone, WhatsApp, Telegram or email.</span>
              </label>
              {errors.privacy ? <span className="err">{errors.privacy}</span> : null}
            </div>
            {status === "bad" ? (
              <div className="span2 form-status bad" role="alert">
                We could not send that just now. <a href={`mailto:${CONTACT_EMAIL}?subject=Application%20for%202027`} className="link">Email your application</a>
                {TELEGRAM_URL ? <> or <a href={TELEGRAM_URL} className="link" target="_blank" rel="noopener noreferrer">send it on Telegram</a></> : null} instead.
              </div>
            ) : null}
            <div className="span2 cta-row">
              <button type="submit" className="btn btn--primary btn--lg" disabled={status === "sending"}>
                {status === "sending" ? "Sending" : "Send application"} <ArrowRight className="arr" width={18} height={18} />
              </button>
              <button type="button" className="btn btn--ghost" onClick={() => { setDir(-1); setStep(1); }}>Back</button>
              <span className="cta-note">Reply within three working days</span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </form>
  );
}
