import './App.css'

function App() {
  return (
    <main className="page">
      <header className="header">
        <a className="logo" href="#top">TULIP <span>SLU LEGAL CLINICS</span></a>
        <a className="header-link" href="mailto:help@tulip.edu">Contact us</a>
      </header>

      <section className="hero" id="top">
        <p className="eyebrow">SAINT LOUIS UNIVERSITY LEGAL CLINICS PROGRAM</p>
        <h1>Legal help starts here.</h1>
        <p className="lead"><strong>TULIP — the Trusted Unified Legal Intake Portal —</strong> connects people with the SLU Legal Clinics Program and practical resources. Tell us what you need help with, and we’ll help you find the right next step.</p>
        <a className="button" href="mailto:help@tulip.edu?subject=Legal%20clinic%20intake">Start an intake <span>→</span></a>
        <p className="note">Free and confidential. Sending a request does not create an attorney-client relationship.</p>
      </section>

      <section className="services" aria-labelledby="services-title">
        <div><p className="eyebrow">HOW WE CAN HELP</p><h2 id="services-title">Common questions we support.</h2></div>
        <ul>
          <li>Housing, benefits, and public services</li>
          <li>Family, safety, and immigration matters</li>
          <li>Workplace, debt, and consumer questions</li>
        </ul>
      </section>

      <footer><span>© 2026 Saint Louis University Legal Clinics Program</span><span>Need urgent help? Call <a href="tel:211">211</a> for local resources.</span></footer>
    </main>
  )
}

export default App
