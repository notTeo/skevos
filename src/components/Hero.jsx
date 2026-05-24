import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import marbleBg from '../assets/marble-hero.jpg'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section
      id="top"
      style={{
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        padding: 'clamp(1.5rem, 4vw, 4rem)',
        paddingTop: 'clamp(80px, 10vw, 100px)',
      }}
    >
      {/* ── Marble card ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          borderRadius: 'var(--r-lg)',
          overflow: 'hidden',
          backgroundImage: `url(${marbleBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: 'clamp(460px, 70vh, 780px)',
        }}
      >
        {/* Gradient so text reads on marble */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.38) 55%, rgba(255,255,255,0.1) 100%)',
          pointerEvents: 'none',
        }} />

        {/* ── Split text row ── */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: 'clamp(20px, 4vw, 48px)',
          padding: 'clamp(28px, 5vw, 64px)',
        }}>

          {/* LEFT — Skevos + Atelier */}
          <div style={{ flex: '1 1 auto', minWidth: 'min(100%, 220px)' }}>
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="brand"
              style={{
                fontSize: 'clamp(48px, 12vw, 140px)',
                color: 'var(--ink)',
                lineHeight: 0.9,
                marginBottom: 'clamp(6px, 1.5vw, 16px)',
              }}
            >
              Skevos
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease: 'easeOut' }}
              style={{
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 300,
                fontStyle: 'italic',
                fontSize: 'clamp(24px, 6vw, 68px)',
                letterSpacing: '0.16em',
                color: 'var(--mint)',
                lineHeight: 1,
              }}
            >
              Atelier
            </motion.div>
          </div>

          {/* RIGHT — divider + tagline + CTAs */}
          <div style={{
            flex: '0 1 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 'clamp(14px, 2.5vw, 28px)',
          }}>
            {/* Mint rule — grows right to left */}
            <motion.div
              initial={{ scaleX: 0, originX: 1 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.28, ease: 'easeOut' }}
              style={{
                width: 'clamp(36px, 6vw, 72px)',
                height: 1.5,
                background: 'var(--mint)',
                alignSelf: 'flex-end',
              }}
            />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38 }}
              style={{
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 600,
                fontSize: 'clamp(10px, 1.2vw, 13px)',
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: 'var(--stone)',
                margin: 0,
                textAlign: 'right',
                whiteSpace: 'nowrap',
              }}
            >
              Marble · Handcrafted · Greece
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{
                display: 'flex',
                gap: 'clamp(12px, 2vw, 22px)',
                alignItems: 'center',
                flexWrap: 'wrap',
                justifyContent: 'flex-end',
              }}
            >
              <a
                href="#collection"
                style={{
                  padding: 'clamp(10px, 1.5vw, 14px) clamp(18px, 2.5vw, 28px)',
                  borderRadius: 999,
                  background: 'var(--mint)',
                  color: '#fff',
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(10px, 1.1vw, 12px)',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  transition: 'transform 200ms, background 200ms',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--mint-2)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--mint)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {t('hero_btn_collection')}
              </a>

              <a
                href="#about"
                style={{
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 600,
                  fontSize: 'clamp(10px, 1.1vw, 12px)',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--stone)',
                  borderBottom: '1.5px solid var(--stone)',
                  paddingBottom: 2,
                  transition: 'color 200ms, border-color 200ms',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--mint)'
                  e.currentTarget.style.borderColor = 'var(--mint)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--stone)'
                  e.currentTarget.style.borderColor = 'var(--stone)'
                }}
              >
                {t('hero_btn_about')}
              </a>
            </motion.div>
          </div>
        </div>

        {/* Scroll hint — bottom-right of card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          style={{
            position: 'absolute',
            bottom: 'clamp(12px, 2vw, 22px)',
            right: 'clamp(18px, 3vw, 36px)',
            zIndex: 2,
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 600,
            fontSize: 9,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: 'var(--mist)',
          }}
        >
          Scroll ↓
        </motion.div>
      </motion.div>
    </section>
  )
}
