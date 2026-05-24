import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  )
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler, { passive: true })
    return () => window.removeEventListener('resize', handler)
  }, [])
  return isMobile
}

function BurgerIcon() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 24, cursor: 'pointer' }}>
      <span style={{ display: 'block', height: 2, background: 'var(--ink)', borderRadius: 2 }} />
      <span style={{ display: 'block', height: 2, background: 'var(--ink)', borderRadius: 2 }} />
    </div>
  )
}

function LangToggle({ lang, setLang }) {
  return (
    <div style={{
      display: 'flex',
      background: 'rgba(27,24,21,0.06)',
      borderRadius: 999,
      padding: 3,
      gap: 2,
      width: 'fit-content',
    }}>
      {['en', 'gr'].map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          style={{
            padding: '5px 12px',
            borderRadius: 999,
            border: 'none',
            background: lang === l ? 'var(--mint)' : 'transparent',
            color: lang === l ? '#fff' : 'var(--stone)',
            fontFamily: '"Poppins", sans-serif',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 200ms ease',
          }}
        >
          {l}
        </button>
      ))}
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isMobile = useIsMobile()
  const { lang, setLang, t } = useLanguage()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [sidebarOpen])

  const close = () => setSidebarOpen(false)

  const navLinks = [
    { key: 'nav_collection', href: '#collection' },
    { key: 'nav_about', href: '#about' },
    { key: 'nav_contact', href: '#contact' },
  ]

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: scrolled ? '12px clamp(20px, 6vw, 36px)' : '22px clamp(20px, 6vw, 36px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 50,
        transition: 'all 350ms cubic-bezier(.2,.7,.2,1)',
        backdropFilter: scrolled ? 'blur(14px) saturate(1.2)' : 'none',
        background: scrolled ? 'rgba(255,255,255,0.88)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(27,24,21,0.07)' : '1px solid transparent',
      }}>
        {/* Logo */}
        <a
          href="#top"
          className="brand"
          style={{ fontSize: 'clamp(16px, 3vw, 22px)', color: 'var(--ink)' }}
        >
          SKEVOS
          <span style={{
            display: 'inline-block',
            width: 5,
            height: 5,
            borderRadius: 5,
            background: 'var(--mint)',
            marginLeft: 7,
            transform: 'translateY(-3px)',
          }} />
        </a>

        {/* Desktop nav */}
        {!isMobile && (
          <>
            <div style={{
              display: 'flex',
              gap: 32,
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'var(--stone)',
            }}>
              {navLinks.map(({ key, href }) => (
                <a
                  key={key}
                  href={href}
                  style={{ transition: 'color 200ms' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--ink)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--stone)'}
                >
                  {t(key)}
                </a>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <LangToggle lang={lang} setLang={setLang} />
              <a
                href="#contact"
                style={{
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 700,
                  fontSize: 10,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  padding: '10px 18px',
                  borderRadius: 999,
                  border: '1.5px solid var(--mint)',
                  color: 'var(--mint)',
                  transition: 'all 200ms',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--mint)'
                  e.currentTarget.style.color = '#fff'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'var(--mint)'
                }}
              >
                {t('nav_cta')}
              </a>
            </div>
          </>
        )}

        {/* Mobile burger */}
        {isMobile && (
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            style={{ background: 'none', border: 'none', padding: '8px 4px', cursor: 'pointer' }}
          >
            <BurgerIcon />
          </button>
        )}
      </nav>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={close}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(27,24,21,0.35)',
                zIndex: 60,
                backdropFilter: 'blur(2px)',
              }}
            />
            <motion.div
              key="sidebar"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: 'min(300px, 85vw)',
                background: '#fff',
                zIndex: 70,
                display: 'flex',
                flexDirection: 'column',
                padding: '32px 28px',
                boxShadow: '-6px 0 40px rgba(27,24,21,0.12)',
              }}
            >
              <button
                onClick={close}
                aria-label="Close menu"
                style={{
                  alignSelf: 'flex-end',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 18,
                  color: 'var(--stone)',
                  padding: '4px 8px',
                  lineHeight: 1,
                  marginBottom: 40,
                }}
              >
                ✕
              </button>

              <nav style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {navLinks.map(({ key, href }, i) => (
                  <motion.a
                    key={key}
                    href={href}
                    onClick={close}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.28 }}
                    style={{
                      fontFamily: '"Poppins", sans-serif',
                      fontWeight: 800,
                      fontSize: 28,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--ink)',
                      padding: '16px 0',
                      borderBottom: '1px solid rgba(27,24,21,0.07)',
                      display: 'block',
                    }}
                  >
                    {t(key)}
                  </motion.a>
                ))}
              </nav>

              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 32 }}>
                <LangToggle lang={lang} setLang={setLang} />
                <a
                  href="#contact"
                  onClick={close}
                  style={{
                    textAlign: 'center',
                    padding: '16px',
                    borderRadius: 999,
                    background: 'var(--mint)',
                    color: '#fff',
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                  }}
                >
                  {t('nav_cta')}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
