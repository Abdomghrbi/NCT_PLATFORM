import React, { useState, useEffect } from 'react'
import WebApp from '@twa-dev/sdk'
import LanguageSelector from './components/LanguageSelector'
import MainScreen from './components/MainScreen'

function App() {
  const [language, setLanguage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    WebApp.ready()
    WebApp.expand()
    
    const initData = WebApp.initDataUnsafe
    if (initData?.user) {
      setUser(initData.user)
    }
  }, [])

  const handleLanguageSelect = (lang) => {
    setLanguage(lang)
    document.documentElement.lang = lang
    localStorage.setItem('nct-language', lang)
  }

  if (!language) {
    return <LanguageSelector onSelect={handleLanguageSelect} />
  }

  return <MainScreen language={language} user={user} />
}

export default App
