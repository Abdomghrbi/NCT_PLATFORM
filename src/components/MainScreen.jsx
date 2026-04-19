import React, { useState, useEffect } from 'react'
import WebApp from '@twa-dev/sdk'

const translations = {
  en: {
    level: 'Lvl',
    softCoin: 'Soft coin',
    energy: 'Energy',
    feed: 'Feed with Knowledge',
    wardrobe: 'Wardrobe NFT',
    play: 'Play in Depth',
    home: 'Home',
    quests: 'Quests',
    rating: 'Rating',
    wallet: 'TON Wallet'
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
  const [coins, setCoins] = useState(503)
  const [energy, setEnergy] = useState(100)
  const [level, setLevel] = useState(0)
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
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #4a90d9, #2e5a8c)',
          display: 'flex',
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
              <div style={{ width: '70%', height: '100%', background: '#4a90d9' }} />
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
        {/* Bubbles */}
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: `${8 + i * 4}px`,
            height: `${8 + i * 4}px`,
            border: '2px solid rgba(255,255,255,0.3)',
            borderRadius: '50%',
            background: 'transparent',
            left: `${15 + i * 12}%`,
            top: `${20 + i * 10}%`,
            animation: `float ${2 + i * 0.5}s ease-in-out infinite`
          }} />
        ))}

        {/* Floating Coins */}
        <div style={{
          position: 'absolute',
          left: '10%',
          top: '30%',
          fontSize: '24px',
          animation: 'float 3s ease-in-out infinite',
          opacity: 0.8
        }}>🪙</div>
        
        <div style={{
          position: 'absolute',
          right: '15%',
          bottom: '25%',
          fontSize: '20px',
          animation: 'float 2.5s ease-in-out infinite 0.5s',
          opacity: 0.6
        }}>🪙</div>

        {/* Main Whale - CSS Enhanced */}
        <div 
          onClick={handleWhaleTap}
          style={{
            width: '220px',
            height: '240px',
            position: 'relative',
            cursor: 'pointer',
            transform: showTap ? 'scale(0.92) translateY(10px)' : 'scale(1)',
            transition: 'all 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.4))'
          }}
        >
          {/* Body */}
          <div style={{
            position: 'absolute',
            inset: '0',
            background: 'linear-gradient(145deg, #6a8aaa 0%, #4a6a8a 50%, #3a5a7a 100%)',
            borderRadius: '50% 50% 45% 45%',
            boxShadow: 'inset 0 -20px 40px rgba(0,0,0,0.3), inset 0 20px 40px rgba(255,255,255,0.1)'
          }} />
          
          {/* Belly */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '140px',
            height: '100px',
            background: 'linear-gradient(180deg, #8aaaba 0%, #7a9aaa 100%)',
            borderRadius: '50%',
            opacity: 0.6
          }} />

          {/* Eyes Container */}
          <div style={{
            position: 'absolute',
            top: '70px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '50px'
          }}>
            {/* Left Eye */}
            <div style={{
              width: '28px',
              height: '32px',
              background: 'white',
              borderRadius: '50%',
              position: 'relative',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
            }}>
              <div style={{
                position: 'absolute',
                top: '10px',
                left: '8px',
                width: '12px',
                height: '14px',
                background: '#1a1a2e',
                borderRadius: '50%'
              }} />
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '10px',
                width: '4px',
                height: '5px',
                background: 'white',
                borderRadius: '50%'
              }} />
            </div>

            {/* Right Eye */}
            <div style={{
              width: '28px',
              height: '32px',
              background: 'white',
              borderRadius: '50%',
              position: 'relative',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
            }}>
              <div style={{
                position: 'absolute',
                top: '10px',
                left: '8px',
                width: '12px',
                height: '14px',
                background: '#1a1a2e',
                borderRadius: '50%'
              }} />
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '10px',
                width: '4px',
                height: '5px',
                background: 'white',
                borderRadius: '50%'
              }} />
            </div>
          </div>

          {/* Smile */}
          <div style={{
            position: 'absolute',
            bottom: '90px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '50px',
            height: '25px',
            borderBottom: '4px solid #2a4a5a',
            borderRadius: '0 0 50% 50%'
          }} />

          {/* Cap */}
          <div style={{
            position: 'absolute',
            top: '-15px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '110px',
            height: '45px',
            background: 'linear-gradient(180deg, #f0f0f0 0%, #d0d0d0 100%)',
            borderRadius: '55px 55px 0 0',
            boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
          }}>
            {/* Logo on Cap */}
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '26px',
              height: '26px',
              background: '#4a90d9',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              color: 'white'
            }}>✈</div>
          </div>

          {/* Jacket */}
          <div style={{
            position: 'absolute',
            bottom: '-5px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '170px',
            height: '95px',
            background: 'linear-gradient(145deg, #5a6a7a 0%, #3a4a5a 100%)',
            borderRadius: '25px 25px 45% 45%',
            boxShadow: '0 15px 35px rgba(0,0,0,0.4)'
          }}>
            {/* NCT Logo */}
            <div style={{
              position: 'absolute',
              top: '25px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '16px',
              color: '#9aaaba',
              fontWeight: 'bold',
              letterSpacing: '3px'
            }}>NCT</div>
            {/* Triangle */}
            <div style={{
              position: 'absolute',
              top: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '0',
              height: '0',
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderTop: '14px solid #c9a227'
            }} />
          </div>

          {/* Left Arm with Coin */}
          <div style={{
            position: 'absolute',
            top: '100px',
            left: '-25px',
            width: '55px',
            height: '80px',
            background: 'linear-gradient(145deg, #6a8aaa 0%, #5a7a9a 100%)',
            borderRadius: '28px',
            transform: 'rotate(-25deg)',
            transformOrigin: 'top center',
            boxShadow: '0 8px 25px rgba(0,0,0,0.3)'
          }}>
            {/* Hand */}
            <div style={{
              position: 'absolute',
              bottom: '5px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '40px',
              height: '40px',
              background: 'linear-gradient(145deg, #d4af37 0%, #b8941f 100%)',
              borderRadius: '50%',
              boxShadow: '0 5px 15px rgba(0,0,0,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              color: '#8a7218'
            }}>▲</div>
          </div>

          {/* Right Arm (Thumb up) */}
          <div style={{
            position: 'absolute',
            top: '90px',
            right: '-30px',
            width: '60px',
            height: '85px',
            background: 'linear-gradient(145deg, #6a8aaa 0%, #5a7a9a 100%)',
            borderRadius: '30px',
            transform: 'rotate(35deg)',
            transformOrigin: 'top center',
            boxShadow: '0 8px 25px rgba(0,0,0,0.3)'
          }}>
            {/* Hand Thumb */}
            <div style={{
              position: 'absolute',
              bottom: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '45px',
              height: '45px',
              background: 'linear-gradient(145deg, #6a8aaa 0%, #5a7a9a 100%)',
              borderRadius: '50%',
              border: '4px solid #8aaaca',
              boxShadow: 'inset 0 5px 15px rgba(255,255,255,0.2)'
            }} />
          </div>

          {/* Tail */}
          <div style={{
            position: 'absolute',
            bottom: '-20px',
            right: '10px',
            width: '70px',
            height: '55px',
            background: 'linear-gradient(145deg, #4a6a8a 0%, #3a5a7a 100%)',
            borderRadius: '0 50% 50% 50%',
            transform: 'rotate(-15deg)',
            zIndex: -1,
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
          }} />
        </div>

        {/* Tap Feedback */}
        {showTap && (
          <div style={{
            position: 'absolute',
            top: '15%',
            right: '15%',
            background: 'white',
            padding: '10px 18px',
            borderRadius: '25px',
            color: '#1e3a5f',
            fontWeight: 'bold',
            fontSize: '18px',
            animation: 'floatUp 0.6s ease-out',
            boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
            zIndex: 10
          }}>
            +1 $NCT 🐬
          </div>
        )}
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
        background: 'rgba(200, 238, 245, 0.95)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '10px 0',
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

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes floatUp {
          0% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-40px) scale(1.1); }
        }
      `}</style>
    </div>
  )
}

export default MainScreen
