import tulipLogo from "../../assets/TULIPlogo.svg";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Clinics", href: "/#clinics" },
  { label: "Contact", href: "/#contact" },
  { label: "Resources", href: "/#resources" },
];

function AccountIcon() {
  return (
    <svg className="icon-account" viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="21" />
      <circle cx="24" cy="19" r="7" />
      <path d="M11 41a13 13 0 0 1 26 0" />
    </svg>
  );
}

export default function Header() {
  return (
    <header className="header">
      <a className="logo" href="/">
        <img className="mark" src={tulipLogo} alt="TULIP logo" />

        <strong className="logo-word">TULIP</strong>

        <span>SLU LEGAL CLINICS</span>
      </a>

      <nav className="nav" aria-label="Main navigation">
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a className="header-link" href={link.href}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <a className="header-link" href="mailto:help@tulip.edu">
        Contact us
      </a>

      <a className="account" href="#account" aria-label="Account">
        <AccountIcon />
      </a>
    </header>
  );
}
