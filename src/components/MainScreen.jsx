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

function MainScreen({ language, user }) {
  const t = translations[language]
  const [coins, setCoins] = useState(0)
  const [energy, setEnergy] = useState(100)
  const [level, setLevel] = useState(1)
  const [showTap, setShowTap] = useState(false)

  const handleWhaleTap = () => {
    setCoins(c => c + 1)
    setShowTap(true)
    setTimeout(() => setShowTap(false), 500)
    
    if (energy > 0) {
      setEnergy(e => e - 1)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #4a90d9 0%, #1e3a5f 50%, #0d2137 100%)',
      padding: '10px',
      paddingBottom: '80px'
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
              <div style={{ width: '0%', height: '100%', background: '#4a90d9' }} />
            </div>
          </div>
          <div style={{ fontSize: '14px', color: 'white', marginTop: '2px' }}>{level}</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#7eb8e8', marginBottom: '4px' }}>{t.softCoin}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
            <span style={{ fontSize: '16px' }}>🪙</span>
            <span style={{ fontSize: '16px', color: 'white', fontWeight: 'bold' }}>
              {coins.toLocaleString()} $NCT
            </span>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#7eb8e8', marginBottom: '4px' }}>{t.energy}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
            <span style={{ fontSize: '16px' }}>⚡</span>
            <span style={{ fontSize: '16px', color: 'white', fontWeight: 'bold' }}>
              {energy}/100
            </span>
          </div>
        </div>
      </div>

      {/* Whale Character Area */}
      <div style={{
        position: 'relative',
        height: '340px',
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
          <span style={{ fontSize: '28px' }}>📚</span>
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
          <span style={{ fontSize: '28px' }}>👕</span>
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
          <span style={{ fontSize: '28px' }}>🎮</span>
          <span style={{ textAlign: 'center' }}>{t.play}</span>
        </button>
      </div>

      {/* Bottom Navigation */}
      <div style={{
        position: 'fixed',
        bottom: '0',
        left: '0',
        right: '0',
        background: 'rgba(232, 238, 245, 0.95)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '12px 0',
        borderTop: '1px solid rgba(0,0,0,0.1)'
      }}>
        <div style={{ textAlign: 'center', color: '#4a90d9' }}>
          <div style={{ fontSize: '24px', marginBottom: '4px' }}>🏠</div>
          <div style={{ fontSize: '12px', color: '#4a90d9' }}>{t.home}</div>
        </div>
        <div style={{ textAlign: 'center', color: '#7a8a9a' }}>
          <div style={{ fontSize: '24px', marginBottom: '4px' }}>📋</div>
          <div style={{ fontSize: '12px', color: '#7a8a9a' }}>{t.quests}</div>
        </div>
        <div style={{ textAlign: 'center', color: '#7a8a9a' }}>
          <div style={{ fontSize: '24px', marginBottom: '4px' }}>🏆</div>
          <div style={{ fontSize: '12px', color: '#7a8a9a' }}>{t.rating}</div>
        </div>
        <div style={{ textAlign: 'center', color: '#7a8a9a' }}>
          <div style={{ fontSize: '24px', marginBottom: '4px' }}>💼</div>
          <div style={{ fontSize: '12px', color: '#7a8a9a' }}>{t.wallet}</div>
        </div>
      </div>
    </div>
  )
}

export default MainScreen
