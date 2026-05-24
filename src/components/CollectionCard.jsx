import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import MarblePiece from './MarblePiece'

export const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function CollectionCard({ p, index }) {
  const [hover, setHover] = useState(false)
  const { t } = useLanguage()

  return (
    <motion.article
      variants={itemVariants}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ display: 'flex', flexDirection: 'column', gap: 18, cursor: 'pointer' }}
    >
      <div
        style={{
          position: 'relative',
          aspectRatio: '4 / 5',
          borderRadius: 'var(--r-lg)',
          overflow: 'hidden',
          background: 'var(--cream)',
          boxShadow: hover ? 'var(--shadow-lg)' : 'var(--shadow-md)',
          transform: hover ? 'translateY(-6px) scale(1.012)' : 'translateY(0) scale(1)',
          transition: 'transform 700ms cubic-bezier(.2,.7,.2,1), box-shadow 600ms ease',
        }}
      >
        {/* Variant A */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: hover ? 0 : 1,
            transform: hover ? 'scale(1.04)' : 'scale(1)',
            transition: 'opacity 700ms ease, transform 1200ms cubic-bezier(.2,.7,.2,1)',
          }}
        >
          <MarblePiece {...p.a} shape={p.shape} />
        </div>

        {/* Variant B */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: hover ? 1 : 0,
            transform: hover ? 'scale(1)' : 'scale(1.06)',
            transition: 'opacity 700ms ease, transform 1200ms cubic-bezier(.2,.7,.2,1)',
          }}
        >
          <MarblePiece {...p.b} shape={p.shape} />
        </div>

        {/* Index chip */}
        <div
          style={{
            position: 'absolute',
            top: 18,
            left: 18,
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 600,
            fontSize: 9,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            padding: '8px 12px',
            borderRadius: 999,
            background: 'rgba(242,235,224,0.88)',
            backdropFilter: 'blur(8px)',
            color: 'var(--ink-2)',
          }}
        >
          № {String(index + 1).padStart(2, '0')} · {p.type}
        </div>

        {/* Material tag (on hover) */}
        <div
          style={{
            position: 'absolute',
            bottom: 18,
            right: 18,
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 600,
            fontSize: 10,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            padding: '10px 14px',
            borderRadius: 999,
            background: 'rgba(27,24,21,0.82)',
            color: 'var(--bone)',
            backdropFilter: 'blur(8px)',
            opacity: hover ? 1 : 0,
            transform: hover ? 'translateY(0)' : 'translateY(8px)',
            transition: 'all 500ms cubic-bezier(.2,.7,.2,1)',
          }}
        >
          {p.material}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: 16,
        }}
      >
        <div style={{ minWidth: 0, flex: 1 }}>
          <h3
            style={{
              margin: 0,
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(20px, 2.5vw, 28px)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              lineHeight: 1,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {p.name}
          </h3>
          <div style={{
            marginTop: 6,
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: '0.14em',
            color: 'var(--stone)',
          }}>
            {p.dims}
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(16px, 2vw, 20px)',
            letterSpacing: '0.08em',
            whiteSpace: 'nowrap',
          }}>
            {p.price}
          </div>
          <div className="label" style={{ color: 'var(--stone)', marginTop: 2 }}>
            {t('card_from')}
          </div>
        </div>
      </div>
    </motion.article>
  )
}
