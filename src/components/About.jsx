import MarblePiece from './MarblePiece'
import FadeIn from './FadeIn'

export default function About() {
  return (
    <FadeIn>
      <section
        id="about"
        style={{
          margin: '0 clamp(12px, 4vw, 28px)',
          borderRadius: 'var(--r-lg)',
          overflow: 'hidden',
          position: 'relative',
          minHeight: 'clamp(280px, 45vw, 520px)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {/* Full-bleed marble */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <MarblePiece
            shape="orb"
            seed={88}
            veinColor="#c8b48a"
            baseColor="#2a2520"
            highlight="#8c7858"
            bg="#d9c8a8"
            bgAccent="#a88e60"
          />
        </div>

        {/* Dark gradient */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '65%',
          background: 'linear-gradient(to top, rgba(27,24,21,0.94) 0%, transparent 100%)',
        }} />

        {/* Content */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: 'clamp(20px, 5vw, 48px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(8px, 1.5vw, 14px)',
        }}>
          <p style={{
            margin: 0,
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 600,
            fontSize: 'clamp(10px, 1.2vw, 12px)',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(242,235,224,0.5)',
          }}>
            The Atelier
          </p>

          <h2 style={{
            margin: 0,
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(22px, 5vw, 52px)',
            letterSpacing: '0.06em',
            color: 'var(--bone)',
            lineHeight: 1.1,
          }}>
            Every piece tells<br />a story.
          </h2>
        </div>
      </section>
    </FadeIn>
  )
}
