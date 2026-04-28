import React, { useState, useEffect } from 'react'
import WebApp from '@twa-dev/sdk'
import Whale from './Whale'

// ═══════════════════════════════════════════════════════
// 1. إضافة الترجمة العربية + اكتشاف تلقائي للغة
// ═══════════════════════════════════════════════════════

const translations = {
  en: {
    level: 'Lvl',
    softCoin: 'coin',
    energy: 'Energy',
    feed: 'Feed',
    wardrobe: 'Wardrobe NFT',
    play: 'Play in Depth',
    home: 'Home',
    quests: 'Quests',
    rating: 'Rating',
    wallet: 'Wallet',
    title: 'Community Whale',
    subtitle: 'NOTCOIN TOGETHER'
  },
  ru: {
    level: 'Ур',
    softCoin: 'Мягкая монета',
    energy: 'Энергия',
    feed: 'Покормить знаниями',
    wardrobe: 'Гардероб NFT',
    play: 'Играть в Глубине',
    home: 'Главная',
    quests: 'Квесты',
    rating: 'Рейтинг',
    wallet: 'Кошелек TON',
    title: 'Кит Сообщества',
    subtitle: 'NOTCOIN TOGETHER'
  },
  ar: {
    level: 'المستوى',
    softCoin: 'العملة',
    energy: 'الطاقة',
    feed: 'إطعام',
    wardrobe: 'خزانة NFT',
    play: 'اللعب في العمق',
    home: 'الرئيسية',
    quests: 'المهام',
    rating: 'التصنيف',
    wallet: 'المحفظة',
    title: 'حوت المجتمع',
    subtitle: 'نوتكوين معاً'
  }
}

// الدوال المساعدة للغة
const getBrowserLanguage = () => {
  const lang = navigator.language || navigator.userLanguage
  return lang.split('-')[0] // 'en-US' → 'en'
}

const getTelegramLanguage = () => {
  try {
    // Telegram WebApp يعطي لغة المستخدم
    return WebApp.initDataUnsafe?.user?.language_code
  } catch {
    return null
  }
}

const getDefaultLanguage = () => {
  // الأولوية: Telegram → Browser → English
  const tgLang = getTelegramLanguage()
  const browserLang = getBrowserLanguage()
  
  const supported = ['en', 'ru', 'ar']
  
  if (tgLang && supported.includes(tgLang)) return tgLang
  if (supported.includes(browserLang)) return browserLang
  return 'en'
}

const isRTL = (lang) => lang === 'ar'

// ═══════════════════════════════════════════════════════
// 2. المكون الرئيسي المحدث
// ═══════════════════════════════════════════════════════

