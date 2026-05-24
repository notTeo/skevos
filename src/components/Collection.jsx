import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import CollectionCard from './CollectionCard'
import FadeIn from './FadeIn'

const PRODUCTS = [
  {
    id: 'selene', name: 'Selene', type: 'Console Table', dims: '180 × 38 × 86 cm', price: '€ 6 400', material: 'Statuario', shape: 'console',
    a: { veinColor: '#7a6e58', baseColor: '#f3ead7', highlight: '#fbf5e8', bg: '#3d4438', bgAccent: '#23281f', rotate: 0, seed: 3 },
    b: { veinColor: '#5b4a35', baseColor: '#e9dcc1', highlight: '#f6ecd2', bg: '#4a4538', bgAccent: '#2a261c', rotate: 0, seed: 11 },
  },
  {
    id: 'delos', name: 'Delos', type: 'Coffee Table', dims: 'Ø 110 × 34 cm', price: '€ 4 200', material: 'Travertino Rosso', shape: 'coffee',
    a: { veinColor: '#8d4a2c', baseColor: '#e9c9a8', highlight: '#f8e0c2', bg: '#2e2a26', bgAccent: '#15130f', rotate: 0, seed: 7 },
    b: { veinColor: '#6a2f18', baseColor: '#dbac84', highlight: '#efc89e', bg: '#3a3128', bgAccent: '#1d1813', rotate: 0, seed: 17 },
  },
  {
    id: 'atlas', name: 'Atlas', type: 'Plinth', dims: '60 × 60 × 110 cm', price: '€ 3 100', material: 'Nero Marquina', shape: 'plinth',
    a: { veinColor: '#dcd3c2', baseColor: '#2b2722', highlight: '#a89a82', bg: '#e8dec8', bgAccent: '#c4b08f', rotate: 0, seed: 5 },
    b: { veinColor: '#f4ead4', baseColor: '#1e1b18', highlight: '#b8a98f', bg: '#dccfb2', bgAccent: '#b09872', rotate: 0, seed: 23 },
  },
  {
    id: 'echo', name: 'Echo', type: 'Side Table', dims: 'Ø 48 × 52 cm', price: '€ 2 250', material: 'Verde Alpi', shape: 'side',
    a: { veinColor: '#0f1f17', baseColor: '#7fae93', highlight: '#c0ddc7', bg: '#e8dec8', bgAccent: '#c4b08f', rotate: 0, seed: 9 },
    b: { veinColor: '#08160f', baseColor: '#5e8770', highlight: '#a3c4af', bg: '#dccfb2', bgAccent: '#a89674', rotate: 0, seed: 29 },
  },
  {
    id: 'iris', name: 'Iris', type: 'Pedestal', dims: 'Ø 28 × 92 cm', price: '€ 1 950', material: 'Rosa Portogallo', shape: 'pillar',
    a: { veinColor: '#9b6b6b', baseColor: '#f2dada', highlight: '#fbe9e9', bg: '#3d3231', bgAccent: '#1f1817', rotate: 0, seed: 13 },
    b: { veinColor: '#6f3f3f', baseColor: '#e1bdbd', highlight: '#f4d2d2', bg: '#4a3a39', bgAccent: '#241b1b', rotate: 0, seed: 31 },
  },
  {
    id: 'helios', name: 'Helios', type: 'Dining Table', dims: '240 × 110 × 74 cm', price: '€ 11 800', material: 'Calacatta Oro', shape: 'dining',
    a: { veinColor: '#a8804a', baseColor: '#f5ecd6', highlight: '#fcf5e2', bg: '#3a3c33', bgAccent: '#1c1d18', rotate: 0, seed: 19 },
    b: { veinColor: '#6e5226', baseColor: '#ece0c3', highlight: '#f8edcf', bg: '#46453a', bgAccent: '#22221b', rotate: 0, seed: 41 },
  },
  {
    id: 'kore', name: 'Kore', type: 'Bench', dims: '160 × 38 × 44 cm', price: '€ 5 600', material: 'Bianco Sivec', shape: 'bench',
    a: { veinColor: '#9a8e7a', baseColor: '#f6f1e6', highlight: '#fdfaf2', bg: '#2d2a26', bgAccent: '#15130f', rotate: 0, seed: 21 },
    b: { veinColor: '#6e6452', baseColor: '#ebe1c9', highlight: '#f6ecd5', bg: '#3a3528', bgAccent: '#1d1a13', rotate: 0, seed: 43 },
  },
  {
    id: 'luna', name: 'Luna', type: 'Sculptural Stool', dims: 'Ø 36 × 46 cm', price: '€ 2 700', material: 'Onice Miele', shape: 'orb',
    a: { veinColor: '#a06a2e', baseColor: '#f0d6a8', highlight: '#fae4be', bg: '#3a3328', bgAccent: '#1c1810', rotate: 0, seed: 27 },
    b: { veinColor: '#6e4519', baseColor: '#dcbc88', highlight: '#eecb9a', bg: '#46392a', bgAccent: '#221c13', rotate: 0, seed: 47 },
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

export default function Collection() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="collection"
      style={{ padding: 'clamp(80px, 12vw, 120px) clamp(16px, 5vw, 36px) clamp(64px, 10vw, 100px)' }}
    >
      <FadeIn>
        <header style={{ marginBottom: 'clamp(40px, 7vw, 64px)' }}>
          {/* Eyebrow */}
          <div
            className="label"
            style={{
              color: 'var(--stone)',
              marginBottom: 18,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <span style={{ width: 24, height: 1.5, background: 'var(--stone)', flexShrink: 0 }} />
            {t('collection_eyebrow')}
          </div>

          {/* Heading + description stacked on mobile, side-by-side on desktop */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}>
            <h2
              style={{
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 800,
                letterSpacing: '0.08em',
                fontSize: 'clamp(36px, 7vw, 92px)',
                lineHeight: 1.0,
                margin: 0,
              }}
            >
              {t('collection_heading_1')}{' '}
              <span style={{ color: 'var(--mint)', fontFamily: '"Cookie", cursive' }}>
                {t('collection_heading_italic')}
              </span>
              {t('collection_heading_end')}
            </h2>

            <p style={{
              margin: 0,
              maxWidth: 400,
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 500,
              fontSize: 'clamp(13px, 1.5vw, 15px)',
              letterSpacing: '0.06em',
              color: 'var(--stone)',
              lineHeight: 1.65,
            }}>
              {t('collection_description')}
            </p>
          </div>
        </header>
      </FadeIn>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
          gap: 'clamp(36px, 6vw, 64px) clamp(16px, 3vw, 36px)',
        }}
      >
        {PRODUCTS.map((p, i) => (
          <CollectionCard key={p.id} p={p} index={i} />
        ))}
      </motion.div>
    </section>
  )
}
