import React from 'react'

const translations = {
  en: {
    title: 'Select Language',
    english: 'English',
    russian: 'Русский'
  },
  ru: {
    title: 'Выберите язык',
    english: 'English',
    russian: 'Русский'
  }
}

function LanguageSelector({ onSelect }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      background: 'linear-gradient(180deg, #1e3a5f 0%, #0d2137 100%)'
    }}>
      
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        width: '100%',
        maxWidth: '280px'
      }}>
        <button
          onClick={() => onSelect('en')}
          style={{
            padding: '18px 30px',
            fontSize: '18px',
            borderRadius: '12px',
            border: '2px solid #4a90d9',
            background: 'rgba(74, 144, 217, 0.2)',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          🇬🇧 English
        </button>
        
        <button
          onClick={() => onSelect('ru')}
          style={{
            padding: '18px 30px',
            fontSize: '18px',
            borderRadius: '12px',
            border: '2px solid #4a90d9',
            background: 'rgba(74, 144, 217, 0.2)',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          🇷🇺 Русский
        </button>
      </div>
    </div>
  )
}

export default LanguageSelector
