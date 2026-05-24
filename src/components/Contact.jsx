import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import FadeIn from './FadeIn'

function Dots() {
  const [d, setD] = useState('')
  useEffect(() => {
    const interval = setInterval(() => setD((x) => (x.length >= 3 ? '' : x + '.')), 250)
    return () => clearInterval(interval)
  }, [])
  return <span style={{ display: 'inline-block', width: 24, textAlign: 'left' }}>{d}</span>
}

function fieldStyle(focus, error) {
  return {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: `1.5px solid ${error ? 'var(--mint)' : focus ? 'var(--ink)' : 'rgba(27,24,21,0.18)'}`,
    padding: '10px 0',
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 500,
    fontSize: 16,
    letterSpacing: '0.04em',
    color: 'var(--ink)',
    outline: 'none',
    resize: 'none',
    transition: 'border-color 200ms',
  }
}

function Field({ label, value, onChange, onBlur, type = 'text', textarea, placeholder, required, error }) {
  const [focus, setFocus] = useState(false)
  return (
    <label style={{ display: 'block', marginTop: 28 }}>
      <div
        className="label"
        style={{
          color: focus || value ? 'var(--mint)' : 'var(--stone)',
          transition: 'color 200ms',
          marginBottom: 8,
        }}
      >
        {label}{required && <span style={{ color: 'var(--mint)' }}>*</span>}
      </div>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={(e) => { setFocus(false); onBlur && onBlur(e) }}
          placeholder={placeholder}
          rows={4}
          style={fieldStyle(focus, !!error)}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={(e) => { setFocus(false); onBlur && onBlur(e) }}
          placeholder={placeholder}
          style={fieldStyle(focus, !!error)}
        />
      )}
      {error && (
        <div style={{ marginTop: 6, fontFamily: '"Poppins", sans-serif', fontSize: 11, letterSpacing: '0.1em', color: 'var(--mint)' }}>{error}</div>
      )}
    </label>
  )
}

export default function Contact() {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle')
  const [touched, setTouched] = useState(false)

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const submit = (e) => {
    e.preventDefault()
    setTouched(true)
    if (!valid) return
    setStatus('sending')
    setTimeout(() => {
      setStatus('sent')
      setEmail('')
      setMessage('')
    }, 900)
  }

  return (
    <section
      id="contact"
      style={{
        padding: 'clamp(80px, 12vw, 140px) clamp(16px, 5vw, 36px) clamp(64px, 10vw, 120px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
        gap: 'clamp(48px, 7vw, 80px)',
        alignItems: 'start',
      }}
    >
      {/* Left: info */}
      <FadeIn>
        <div>
          <div className="label" style={{ color: 'var(--stone)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 24, height: 1.5, background: 'var(--stone)', flexShrink: 0 }} />
            {t('contact_eyebrow')}
          </div>

          <h2
            style={{
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 800,
              letterSpacing: '0.08em',
              fontSize: 'clamp(36px, 7vw, 96px)',
              lineHeight: 1.0,
              margin: '0 0 24px',
            }}
          >
            {t('contact_heading_1')}{' '}
            <span style={{ color: 'var(--mint)', fontStyle: 'italic', fontWeight: 300 }}>
              {t('contact_heading_italic')}
            </span>
            {t('contact_heading_end')}
          </h2>

          <p style={{
            margin: '0 0 48px',
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 500,
            fontSize: 'clamp(13px, 1.5vw, 16px)',
            letterSpacing: '0.05em',
            color: 'var(--stone)',
            lineHeight: 1.65,
            maxWidth: 420,
          }}>
            {t('contact_description')}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              [t('contact_location_label'), t('contact_location_value')],
              [t('contact_direct_label'), t('contact_direct_value')],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
                <span className="label" style={{ width: 90, color: 'var(--mist)', flexShrink: 0 }}>{label}</span>
                <span style={{ fontFamily: '"Poppins", sans-serif', fontWeight: 500, fontSize: 14, letterSpacing: '0.06em', color: 'var(--ink)' }}>{value}</span>
              </div>
            ))}
            <p style={{
              marginTop: 12,
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 500,
              fontStyle: 'italic',
              fontSize: 12,
              letterSpacing: '0.06em',
              color: 'var(--mist)',
            }}>
              {t('contact_commission_note')}
            </p>
          </div>
        </div>
      </FadeIn>

      {/* Right: form */}
      <FadeIn delay={0.15}>
        <form
          onSubmit={submit}
          style={{
            background: '#fff',
            borderRadius: 'var(--r-lg)',
            padding: 'clamp(28px, 5vw, 44px)',
            boxShadow: 'var(--shadow-soft)',
            border: '1px solid rgba(27,24,21,0.07)',
          }}
        >
          <div className="label" style={{ color: 'var(--stone)' }}>
            {t('contact_form_label')}
          </div>

          <Field
            label={t('contact_email_label')}
            required
            value={email}
            onChange={setEmail}
            onBlur={() => setTouched(true)}
            type="email"
            placeholder={t('contact_email_placeholder')}
            error={touched && !valid ? t('contact_email_error') : null}
          />

          <Field
            label={t('contact_message_label')}
            value={message}
            onChange={setMessage}
            textarea
            placeholder={t('contact_message_placeholder')}
          />

          <button
            type="submit"
            disabled={status === 'sending' || status === 'sent'}
            style={{
              marginTop: 32,
              width: '100%',
              padding: '18px 24px',
              borderRadius: 999,
              border: 'none',
              background: status === 'sent' ? 'var(--mint)' : 'var(--ink)',
              color: '#fff',
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              cursor: status === 'sending' ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              transition: 'background 300ms ease, transform 200ms ease',
            }}
            onMouseEnter={(e) => {
              if (status === 'idle') e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {status === 'idle' && t('contact_btn_idle')}
            {status === 'sending' && <>{t('contact_btn_sending')}<Dots /></>}
            {status === 'sent' && t('contact_btn_sent')}
          </button>

          <div className="label" style={{ marginTop: 16, color: 'var(--mist)', textAlign: 'center' }}>
            {t('contact_reply')}
          </div>
        </form>
      </FadeIn>
    </section>
  )
}
