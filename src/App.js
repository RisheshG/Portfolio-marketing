import { useState, useEffect } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const WHAT_I_DO = [
  {
    icon: "📬",
    title: "Email Deliverability",
    desc: "I fix broken sender reputations, configure SPF/DKIM/DMARC, manage domain warm-up, and get emails into inboxes not spam folders.",
  },
  {
    icon: "🚀",
    title: "Growth & GTM",
    desc: "End-to-end outbound engines lead sourcing, list cleaning, sequencing, LinkedIn outreach, Meta ads. I build the pipeline, not just the campaigns.",
  },
  {
    icon: "🤝",
    title: "Customer Success",
    desc: "Full client lifecycle ownership onboarding, technical support, renewals, upsell. 90%+ retention across 100+ US and Europe accounts.",
  },
  {
    icon: "⚙️",
    title: "Automation & Tooling",
    desc: "When the tool doesn't exist, I build it. React apps, Python scripts, AppScript automations I've replaced entire manual workflows with code.",
  },
];

const EXPERIENCE = [
  {
    title: "Head of Marketing & Operations",
    company: "Xgrowth LLC",
    period: "Jul 2026 – Present",
    type: "Full-time",
    bullets: [
      "90%+ renewal rate across 100+ enterprise accounts (up to $75K/month)",
      "20–30% expansion/upsell revenue growth through proactive account reviews",
      "Built React + AppScript + Python tool to automate domain/IP warm-up across 500+ domains",
      "Hired and trained 7-member cross-functional team",
      "Awarded Employee of the Year 2025",
    ],
  },
  {
    title: "Email Marketing & Operations Manager",
    company: "Xgrowth LLC",
    period: "Jun 2025 – Jun 2026",
    type: "Full-time",
    bullets: [
      "Managed end-to-end email marketing operations for 100+ US and Europe accounts",
      "Oversaw deliverability infrastructure, campaign strategy, and client success across the portfolio",
      "Led cross-functional team spanning client support, deliverability, and operations",
    ],
  },
  {
    title: "Email Marketing & Deliverability Specialist",
    company: "Xgrowth LLC",
    period: "Dec 2024 – May 2025",
    type: "Full-time",
    bullets: [
      "Reduced client bounce rate from 30% → 3% via authentication fixes and list hygiene",
      "Managed IP/domain warm-up across 100+ sending domains",
      "Lifted campaign open rates to 50–60%+ and reply rates to ~3%",
      "Promoted from intern to full-time within 6 months",
    ],
  },
  {
    title: "Email Marketing & Deliverability Intern",
    company: "Xgrowth LLC",
    period: "Jun 2024 – Nov 2024",
    type: "Internship",
    bullets: [
      "Executed B2B email campaigns and monitored deliverability metrics",
      "Built foundational expertise in sender reputation and campaign performance",
    ],
  },
];

