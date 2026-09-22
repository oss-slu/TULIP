import "../App.css";
import Header from "../components/header/header";
import tulipLogo from "../assets/TULIPlogo.svg";
import locationIcon from "../assets/locationicon.png";
import phoneIcon from "../assets/phoneicon.png";
import emailIcon from "../assets/emailicon.png";


const sluLawImg = "https://www.slu.edu/law/-img/centers-of-excellence.jpg";

const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Clinics", href: "#clinics" },
  { label: "Contact", href: "#contact" },
  { label: "Resources", href: "#resources" },
];

const CLINICS = [
  {
    name: "Insert Name here",
    location: "Insert here",
    phone: "Insert here",
    phoneHref: "Insert here",
    email: "Insert here",
  },
  {
    name: "Insert Name here",
    location: "Insert here",
    phone: "Insert here",
    phoneHref: "Insert here",
    email: "Insert here",
  },
  {
    name: "Insert Name here",
    location: "Insert here",
    phone: "Insert here",
    phoneHref: "Insert here",
    email: "Insert here",
  },
];

const ACRONYM = [
  ["T", "rusted"],
  ["U", "nified"],
  ["L", "egal"],
  ["I", "ntake"],
  ["P", "ortal"],
];

function Icon({ src, alt = "" }) {
  return <img className="icon" src={src} alt={alt} />;
}

export default function Home() {
  return (
    <>
      <Header />

      <main className="page">
        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="eyebrow">
              SAINT LOUIS UNIVERSITY LEGAL CLINICS PROGRAM
            </p>

            <h1>Legal help starts here.</h1>

            <p className="lead">
              <strong>TULIP — the Trusted Unified Legal Intake Portal —</strong>{" "}
              connects people with the SLU Legal Clinics Program and practical
              resources. Tell us what you need help with, and we’ll help you
              find the right next step.
            </p>

            <a className="button" href="/intake">
              Start an intake <span>→</span>
            </a>

            <p className="note">
              Free and confidential. Sending a request does not create an
              attorney-client relationship.
            </p>
          </div>

          <div className="law-media">
            <img src={sluLawImg} alt="Saint Louis University School of Law" />
          </div>
        </section>

        <section
          className="services"
          id="about"
          aria-labelledby="services-title"
        >
          <div>
            <p className="eyebrow">HOW WE CAN HELP</p>
            <h2 id="services-title">Common questions we support.</h2>
          </div>

          <ul>
            <li>Housing, benefits, and public services</li>
            <li>Family, safety, and immigration matters</li>
            <li>Workplace, debt, and consumer questions</li>
          </ul>
        </section>

        <section
          className="clinics"
          id="clinics"
          aria-labelledby="clinics-title"
        >
          <h2 id="clinics-title">Our Clinics</h2>

          <ul className="clinic-grid">
            {CLINICS.map((clinic, index) => (
              <li className="clinic-card" key={index}>
                <h3>{clinic.name}</h3>

                <p className="clinic-row">
                  <Icon src={locationIcon} />
                  <span>{clinic.location}</span>
                </p>

                <p className="clinic-row">
                  <Icon src={phoneIcon} />
                  <a href={clinic.phoneHref}>{clinic.phone}</a>
                </p>

                <p className="clinic-row">
                  <Icon src={emailIcon} />
                  <a href={`mailto:${clinic.email}`}>{clinic.email}</a>
                </p>
              </li>
            ))}
          </ul>
        </section>

        <footer className="footer" id="contact">
          <div className="footer-brand">
            <img className="mark mark-lg" src={tulipLogo} alt="" />

            <div>
              <p className="logo-word">TULIP</p>
              <p className="footer-tagline">Digital Law Clinic Portal</p>
            </div>
          </div>

          <nav className="footer-col" aria-label="Quick links">
            <h2>Quick Links</h2>

            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col">
            <h2>Contact Us</h2>

            <p className="clinic-row">
              <Icon src={emailIcon} />
              <a href="mailto:help@tulip.edu">help@tulip.edu</a>
            </p>
          </div>

          <dl className="acronym">
            {ACRONYM.map(([letter, rest]) => (
              <div key={letter}>
                <dt>{letter}</dt>
                <dd>{rest}</dd>
              </div>
            ))}
          </dl>

          <p className="footer-legal">
            © 2026 Saint Louis University Legal Clinics Program
          </p>
        </footer>
      </main>
    </>
  );
}
