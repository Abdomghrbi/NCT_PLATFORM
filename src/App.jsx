import React, { useState, useEffect } from 'react'
import WebApp from '@twa-dev/sdk'
import { createClient } from '@supabase/supabase-js'
import MainScreen from './components/MainScreen'

const SUPABASE_URL = 'https://cbeakjxerompqieklvag.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiZWFranhlcm9tcHFpZWtsdmFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxMzA1NTAsImV4cCI6MjA5MjcwNjU1MH0.xfa6HMg2cAjRm1fZmEbcD9lhPm1WOoua6P1pbntkxPA'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

function App() {
  const [language, setLanguage] = useState('en')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    WebApp.ready()
    WebApp.expand()

    const initData = WebApp.initDataUnsafe
    
    if (initData?.user) {
      handleTelegramLogin(initData.user)
    } else {
      setError('open_in_telegram')
      setLoading(false)
    }
  }, [])

  const handleTelegramLogin = async (tgUser) => {
    try {
      const userLanguage = tgUser.language_code === 'ru' ? 'ru' : 'en'
      setLanguage(userLanguage)
      document.documentElement.lang = userLanguage

      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('telegram_id', tgUser.id)
        .single()

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError
      }

      if (existingUser) {
        await supabase
          .from('users')
          .update({ last_login: new Date() })
          .eq('telegram_id', tgUser.id)
        
        setUser(existingUser)
      } else {
        const { data: newUser, error: insertError } = await supabase
          .from('users')
          .insert({
            telegram_id: tgUser.id,
            username: tgUser.username,
            first_name: tgUser.first_name,
            last_name: tgUser.last_name,
            photo_url: tgUser.photo_url,
            language: userLanguage,
            coins: 0,
            energy: 100,
            level: 1
          })
          .select()
          .single()

        if (insertError) throw insertError
        setUser(newUser)
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('database_error')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #1e3a5f 0%, #0d2137 100%)',
        color: 'white',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    )
  }

  if (error === 'open_in_telegram') {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #1e3a5f 0%, #0d2137 100%)',
        color: 'white',
        padding: '20px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>📱</div>
        <h2 style={{ marginBottom: '10px' }}>Open in Telegram</h2>
        <p style={{ color: '#7eb8e8', maxWidth: '280px' }}>
          This app must be opened through Telegram to work properly.
        </p>
      </div>
    )
  }

  if (error === 'database_error') {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #1e3a5f 0%, #0d2137 100%)',
        color: 'white',
        padding: '20px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>⚠️</div>
        <h2 style={{ marginBottom: '10px' }}>Connection Error</h2>
        <p style={{ color: '#7eb8e8' }}>
          Unable to connect to database. Please try again.
        </p>
      </div>
    )
  }

  return <MainScreen language={language} user={user} supabase={supabase} />
}

export default App
