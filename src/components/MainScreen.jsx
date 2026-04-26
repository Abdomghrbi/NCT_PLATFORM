import React, { useState, useEffect } from 'react'
import WebApp from '@twa-dev/sdk'
import Whale from './Whale'

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
    wallet: 'Wallet'
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
    wallet: 'Кошелек TON'
  }
}

function MainScreen({ language, user, supabase }) {
  const t = translations[language]
  const [coins, setCoins] = useState(0)
  const [energy, setEnergy] = useState(100)
  const [level, setLevel] = useState(1)
  const [showTap, setShowTap] = useState(false)

  // تحميل البيانات من Supabase أول ما يفتح
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
    }, 60000) // كل دقيقة

    return () => clearInterval(interval)
  }, [user])

  const loadUserData = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('coins, energy, level, last_energy_update')
      .eq('telegram_id', user.telegram_id)
      .single()

    if (data) {
      const now = new Date()
      const lastUpdate = new Date(data.last_energy_update || now)
      const minutesPassed = Math.floor((now - lastUpdate) / 60000)
      const energyToAdd = Math.min(minutesPassed, 100 - (data.energy || 0))
      const newEnergy = Math.min((data.energy || 0) + energyToAdd, 100)
      
      setCoins(data.coins || 0)
      setEnergy(newEnergy)
      setLevel(data.level || 1)
      
      // تحديث Supabase بالطاقة الجديدة والوقت
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
        last_energy_update: new Date().toISOString()
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
    
    // حفظ بـ Supabase
    await saveToSupabase(newCoins, newEnergy)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #4a90d9 0%, #1e3a5f 50%, #0d2137 100%)',
      padding: '10px',
      paddingBottom: '40px'
    }}>
      {/* Header */}
      <div style={{
        background: 'rgba(13, 33, 55, 0.9)',
        borderRadius: '16px',
        padding: '12px 16px',
        marginBottom: '15px',
        display: 'none',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #4a90d9, #2e5a8c)',
          display: 'none',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px'
        }}>
          🐋
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>
            NCT: {language === 'en' ? 'Community Whale' : 'Кит Сообщества'}
          </div>
          <div style={{ fontSize: '12px', color: '#7eb8e8' }}>NOTCOIN TOGETHER</div>
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
        justifyContent: 'space-between'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#7eb8e8', marginBottom: '4px' }}>{t.level}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
            <span style={{ fontSize: '16px' }}>🫧</span>
            <span style={{ fontSize: '16px', color: 'white', fontWeight: 'bold' }}>
              {coins.toLocaleString()} NCT
            </span>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#7eb8e8', marginBottom: '4px' }}>{t.energy}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
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
        marginBottom: '20px'
      }}>
        <button style={{
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
          <span style={{ fontSize: '28px' }}>🪸</span>
          <span style={{ textAlign: 'center' }}>{t.feed}</span>
        </button>

        <button style={{
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
          <span style={{ fontSize: '28px' }}>🐋</span>
          <span style={{ textAlign: 'center' }}>{t.wardrobe}</span>
        </button>

        <button style={{
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
          <span style={{ fontSize: '28px' }}>🐳</span>
          <span style={{ textAlign: 'center' }}>{t.play}</span>
        </button>
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
        borderRadius: '16px',
        marginBottom: '10px',
    }}>
        <div style={{ textAlign: 'center', color: '#4a90d9' }}>
          <div style={{ fontSize: '24px', marginBottom: '4px' }}>🤿</div>
          <div style={{ fontSize: '12px', color: '#4a90d9' }}>{t.home}</div>
        </div>
        <div style={{ textAlign: 'center', color: '#7a8a9a' }}>
          <div style={{ fontSize: '24px', marginBottom: '4px' }}>🎣</div>
          <div style={{ fontSize: '12px', color: '#7a8a9a' }}>{t.quests}</div>
        </div>
        <div style={{ textAlign: 'center', color: '#7a8a9a' }}>
          <div style={{ fontSize: '24px', marginBottom: '4px' }}>🪩</div>
          <div style={{ fontSize: '12px', color: '#7a8a9a' }}>{t.rating}</div>
        </div>
        <div style={{ textAlign: 'center', color: '#7a8a9a' }}>
          <div style={{ fontSize: '24px', marginBottom: '4px' }}>🪣</div>
          <div style={{ fontSize: '12px', color: '#7a8a9a' }}>{t.wallet}</div>
        </div>
      </div>
    </div>
  )
}

export default MainScreen
