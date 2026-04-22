import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

function Whale({ onTap, showTap }) {
  const whaleRef = useRef(null)
  const leftArmRef = useRef(null)
  const rightArmRef = useRef(null)
  const coinRef = useRef(null)
  const bubbleRefs = useRef([])

  useEffect(() => {
    // Idle floating animation
    gsap.to(whaleRef.current, {
      y: -10,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })

    // Arms swaying
    gsap.to(leftArmRef.current, {
      rotation: -5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      transformOrigin: "80% 20%"
    })

    gsap.to(rightArmRef.current, {
      rotation: 5,
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      transformOrigin: "20% 20%"
    })

    // Bubbles floating up
    bubbleRefs.current.forEach((bubble, i) => {
      gsap.to(bubble, {
        y: -30,
        x: Math.sin(i) * 10,
        opacity: 0,
        duration: 2 + i * 0.5,
        repeat: -1,
        delay: i * 0.8,
        ease: "power1.out"
      })
    })
  }, [])

  useEffect(() => {
    if (showTap) {
      // Squash and stretch
      gsap.to(whaleRef.current, {
        scaleX: 1.05,
        scaleY: 0.95,
        duration: 0.08,
        yoyo: true,
        repeat: 3,
        ease: "power2.out"
      })

      // Coin pop
      gsap.fromTo(coinRef.current,
        { scale: 0.5, opacity: 1, y: 0 },
        { scale: 1.5, opacity: 0, y: -80, duration: 0.8, ease: "back.out(1.7)" }
      )
    }
  }, [showTap])

  const handleClick = () => {
    onTap()
  }

  return (
    <div 
      onClick={handleClick}
      style={{
        width: '280px',
        height: '300px',
        position: 'relative',
        cursor: 'pointer',
        WebkitTapHighlightColor: 'transparent',
        userSelect: 'none',
        outline: 'none',
        touchAction: 'manipulation'
      }}
    >
      {/* Bubbles */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          ref={el => bubbleRefs.current[i] = el}
          style={{
            position: 'absolute',
            width: `${6 + i * 3}px`,
            height: `${6 + i * 3}px`,
            border: '1.5px solid rgba(255,255,255,0.4)',
            borderRadius: '50%',
            left: `${10 + i * 18}%`,
            bottom: `${10 + i * 15}%`,
            zIndex: 1
          }}
        />
      ))}

      {/* Floating Coins Background */}
      <div style={{
        position: 'absolute',
        left: '5%',
        top: '20%',
        fontSize: '20px',
        opacity: 0.6,
        animation: 'float 3s ease-in-out infinite'
      }}>🪙</div>

      <div style={{
        position: 'absolute',
        right: '8%',
        bottom: '30%',
        fontSize: '18px',
        opacity: 0.5,
        animation: 'float 2.5s ease-in-out infinite 0.5s'
      }}>🪙</div>

      {/* Main Whale SVG */}
      <svg
        ref={whaleRef}
        viewBox="0 0 200 220"
        style={{
          width: '100%',
          height: '100%',
          filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))'
        }}
      >
        {/* Tail */}
        <path
          d="M 160 180 Q 190 170 195 150 Q 200 130 180 140 Q 170 145 165 160"
          fill="#3a5a7a"
          stroke="#2a4a6a"
          strokeWidth="1"
        />

        {/* Body Main */}
        <ellipse
          cx="100"
          cy="120"
          rx="85"
          ry="95"
          fill="url(#bodyGradient)"
        />
        
        <defs>
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6a8aaa" />
            <stop offset="50%" stopColor="#4a6a8a" />
            <stop offset="100%" stopColor="#3a5a7a" />
          </linearGradient>
          
          <linearGradient id="bellyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8aaaba" />
            <stop offset="100%" stopColor="#6a8aaa" />
          </linearGradient>
          
          <linearGradient id="capGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f5f5f5" />
            <stop offset="100%" stopColor="#d0d0d0" />
          </linearGradient>
          
          <linearGradient id="jacketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5a6a7a" />
            <stop offset="100%" stopColor="#3a4a5a" />
          </linearGradient>
          
          <linearGradient id="coinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd700" />
            <stop offset="100%" stopColor="#daa520" />
          </linearGradient>
        </defs>

        {/* Belly */}
        <ellipse
          cx="100"
          cy="145"
          rx="65"
          ry="55"
          fill="url(#bellyGradient)"
          opacity="0.7"
        />

        {/* Jacket */}
        <path
          d="M 35 160 Q 35 200 100 210 Q 165 200 165 160 Q 165 140 100 140 Q 35 140 35 160"
          fill="url(#jacketGradient)"
        />
        
        {/* Jacket Details */}
        <rect x="85" y="145" width="30" height="8" rx="4" fill="#4a5a6a" />
        <polygon points="100,155 95,165 105,165" fill="#c9a227" />

        {/* NCT Text */}
        <text
          x="100"
          y="185"
          textAnchor="middle"
          fill="#8a9aaa"
          fontSize="14"
          fontWeight="bold"
          letterSpacing="2"
          fontFamily="Arial, sans-serif"
        >
          NCT
        </text>

        {/* Left Arm */}
        <g ref={leftArmRef}>
          <ellipse
            cx="25"
            cy="110"
            rx="22"
            ry="35"
            fill="url(#bodyGradient)"
            transform="rotate(-20 25 110)"
          />
          {/* Hand */}
          <circle cx="15" cy="140" r="18" fill="url(#bodyGradient)" />
          {/* Coin in hand */}
          <circle cx="15" cy="140" r="14" fill="url(#coinGradient)" />
          <text x="15" y="145" textAnchor="middle" fill="#8a7218" fontSize="12">▲</text>
        </g>

        {/* Right Arm (Thumb up) */}
        <g ref={rightArmRef}>
          <ellipse
            cx="175"
            cy="100"
            rx="22"
            ry="35"
            fill="url(#bodyGradient)"
            transform="rotate(20 175 100)"
          />
          {/* Hand */}
          <circle cx="185" cy="130" r="18" fill="url(#bodyGradient)" />
          {/* Thumb */}
          <ellipse cx="190" cy="115" rx="8" ry="12" fill="#5a7a9a" transform="rotate(-10 190 115)" />
        </g>

        {/* Face Area */}
        <ellipse
          cx="100"
          cy="85"
          rx="70"
          ry="60"
          fill="url(#bodyGradient)"
        />

        {/* Eyes */}
        <g>
          {/* Left Eye */}
          <circle cx="65" cy="75" r="16" fill="white" />
          <circle cx="68" cy="75" r="8" fill="#1a1a2e" />
          <circle cx="70" cy="72" r="3" fill="white" />
          
          {/* Right Eye */}
          <circle cx="135" cy="75" r="16" fill="white" />
          <circle cx="132" cy="75" r="8" fill="#1a1a2e" />
          <circle cx="130" cy="72" r="3" fill="white" />
        </g>

        {/* Smile */}
        <path
          d="M 70 100 Q 100 120 130 100"
          fill="none"
          stroke="#2a4a5a"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Blush */}
        <ellipse cx="55" cy="95" rx="10" ry="6" fill="#ff6b6b" opacity="0.3" />
        <ellipse cx="145" cy="95" rx="10" ry="6" fill="#ff6b6b" opacity="0.3" />

        {/* Cap */}
        <path
          d="M 45 35 Q 100 15 155 35 L 155 50 Q 100 40 45 50 Z"
          fill="url(#capGradient)"
        />
        <ellipse cx="100" cy="35" rx="55" ry="12" fill="#e0e0e0" />
        
        {/* Cap Logo */}
        <circle cx="100" cy="30" r="12" fill="#4a90d9" />
        <text x="100" y="34" textAnchor="middle" fill="white" fontSize="10">✈</text>
      </svg>

      {/* Floating Coin Effect */}
      <div
        ref={coinRef}
        style={{
          position: 'absolute',
          top: '20%',
          right: '25%',
          fontSize: '32px',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 10
        }}
      >
        🪙
      </div>

      {/* Tap Feedback */}
      {showTap && (
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          background: 'white',
          padding: '8px 16px',
          borderRadius: '20px',
          color: '#1e3a5f',
          fontWeight: 'bold',
          fontSize: '16px',
          animation: 'floatUp 0.6s ease-out',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          zIndex: 10
        }}>
          +1
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes floatUp {
          0% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-50px) scale(1.2); }
        }
      `}</style>
    </div>
  )
}

export default Whale