const CASE_STUDIES = [
  {
    tag: "Deliverability Recovery",
    color: "#6366f1",
    title: "From spam folder to inbox: a full deliverability turnaround",
    challenge: "A key enterprise client's domain reputation had collapsed to 'Poor' standing on Google Postmaster. Every email was landing in spam. Campaigns were dead in the water and the client was about to churn.",
    action: [
      "Audited the full sending infrastructure found misconfigured SPF/DMARC records and a poisoned IP from a shared sending pool",
      "Rebuilt authentication from scratch, migrated to clean dedicated IPs, restructured the sending schedule",
      "Managed a full structured warm-up manually while simultaneously building an internal automation tool (React + Python) to replace the manual process permanently",
      "Ran list hygiene through MillionVerify and ZeroBounce to eliminate dead contacts dragging sender score down",
    ],
    result: [
      { num: "30% → 3%", label: "Bounce Rate" },
      { num: "Poor → High", label: "Sender Reputation" },
      { num: "50–60%", label: "Open Rate Recovery" },
      { num: "100+", label: "Domains on Automation" },
    ],
    outcome: "The client stayed, expanded their contract, and the automation tool we built in the process is now deployed across every client account.",
  },
  {
    tag: "GTM from Zero",
    color: "#f59e0b",
    title: "Building an outbound GTM engine that closed $25K/month clients",
    challenge: "Xgrowth needed to grow its US and Europe client base with no existing outbound engine, no playbook, and minimal budget.",
    action: [
      "Built the full lead gen stack: ZoomInfo + Seamless.ai for sourcing, ZeroBounce + MillionVerify for hygiene, Instantly + Smartlead for sequencing",
      "Set up LinkedIn outreach via Sales Navigator and Waalaxy in parallel with cold email",
      "Wrote and tested personalized sequences per vertical every email referenced the prospect's specific deliverability or outreach pain",
      "Ran Meta and LinkedIn ads to warm inbound alongside cold outbound",
    ],
    result: [
      { num: "50+", label: "Active Accounts" },
      { num: "$25K/mo", label: "Top Client Value" },
      { num: "~3%", label: "Cold Reply Rate" },
      { num: "20–30%", label: "Expansion Revenue" },
    ],
    outcome: "Grew the active client base from near-zero to 50+ international accounts within 12 months, including enterprise deals. Owned the full terms sourcing to close to retention.",
  },
  {
    tag: "Full Infrastructure Rebuild",
    color: "#10b981",
    title: "Rebuilt a dead outbound setup into a 6% reply-rate engine",
    challenge: "A client came to me getting near-zero responses from cold outreach. Emails weren't landing, the domain setup was misconfigured, and the campaigns had no path to recover on the existing infrastructure.",
    action: [
      "Rebuilt the entire sending setup from the ground up new domain configuration, custom tracking domain, and a dedicated IP to isolate reputation",
      "Migrated the outreach to Lemlist as the sequencing tool for cleaner deliverability and reliable send control",
      "Ran full list hygiene through MillionVerify to strip dead and risky contacts before any send",
      "Built a structured warm-up and ramp-up plan and had the client follow it step by step to establish sender reputation safely",
    ],
    result: [
      { num: "~0% → 6%", label: "Reply Rate" },
      { num: "1yr+", label: "Client Retained" },
      { num: "Dedicated", label: "IP + Tracking Domain" },
      { num: "3 Channels", label: "Email + LinkedIn + Calls" },
    ],
    outcome: "The client has stayed on for over a year with strong, consistent results roughly a 6% reply rate on campaigns and has since expanded from email into LinkedIn outreach and calling.",
  },
];

const PROJECTS = [
  {
    name: "Spam Word Highlighter",
    tech: ["React"],
    img: "./images/project_spam_checker.png",
    desc: "Scans email copy for spam-trigger words, highlights them inline, and lists all flagged terms reducing spam classification risk before sequences go live.",
    github: "",
    live: "",
    color: "#8b5cf6",
  },
  {
    name: "Blacklist Checker",
    tech: ["React", "DNS APIs"],
    img: "./images/project_blacklist_checker.png",
    desc: "Check any sending domain or IP against major blocklists (Spamhaus, SpamCop, Barracuda, SORBS) with status, reason, TTL, and response time instant remediation visibility.",
    github: "",
    live: "",
    color: "#06b6d4",
  },
  {
    name: "Email DNS Checker",
    tech: ["React", "DNS APIs"],
    img: "./images/project_dns_checker.png",
    desc: "Upload a CSV of lead emails the app checks DNS alignment for every domain and exports two CSVs: all records found and missing records.",
    github: "",
    live: "",
    color: "#6366f1",
  },
  {
    name: "Campaign Analytics Data Studio",
    tech: ["Google Data Studio"],
    img: "./images/project_data_studio.png",
    desc: "Client-facing campaign dashboard tracking total recipients, open rate trends, click rate, and bounce rate over time built for a US-based retail client sending 780K+ emails/month.",
    github: "",
    live: "",
    color: "#f59e0b",
  },
  {
    name: "Deliverability Trends BiWeekly Analysis",
    tech: ["Google Data Studio"],
    img: "./images/project_data_studio_2.png",
    desc: "Multi-metric combo chart tracking CR, unsub rate, open rate, and bounce rate across biweekly sends over 2 years used for client performance reviews and strategy pivots.",
    github: "",
    live: "",
    color: "#10b981",
  },
  {
    name: "Campaign Dashboard Tableau",
    tech: ["Tableau"],
    img: "./images/project_tableau.png",
    desc: "Tableau dashboard tracking total leads, messages sent, delivered, open rate, reply rate, and bounce rate with campaign-level and sender-level performance breakdown.",
    github: "",
    live: "",
    color: "#f43f5e",
  },
];

