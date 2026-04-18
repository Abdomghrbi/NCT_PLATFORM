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
  const [coins, setCoins] = useState(50300)
  const [energy, setEnergy] = useState(95)
  const [level, setLevel] = useState(10)
  const [showTap, setShowTap] = useState(false)

  const handleWhaleTap = () => {
    setCoins(c => c + 5)
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
        height: '320px',
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

        {/* Main Whale */}
        <div 
          onClick={handleWhaleTap}
          style={{
            width: '200px',
            height: '200px',
            background: 'linear-gradient(135deg, #5a7a9a 0%, #3a5a7a 50%, #2a4a6a 100%)',
            borderRadius: '50% 50% 45% 45%',
            position: 'relative',
            cursor: 'pointer',
            transform: showTap ? 'scale(0.95)' : 'scale(1)',
            transition: 'transform 0.1s',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4), inset 0 -10px 30px rgba(0,0,0,0.2)'
          }}
        >
          {/* Cap */}
          <div style={{
            position: 'absolute',
            top: '-15px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100px',
            height: '40px',
            background: '#e8e8e8',
            borderRadius: '50px 50px 0 0',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
          }}>
            <div style={{
              position: 'absolute',
              top: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '24px',
              height: '24px',
              background: '#4a90d9',
              borderRadius: '50%'
            }} />
          </div>

          {/* Eyes */}
          <div style={{
            position: 'absolute',
            top: '50px',
            left: '45px',
            width: '28px',
            height: '35px',
            background: 'white',
            borderRadius: '50%',
            boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '8px',
              width: '12px',
              height: '14px',
              background: '#1a1a2e',
              borderRadius: '50%'
            }} />
          </div>

          <div style={{
            position: 'absolute',
            top: '50px',
            right: '45px',
            width: '28px',
            height: '35px',
            background: 'white',
            borderRadius: '50%',
            boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '8px',
              width: '12px',
              height: '14px',
              background: '#1a1a2e',
              borderRadius: '50%'
            }} />
          </div>

          {/* Smile */}
          <div style={{
            position: 'absolute',
            bottom: '70px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60px',
            height: '30px',
            borderBottom: '4px solid #2a4a6a',
            borderRadius: '0 0 50% 50%'
          }} />

          {/* Jacket */}
          <div style={{
            position: 'absolute',
            bottom: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '160px',
            height: '90px',
            background: 'linear-gradient(135deg, #4a5a6a, #3a4a5a)',
            borderRadius: '20px 20px 45% 45%',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '14px',
              color: '#8a9aaa',
              fontWeight: 'bold',
              letterSpacing: '2px'
            }}>NCT</div>
            <div style={{
              position: 'absolute',
              top: '5px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '0',
              height: '0',
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '12px solid #c9a227'
            }} />
          </div>

          {/* Arms */}
          <div style={{
            position: 'absolute',
            top: '90px',
            left: '-20px',
            width: '50px',
            height: '70px',
            background: 'linear-gradient(135deg, #5a7a9a, #4a6a8a)',
            borderRadius: '25px',
            transform: 'rotate(-20deg)',
            boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
          }}>
            <div style={{
              position: 'absolute',
              bottom: '5px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '35px',
              height: '35px',
              background: 'linear-gradient(135deg, #d4af37, #b8941f)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              boxShadow: '0 3px 10px rgba(0,0,0,0.3)'
            }}>▲</div>
          </div>

          <div style={{
            position: 'absolute',
            top: '80px',
            right: '-25px',
            width: '55px',
            height: '75px',
            background: 'linear-gradient(135deg, #5a7a9a, #4a6a8a)',
            borderRadius: '25px',
            transform: 'rotate(30deg)',
            boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
          }}>
            <div style={{
              position: 'absolute',
              bottom: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #5a7a9a, #4a6a8a)',
              borderRadius: '50%',
              border: '3px solid #6a8aaa'
            }} />
          </div>

          {/* Tail */}
          <div style={{
            position: 'absolute',
            bottom: '-30px',
            right: '20px',
            width: '80px',
            height: '60px',
            background: 'linear-gradient(135deg, #4a6a8a, #3a5a7a)',
            borderRadius: '0 50% 50% 50%',
            transform: 'rotate(-10deg)',
            zIndex: -1
          }} />
        </div>

        {/* Tap Feedback */}
        {showTap && (
          <div style={{
            position: 'absolute',
            top: '20%',
            right: '20%',
            background: 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            color: '#1e3a5f',
            fontWeight: 'bold',
            fontSize: '16px',
            animation: 'floatUp 0.5s ease-out',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}>
            +5 $NCT ❤️
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

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes floatUp {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-30px); }
        }
      `}</style>
    </div>
  )
}

export default MainScreen
