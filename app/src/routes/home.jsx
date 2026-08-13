import React from 'react'

// Homepage skeleton — uses an eventual Header component (placeholder used here)
export default function Home() {
  return (
    <div style={{fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif', color: '#0f172a'}}>
      {/* Header placeholder - replace with <Header /> when available */}
      <div
        data-placeholder="Header"
        style={{padding: '20px 24px', borderBottom: '1px solid #e6eef8', background: '#fff'}}
      >
        <div style={{maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{fontWeight: 700}}>TULIP</div>
          <nav style={{display: 'flex', gap: 16, opacity: 0.8}}>
            <div>Home</div>
            <div>About</div>
            <div>Contact</div>
          </nav>
        </div>
      </div>

      <main style={{maxWidth: 1100, margin: '48px auto', padding: '0 24px'}}>
        <section style={{display: 'grid', gap: 24}}>
          <header style={{display: 'grid', gap: 8}}>
            <h1 style={{margin: 0, fontSize: 36, lineHeight: 1.1}}>Welcome to TULIP</h1>
            <p style={{margin: 0, color: '#475569'}}>A simple starting point for the application homepage.</p>
          </header>

          <section style={{display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24}}>
            <div style={{background: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 1px 2px rgba(16,24,40,0.04)'}}>
              <h2 style={{marginTop: 0, fontSize: 18}}>Main content</h2>
              <p style={{color: '#475569'}}>Place primary homepage content here — overview, recent posts, or dashboard links.</p>
            </div>

            <aside style={{background: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 1px 2px rgba(16,24,40,0.04)'}}>
              <h3 style={{marginTop: 0, fontSize: 16}}>Quick links</h3>
              <ul style={{paddingLeft: 18, margin: '8px 0'}}>
                <li>Get started</li>
                <li>Documentation</li>
                <li>Support</li>
              </ul>
            </aside>
          </section>

          <section style={{display: 'grid', gap: 12}}>
            <h3 style={{margin: 0}}>Features</h3>
            <div style={{display: 'flex', gap: 12}}>
              <div style={{flex: 1, background: '#fff', padding: 16, borderRadius: 8}}>Feature one</div>
              <div style={{flex: 1, background: '#fff', padding: 16, borderRadius: 8}}>Feature two</div>
              <div style={{flex: 1, background: '#fff', padding: 16, borderRadius: 8}}>Feature three</div>
            </div>
          </section>
        </section>
      </main>

      <footer style={{borderTop: '1px solid #e6eef8', padding: '20px 24px', marginTop: 48, background: '#fff'}}>
        <div style={{maxWidth: 1100, margin: '0 auto', color: '#64748b'}}>© {new Date().getFullYear()} TULIP</div>
      </footer>
    </div>
  )
}
