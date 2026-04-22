import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

function Whale({ onTap, showTap }) {
  const whaleRef = useRef(null)
  const leftArmRef = useRef(null)
  const rightArmRef = useRef(null)
  const coinRef = useRef(null)

  useEffect(() => {
    // Idle animation - gentle floating
    gsap.to(whaleRef.current, {
      y: -8,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })

    // Arm swaying
    gsap.to(leftArmRef.current, {
      rotation: -30,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })

    gsap.to(rightArmRef.current, {
      rotation: 40,
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.3
    })
  }, [])

  useEffect(() => {
    if (showTap) {
      // Squash and stretch on tap
      gsap.to(whaleRef.current, {
        scaleX: 1.08,
        scaleY: 0.92,
        duration: 0.08,
        yoyo: true,
        repeat: 1,
        ease: "power2.out"
      })

      // Coin pop animation
      gsap.fromTo(coinRef.current,
        { scale: 0, opacity: 1, y: 0 },
        { scale: 1.2, opacity: 0, y: -60, duration: 0.6, ease: "back.out(1.7)" }
      )
    }
  }, [showTap])

  const handleClick = () => {
    onTap()
  }

  return (
    <div 
      ref={whaleRef}
      onClick={handleClick}
      style={{
        width: '220px',
        height: '240px',
        position: 'relative',
        cursor: 'pointer',
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
      <div 
        ref={leftArmRef}
        style={{
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
        }}
      >
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
      <div 
        ref={rightArmRef}
        style={{
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
        }}
      >
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

      {/* Floating Coin Effect */}
      <div
        ref={coinRef}
        style={{
          position: 'absolute',
          top: '-30px',
          right: '20px',
          fontSize: '30px',
          opacity: 0,
          pointerEvents: 'none'
        }}
      >
        🪙
      </div>
    </div>
  )
}

export default Whale