const TOOLS = [
  {
    category: "CRM & Outreach",
    items: ["HubSpot", "Zoho CRM", "Apollo", "Instantly", "Smartlead", "SalesHandy", "Lemlist", "Woodpecker", "ActiveCampaign", "Mailchimp", "Klaviyo", "xEmailCampaign"],
  },
  {
    category: "LinkedIn & Social",
    items: ["LinkedIn Sales Navigator", "Waalaxy", "Zoho Social", "Meta Business Suite"],
  },
  {
    category: "Lead Generation",
    items: ["ZoomInfo", "Seamless.ai", "Apollo", "LinkedIn Sales Navigator"],
  },
  {
    category: "List Cleaning",
    items: ["MillionVerify", "ZeroBounce", "NeverBounce"],
  },
  {
    category: "Deliverability",
    items: ["Lemwarm", "xEmailWarmup", "Mailreach", "Mail Tester", "Spamhaus", "MxToolbox", "Google Postmaster", "MailWizz"],
  },
  {
    category: "Analytics & Reporting",
    items: ["Google Data Studio", "Tableau", "Microsoft Clarity", "Zoho SalesIQ"],
  },
  {
    category: "Ops & Productivity",
    items: ["Jira", "ZCal", "Partnero", "Excel", "Google Sheets"],
  },
  {
    category: "Technical",
    items: ["React", "Python", "Google AppScript", "SQL"],
  },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Nav({ scrolled, scrollTo }) {
  const links = ["About", "Education", "Experience", "Case Studies", "Projects", "Tools", "Contact"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "18px 0",
      background: scrolled ? "rgba(10,10,15,0.96)" : "transparent",
      backdropFilter: scrolled ? "blur(24px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      transition: "all 0.4s",
    }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div onClick={() => scrollTo("hero")} style={{ cursor: "pointer", fontWeight: 800, fontSize: 20, color: "#fff", letterSpacing: "-0.5px" }}>
          Rishesh<span style={{ color: "#6366f1" }}>.</span>
        </div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {links.map(l => (
            <span key={l} onClick={() => scrollTo(l.toLowerCase().replace(" ", "-"))} style={{ color: "#9ca3af", fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#fff"}
              onMouseLeave={e => e.target.style.color = "#9ca3af"}>
              {l}
            </span>
          ))}
          <button onClick={() => scrollTo("contact")} style={{ background: "#6366f1", color: "#fff", border: "none", padding: "9px 22px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => { e.target.style.background = "#4f46e5"; e.target.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.target.style.background = "#6366f1"; e.target.style.transform = "translateY(0)"; }}>
            Hire Me
          </button>
        </div>
      </div>
    </nav>
  );
}

function Hero({ scrollTo }) {
  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 0 80px", position: "relative", overflow: "hidden" }}>
      {/* Background glow */}
      <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 800, height: 600, background: "radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 32px", width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 64, alignItems: "center" }}>
          <div>
            {/* Available badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: 100, padding: "6px 16px", marginBottom: 32 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }} />
              <span style={{ fontSize: 13, color: "#a5b4fc", fontWeight: 500 }}>Open to opportunities</span>
            </div>

            <h1 style={{ fontSize: "clamp(40px, 5.5vw, 80px)", fontWeight: 900, lineHeight: 1.05, color: "#fff", marginBottom: 24, letterSpacing: "-2px" }}>
              Where marketing strategy<br />
              <span style={{ position: "relative", display: "inline-block" }}>
                strategy meets
                <span style={{ position: "absolute", bottom: -4, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, #6366f1, #06b6d4)", borderRadius: 2 }} />
              </span>
              <br />technical execution.
            </h1>

            <p style={{ fontSize: 18, color: "#6b7280", lineHeight: 1.75, maxWidth: 520, marginBottom: 40 }}>
              I'm <strong style={{ color: "#e5e7eb" }}>Rishesh Gangwar</strong> Head of Marketing & Customer Success at Xgrowth LLC.
              I grow B2B SaaS revenue, fix deliverability problems at the DNS level, and ship React apps to automate the work most marketers do manually.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48 }}>
              <button onClick={() => scrollTo("case-studies")} style={{ background: "#6366f1", color: "#fff", border: "none", padding: "14px 32px", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
                See My Work
              </button>
              <a href="/Rishesh_Gangwar_Resume.pdf" download="Rishesh_Gangwar_Resume.pdf" style={{ textDecoration: "none" }}>
              <button style={{ background: "transparent", color: "#e5e7eb", border: "1px solid rgba(255,255,255,0.15)", padding: "14px 32px", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
              Download Resume ↓
              </button>
              </a>
            </div>


          </div>

          {/* Photo */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div style={{
              width: 260, height: 260, borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 0 80px rgba(99,102,241,0.2)",
            }}>
              <img src="./images/profile_photo.png" alt="Rishesh Gangwar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 13, color: "#9ca3af", fontWeight: 600 }}>NIT Allahabad</div>
              <div style={{ fontSize: 12, color: "#4b5563" }}>IT '24 · Noida, India</div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <a href="https://www.linkedin.com/in/rishesh-gangwar-bb7026241/" target="_blank" rel="noreferrer" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#9ca3af", padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, textDecoration: "none" }}>LinkedIn ↗</a>
              <a href="mailto:risheshgangwar@icloud.com" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#9ca3af", padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, textDecoration: "none" }}>Email</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatIDo() {
  return (
    <section id="about" style={{ padding: "100px 0", background: "rgba(255,255,255,0.02)" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, color: "#6366f1", textTransform: "uppercase", marginBottom: 12 }}>What I Do</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "#fff", letterSpacing: "-1px" }}>Four things, done deeply.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {WHAT_I_DO.map((w, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 28, transition: "all 0.3s", cursor: "default" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)"; e.currentTarget.style.background = "rgba(99,102,241,0.05)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{w.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 10 }}>{w.title}</div>
              <div style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7 }}>{w.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" style={{ padding: "100px 0" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, color: "#6366f1", textTransform: "uppercase", marginBottom: 12 }}>Experience</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "#fff", letterSpacing: "-1px" }}>Where I've worked</h2>
        </div>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 5, top: 8, bottom: 0, width: 1, background: "linear-gradient(to bottom, #6366f1, transparent)" }} />
          {EXPERIENCE.map((exp, i) => (
            <div key={i} style={{ display: "flex", gap: 32, marginBottom: 32 }}>
              {/* Timeline dot */}
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#6366f1", border: "2px solid #0a0a0f", boxShadow: "0 0 0 3px rgba(99,102,241,0.3)", flexShrink: 0, marginTop: 8 }} />
              {/* Card */}
              <div style={{ flex: 1, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 28, transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)"; e.currentTarget.style.background = "rgba(99,102,241,0.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>{exp.title}</div>
                    <div style={{ fontSize: 14, color: "#6366f1", fontWeight: 600, marginTop: 2 }}>{exp.company}</div>
                  </div>
                  <div style={{ fontSize: 12, color: "#6b7280", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", padding: "4px 14px", borderRadius: 100, height: "fit-content", fontWeight: 500 }}>
                    {exp.period}
                  </div>
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                  {exp.bullets.map((b, j) => (
                    <li key={j} style={{ display: "flex", gap: 10, color: "#9ca3af", fontSize: 14, lineHeight: 1.65 }}>
                      <span style={{ color: "#6366f1", flexShrink: 0, marginTop: 2 }}>▸</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudies() {
  const [open, setOpen] = useState(null);
  return (
    <section id="case-studies" style={{ padding: "100px 0", background: "rgba(255,255,255,0.02)" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, color: "#6366f1", textTransform: "uppercase", marginBottom: 12 }}>Case Studies</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "#fff", letterSpacing: "-1px" }}>Real problems, real results.</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {CASE_STUDIES.map((cs, i) => (
            <div key={i} style={{ border: `1px solid ${open === i ? cs.color + "60" : "rgba(255,255,255,0.07)"}`, borderRadius: 20, overflow: "hidden", transition: "all 0.4s", background: open === i ? `${cs.color}0a` : "rgba(255,255,255,0.02)" }}>
              {/* Header */}
              <div onClick={() => setOpen(open === i ? null : i)} style={{ padding: "32px 36px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24 }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: cs.color, background: `${cs.color}18`, border: `1px solid ${cs.color}40`, padding: "3px 12px", borderRadius: 100 }}>{cs.tag}</span>
                  <h3 style={{ fontSize: "clamp(18px, 2.5vw, 26px)", fontWeight: 800, color: "#fff", marginTop: 16, letterSpacing: "-0.5px", lineHeight: 1.3 }}>{cs.title}</h3>
                  {/* Result pills always visible */}
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 20 }}>
                    {cs.result.map((r, j) => (
                      <div key={j} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 18px", textAlign: "center" }}>
                        <div style={{ fontSize: 20, fontWeight: 800, color: cs.color, letterSpacing: "-0.5px" }}>{r.num}</div>
                        <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2, fontWeight: 500 }}>{r.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ fontSize: 22, color: "#4b5563", transition: "transform 0.3s", transform: open === i ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0, marginTop: 8 }}>↓</div>
              </div>

              {/* Expanded content */}
              {open === i && (
                <div style={{ padding: "0 36px 36px" }}>
                  <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 32 }} />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#6b7280", textTransform: "uppercase", marginBottom: 14 }}>The Challenge</div>
                      <p style={{ color: "#9ca3af", fontSize: 14, lineHeight: 1.75 }}>{cs.challenge}</p>

                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#6b7280", textTransform: "uppercase", marginBottom: 14, marginTop: 28 }}>What I Did</div>
                      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                        {cs.action.map((a, j) => (
                          <li key={j} style={{ display: "flex", gap: 10, color: "#9ca3af", fontSize: 14, lineHeight: 1.65 }}>
                            <span style={{ color: cs.color, flexShrink: 0, marginTop: 2 }}>✓</span>
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#6b7280", textTransform: "uppercase", marginBottom: 14 }}>Outcome</div>
                      <p style={{ color: "#e5e7eb", fontSize: 15, lineHeight: 1.75, fontStyle: "italic", borderLeft: `3px solid ${cs.color}`, paddingLeft: 20 }}>{cs.outcome}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const projects = PROJECTS;
  return (
    <section id="projects" style={{ padding: "100px 0" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, color: "#6366f1", textTransform: "uppercase", marginBottom: 12 }}>Projects</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "#fff", letterSpacing: "-1px" }}>Things I've built.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
          {projects.map((p, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${p.color}50`; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(0)"; }}>
              {/* Image area */}
              <div style={{ height: 200, overflow: "hidden", borderBottom: "1px solid rgba(255,255,255,0.05)", position: "relative", background: "#111" }}>
                {p.img ? (
                  <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", transition: "transform 0.4s" }}
                    onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
                    onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                ) : (
                  <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${p.color}15, rgba(255,255,255,0.02))` }}>
                    <span style={{ fontSize: 11, color: "#4b5563" }}>No screenshot</span>
                  </div>
                )}
              </div>
              <div style={{ padding: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{p.name}</h3>
                <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7, marginBottom: 16 }}>{p.desc}</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
                  {p.tech.map(t => (
                    <span key={t} style={{ fontSize: 11, color: "#9ca3af", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", padding: "3px 10px", borderRadius: 6, fontFamily: "monospace" }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" style={{ padding: "100px 0" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, color: "#6366f1", textTransform: "uppercase", marginBottom: 12 }}>Education</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "#fff", letterSpacing: "-1px" }}>Where it started.</h2>
        </div>
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 40, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, background: "radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%)", pointerEvents: "none" }} />
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}>B.Tech, Computer Science & Engineering</h3>
              <div style={{ fontSize: 15, color: "#6366f1", fontWeight: 600, marginTop: 4 }}>NIT Allahabad National Institute of Technology</div>
            </div>
            <div style={{ fontSize: 13, color: "#6b7280", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", padding: "6px 16px", borderRadius: 100, height: "fit-content", fontWeight: 500 }}>
              2020 – 2024
            </div>
          </div>
          <p style={{ fontSize: 15, color: "#9ca3af", lineHeight: 1.75, maxWidth: 720 }}>
            Earned a place at NIT through one of the world's most competitive entrance exams, with an acceptance rate below 2% across 1M+ candidates. NITs sit among India's most prestigious engineering institutions, and the CS program built the technical foundation I now use to ship React apps, Python automations, and DNS-level deliverability fixes that most marketers can't touch.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
            {[
              { num: "Top 2%", label: "Selectivity" },
              { num: "NIT", label: "Tier-1 Institute" },
              { num: "IT & Eng", label: "Core Discipline" },
            ].map((s, j) => (
              <div key={j} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 18px" }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#6366f1", letterSpacing: "-0.5px" }}>{s.num}</div>
                <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2, fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Tools() {
  return (
    <section id="tools" style={{ padding: "100px 0", background: "rgba(255,255,255,0.02)" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, color: "#6366f1", textTransform: "uppercase", marginBottom: 12 }}>Tools & Stack</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "#fff", letterSpacing: "-1px" }}>The full stack.</h2>
          <p style={{ fontSize: 16, color: "#6b7280", marginTop: 12 }}>50+ platforms across the full marketing and deliverability workflow.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {TOOLS.map((group, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, color: "#6366f1", textTransform: "uppercase", marginBottom: 16 }}>{group.category}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {group.items.map(item => (
                  <span key={item} style={{ fontSize: 12, color: "#9ca3af", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 6, padding: "5px 12px", fontWeight: 500 }}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" style={{ padding: "100px 0" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, color: "#6366f1", textTransform: "uppercase", marginBottom: 12 }}>Contact</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "#fff", letterSpacing: "-1px", marginBottom: 20 }}>Let's work together.</h2>
            <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.75, marginBottom: 40 }}>
              Open to Customer Success, Head of Marketing, and Growth roles. Based in India, available for remote, hybrid, and on-site roles including international opportunities.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { label: "Email", val: "risheshgangwar@icloud.com", href: "mailto:risheshgangwar@icloud.com" },
                { label: "LinkedIn", val: "linkedin.com/in/rishesh", href: "https://www.linkedin.com/in/rishesh-gangwar-bb7026241/" },
                { label: "Location", val: "Noida, India", href: null },
              ].map(c => (
                <div key={c.label} style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#4b5563", textTransform: "uppercase", letterSpacing: 1, width: 70, flexShrink: 0 }}>{c.label}</div>
                  {c.href ? (
                    <a href={c.href} target="_blank" rel="noreferrer" style={{ color: "#6366f1", fontSize: 14, textDecoration: "none", fontWeight: 500 }}>{c.val}</a>
                  ) : (
                    <span style={{ color: "#9ca3af", fontSize: 14 }}>{c.val}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <form action="https://formspree.io/f/xbdnvnek" method="POST" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <input name="name" placeholder="Your Name" required style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, color: "#e5e7eb", padding: "14px 16px", fontSize: 14, outline: "none", fontFamily: "inherit", width: "100%" }} />
              <input name="email" type="email" placeholder="Your Email" required style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, color: "#e5e7eb", padding: "14px 16px", fontSize: 14, outline: "none", fontFamily: "inherit", width: "100%" }} />
            </div>
            <input name="subject" placeholder="Subject" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, color: "#e5e7eb", padding: "14px 16px", fontSize: 14, outline: "none", fontFamily: "inherit", width: "100%" }} />
            <textarea name="message" placeholder="Tell me about the role or opportunity..." rows={5} required style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, color: "#e5e7eb", padding: "14px 16px", fontSize: 14, outline: "none", fontFamily: "inherit", width: "100%", resize: "vertical" }} />
            <button type="submit" style={{ background: "#6366f1", color: "#fff", border: "none", padding: "14px 32px", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", alignSelf: "flex-start", fontFamily: "inherit" }}>
              Send Message →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ background: "#0a0a0f", color: "#e5e7eb", minHeight: "100vh", fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::placeholder { color: #374151 !important; }
        ::-webkit-scrollbar { width: 6px; } 
        ::-webkit-scrollbar-track { background: #0a0a0f; }
        ::-webkit-scrollbar-thumb { background: #1f2937; border-radius: 3px; }
      `}</style>

      <Nav scrolled={scrolled} scrollTo={scrollTo} />
      <Hero scrollTo={scrollTo} />
      <WhatIDo />
      <Education />
      <Experience />
      <CaseStudies />
      <Projects />
      <Tools />
      <Contact />

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "28px 32px", textAlign: "center" }}>
        <span style={{ color: "#374151", fontSize: 13 }}>Rishesh Gangwar · NIT Allahabad IT '24</span>
      </footer>
    </div>
  );
}