function MainScreen({ language: propLanguage, user, supabase }) {
  
  // ✅ اكتشاف تلقائي للغة مع إمكانية التجاوز من props
  const [language, setLanguage] = useState(() => {
    // إذا جت لغة من props نستخدمها، وإلا نكتشف تلقائياً
    return propLanguage || getDefaultLanguage()
  })
  
  const t = translations[language] || translations.en
  const rtl = isRTL(language)
  
  const [coins, setCoins] = useState(0)
  const [energy, setEnergy] = useState(100)
  const [level, setLevel] = useState(1)
  const [showTap, setShowTap] = useState(false)

  // تحميل اللغة المحفوظة (اختياري)
  useEffect(() => {
    const savedLang = localStorage.getItem('nct_language')
    if (savedLang && translations[savedLang]) {
      setLanguage(savedLang)
    }
  }, [])

  // حفظ اللغة عند التغيير
  const changeLanguage = (lang) => {
    setLanguage(lang)
    localStorage.setItem('nct_language', lang)
  }

  // تحميل البيانات من Supabase
  useEffect(() => {
    if (user?.telegram_id) {
      loadUserData()
    }
  }, [user])

  // تجديد الطاقة تلقائياً كل دقيقة
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy(prev => {
        if (prev < 100) {
          const newEnergy = prev + 1
          saveEnergyToSupabase(newEnergy)
          return newEnergy
        }
        return prev
      })
    }, 60000)

    return () => clearInterval(interval)
  }, [user])

  const loadUserData = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('coins, energy, level, last_energy_update, language')
      .eq('telegram_id', user.telegram_id)
      .single()

    if (data) {
      // ✅ تحميل لغة المستخدم من قاعدة البيانات لو موجودة
      if (data.language && translations[data.language]) {
        setLanguage(data.language)
      }
      
      const now = new Date()
      const lastUpdate = new Date(data.last_energy_update || now)
      const minutesPassed = Math.floor((now - lastUpdate) / 60000)
      const energyToAdd = Math.min(minutesPassed, 100 - (data.energy || 0))
      const newEnergy = Math.min((data.energy || 0) + energyToAdd, 100)
      
      setCoins(data.coins || 0)
      setEnergy(newEnergy)
      setLevel(data.level || 1)
      
      if (energyToAdd > 0) {
        await supabase
          .from('users')
          .update({ 
            energy: newEnergy,
            last_energy_update: now.toISOString()
          })
          .eq('telegram_id', user.telegram_id)
      }
    }
  }

  const saveToSupabase = async (newCoins, newEnergy) => {
    if (!user?.telegram_id) return
    
    await supabase
      .from('users')
      .update({ 
        coins: newCoins,
        energy: newEnergy,
        last_energy_update: new Date().toISOString(),
        language: language // ✅ حفظ اللغة المختارة
      })
      .eq('telegram_id', user.telegram_id)
  }

  const saveEnergyToSupabase = async (newEnergy) => {
    if (!user?.telegram_id) return
    
    await supabase
      .from('users')
      .update({ 
        energy: newEnergy,
        last_energy_update: new Date().toISOString()
      })
      .eq('telegram_id', user.telegram_id)
  }

  const handleWhaleTap = async () => {
    if (energy <= 0) return
    
    const newCoins = coins + 1
    const newEnergy = energy - 1
    
    setCoins(newCoins)
    setEnergy(newEnergy)
    setShowTap(true)
    setTimeout(() => setShowTap(false), 500)
    
    await saveToSupabase(newCoins, newEnergy)
  }

  // ═══════════════════════════════════════════════════════
  // 3. الـ Return مع دعم RTL
  // ═══════════════════════════════════════════════════════

  return (
    <div 
      dir={rtl ? 'rtl' : 'ltr'}
      lang={language}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #4a90d9 0%, #1e3a5f 50%, #0d2137 100%)',
        padding: '10px',
        paddingBottom: '40px',
        fontFamily: rtl 
          ? '"Segoe UI", "Tahoma", "Arial", sans-serif' 
          : 'inherit'
      }}
    >
      {/* Language Switcher (اختياري - يمكن إخفاؤه) */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        marginBottom: '10px'
      }}>
        {['en', 'ru', 'ar'].map((lang) => (
          <button
            key={lang}
            onClick={() => changeLanguage(lang)}
            style={{
              padding: '4px 12px',
              borderRadius: '8px',
              border: 'none',
              background: language === lang ? '#4a90d9' : 'rgba(255,255,255,0.1)',
              color: 'white',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            {lang === 'en' ? '🇬🇧 EN' : lang === 'ru' ? '🇷🇺 RU' : '🇸🇦 AR'}
          </button>
        ))}
      </div>

      {/* Header */}
      <div style={{
        background: 'rgba(13, 33, 55, 0.9)',
        borderRadius: '16px',
        padding: '12px 16px',
        marginBottom: '15px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>
            NCT: {t.title}
          </div>
          <div style={{ fontSize: '12px', color: '#7eb8e8' }}>{t.subtitle}</div>
        </div>
        <div style={{ color: '#7eb8e8', fontSize: '20px' }}>⋮</div>
      </div>

      {/* Stats Bar */}
      <div style={{
        display: 'flex',
        background: 'rgba(13, 33, 55, 0.9)',
        borderRadius: '12px',
        padding: '12px',
        marginBottom: '15px',
        justifyContent: 'space-between',
        flexDirection: rtl ? 'row-reverse' : 'row'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#7eb8e8', marginBottom: '4px' }}>{t.level}</div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px',
            flexDirection: rtl ? 'row-reverse' : 'row'
          }}>
            <span style={{ fontSize: '18px' }}>🐋</span>
            <div style={{
              width: '40px',
              height: '6px',
              background: '#1a3a5c',
              borderRadius: '3px',
              overflow: 'hidden'
            }}>
              <div style={{ width: `${(energy/100)*100}%`, height: '100%', background: '#4a90d9' }} />
            </div>
          </div>
          <div style={{ fontSize: '14px', color: 'white', marginTop: '2px' }}>{level}</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#7eb8e8', marginBottom: '4px' }}>{t.softCoin}</div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px', 
            justifyContent: 'center',
            flexDirection: rtl ? 'row-reverse' : 'row'
          }}>
            <span style={{ fontSize: '16px' }}>🫧</span>
            <span style={{ fontSize: '16px', color: 'white', fontWeight: 'bold' }}>
              {coins.toLocaleString(language === 'ar' ? 'ar-SA' : language === 'ru' ? 'ru-RU' : 'en-US')} NCT
            </span>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#7eb8e8', marginBottom: '4px' }}>{t.energy}</div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px', 
            justifyContent: 'center',
            flexDirection: rtl ? 'row-reverse' : 'row'
          }}>
            <span style={{ fontSize: '16px' }}>🧊</span>
            <span style={{ fontSize: '16px', color: 'white', fontWeight: 'bold' }}>
              {energy}/100
            </span>
          </div>
        </div>
      </div>

      {/* Whale Character Area */}
      <div style={{
        position: 'relative',
        height: '360px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px'
      }}>
        <Whale onTap={handleWhaleTap} showTap={showTap} />
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '20px',
        flexDirection: rtl ? 'row-reverse' : 'row'
      }}>
        {[
          { icon: '🪸', text: t.feed },
          { icon: '🐋', text: t.wardrobe },
          { icon: '🐳', text: t.play }
        ].map((btn, i) => (
          <button key={i} style={{
            flex: 1,
            background: 'rgba(74, 144, 217, 0.25)',
            border: '1px solid rgba(74, 144, 217, 0.5)',
            borderRadius: '16px',
            padding: '20px 10px',
            color: 'white',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ fontSize: '28px' }}>{btn.icon}</span>
            <span style={{ textAlign: 'center' }}>{btn.text}</span>
          </button>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div style={{
        position: 'fixed',
        bottom: '0',
        left: '0',
        right: '0',
        background: 'rgba(13, 33, 55, 0.9)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '10px 5px',
        borderRadius: '16px 16px 0 0',
        marginBottom: '0',
        flexDirection: rtl ? 'row-reverse' : 'row'
      }}>
        {[
          { icon: '🤿', text: t.home, active: true },
          { icon: '🎣', text: t.quests, active: false },
          { icon: '🪩', text: t.rating, active: false },
          { icon: '🪣', text: t.wallet, active: false }
        ].map((item, i) => (
          <div key={i} style={{ 
            textAlign: 'center', 
            color: item.active ? '#4a90d9' : '#7a8a9a',
            cursor: 'pointer'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '4px' }}>{item.icon}</div>
            <div style={{ fontSize: '12px', color: item.active ? '#4a90d9' : '#7a8a9a' }}>
              {item.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MainScreen
