import { useTranslation } from 'react-i18next'

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const currentLang = i18n.language?.startsWith('en') ? 'en' : 'es'

  const handleChange = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  const handleKeyDown = (e: React.KeyboardEvent, lang: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleChange(lang)
    }
  }

  return (
    <div
      role="switch"
      aria-label="Change language"
      aria-checked={currentLang === 'en'}
      style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 50,
        display: 'flex',
        gap: '0.25rem',
        background: 'var(--bg-elevated, rgba(20, 17, 13, 0.9))',
        border: '1px solid var(--gold-dim, #3a3225)',
        borderRadius: '2px',
        padding: '0.25rem 0.5rem',
      }}
    >
      <button
        type="button"
        onClick={() => handleChange('es')}
        onKeyDown={(e) => handleKeyDown(e, 'es')}
        aria-pressed={currentLang === 'es'}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.7rem',
          letterSpacing: '0.1em',
          padding: '0.15rem 0.35rem',
          color: currentLang === 'es' ? 'var(--gold, #EFC12B)' : 'var(--body-50, #8a8078)',
          fontWeight: currentLang === 'es' ? 600 : 400,
          transition: 'color 0.2s ease',
        }}
      >
        ES
      </button>
      <span
        style={{
          color: 'var(--body-30, #5a524a)',
          fontSize: '0.6rem',
          lineHeight: '1.4',
        }}
      >
        /
      </span>
      <button
        type="button"
        onClick={() => handleChange('en')}
        onKeyDown={(e) => handleKeyDown(e, 'en')}
        aria-pressed={currentLang === 'en'}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.7rem',
          letterSpacing: '0.1em',
          padding: '0.15rem 0.35rem',
          color: currentLang === 'en' ? 'var(--gold, #EFC12B)' : 'var(--body-50, #8a8078)',
          fontWeight: currentLang === 'en' ? 600 : 400,
          transition: 'color 0.2s ease',
        }}
      >
        EN
      </button>
    </div>
  )
}
