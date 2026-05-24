export default function Footer() {
  return (
    <footer
      style={{
        background: '#fff',
        borderTop: '1px solid rgba(27,24,21,0.08)',
        paddingTop: 56,
        paddingBottom: 0,
        marginBottom: 0,
      }}
    >
      {/* Details row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 clamp(20px, 6vw, 48px) 40px',
          flexWrap: 'wrap',
          gap: 12,
          fontFamily: '"Poppins", sans-serif',
          fontWeight: 600,
          fontSize: 10,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'rgba(111,102,92,0.65)',
          borderBottom: '1px solid rgba(27,24,21,0.07)',
        }}
      >
        <span>© 2026 Skevos · Greece</span>
        <span style={{ color: 'var(--mint)', letterSpacing: '0.14em', textTransform: 'none' }}>
          skevosart@gmail.com
        </span>
        <span>Elegant Marble Utensils</span>
      </div>

      {/* Full-width SKEVOS wordmark — snapped flush to bottom */}
      <div
        aria-hidden="true"
        style={{
          lineHeight: 0.78,
          overflow: 'hidden',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 85%)',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 85%)',
        }}
      >
        <div
          className="brand"
          style={{
            fontSize: '24vw',
            letterSpacing: '-0.01em',
            color: 'rgba(27,24,21,0.18)',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            userSelect: 'none',
            width: '100%',
            display: 'block',
          }}
        >
          SKEVOS
        </div>
      </div>
    </footer>
  )
}
