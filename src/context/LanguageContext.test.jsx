import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LanguageProvider, useLanguage } from './LanguageContext'

function TestConsumer() {
  const { lang, setLang, t } = useLanguage()
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <span data-testid="key">{t('nav_collection')}</span>
      <button onClick={() => setLang(lang === 'en' ? 'gr' : 'en')}>toggle</button>
    </div>
  )
}

describe('LanguageContext', () => {
  it('defaults to English', () => {
    render(<LanguageProvider><TestConsumer /></LanguageProvider>)
    expect(screen.getByTestId('lang').textContent).toBe('en')
    expect(screen.getByTestId('key').textContent).toBe('Collection')
  })

  it('switches to Greek on toggle', () => {
    render(<LanguageProvider><TestConsumer /></LanguageProvider>)
    fireEvent.click(screen.getByText('toggle'))
    expect(screen.getByTestId('lang').textContent).toBe('gr')
    expect(screen.getByTestId('key').textContent).toBe('Συλλογή')
  })

  it('toggles back to English', () => {
    render(<LanguageProvider><TestConsumer /></LanguageProvider>)
    fireEvent.click(screen.getByText('toggle'))
    fireEvent.click(screen.getByText('toggle'))
    expect(screen.getByTestId('lang').textContent).toBe('en')
    expect(screen.getByTestId('key').textContent).toBe('Collection')
  })
})
