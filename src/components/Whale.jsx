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
      y: -8,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })

    // Arms swaying
    gsap.to(leftArmRef.current, {
      rotation: -8,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      transformOrigin: "80% 20%"
    })

    gsap.to(rightArmRef.current, {
      rotation: 8,
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      transformOrigin: "20% 20%"
    })

    // Bubbles floating up
    bubbleRefs.current.forEach((bubble, i) => {
      gsap.to(bubble, {
        y: -40,
        x: Math.sin(i) * 15,
        opacity: 0,
        duration: 2.5 + i * 0.5,
        repeat: -1,
        delay: i * 0.6,
        ease: "power1.out"
      })
    })
  }, [])

  useEffect(() => {
    if (showTap) {
      // Squash and stretch
      gsap.to(whaleRef.current, {
        scaleX: 1.03,
        scaleY: 0.97,
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
        width: '260px',
        height: '320px',
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
            left: `${8 + i * 20}%`,
            bottom: `${5 + i * 18}%`,
            zIndex: 1
          }}
        />
      ))}

      {/* Floating Coins Background */}
      <div style={{
        position: 'absolute',
        left: '5%',
        top: '25%',
        fontSize: '22px',
        opacity: 0.5,
        animation: 'float 3s ease-in-out infinite'
      }}>🪙</div>

      <div style={{
        position: 'absolute',
        right: '10%',
        bottom: '35%',
        fontSize: '18px',
        opacity: 0.4,
        animation: 'float 2.5s ease-in-out infinite 0.5s'
      }}>🪙</div>

      {/* Main Whale SVG */}
      <svg
        ref={whaleRef}
        viewBox="0 0 200 240"
        style={{
          width: '100%',
          height: '100%',
          filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))'
        }}
      >
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

        {/* Tail - Large and curved */}
        <path
          d="M 160 200 Q 210 180 220 150 Q 230 120 215 130 Q 200 140 190 160 Q 180 180 175 195"
          fill="#3a5a7a"
          stroke="#2a4a6a"
          strokeWidth="1.5"
        />

        {/* Body - Oval shape, taller than wide */}
        <ellipse
          cx="100"
          cy="125"
          rx="75"
          ry="95"
          fill="url(#bodyGradient)"
        />

        {/* Belly with vertical lines (ribs) */}
        <ellipse
          cx="100"
          cy="155"
          rx="60"
          ry="50"
          fill="url(#bellyGradient)"
          opacity="0.7"
        />
        
        {/* Belly vertical lines */}
        <g opacity="0.3" stroke="#4a6a8a" strokeWidth="2" fill="none">
          <path d="M 85 140 Q 85 170 85 195" />
          <path d="M 93 138 Q 93 168 93 198" />
          <path d="M 100 137 Q 100 167 100 200" />
          <path d="M 107 138 Q 107 168 107 198" />
          <path d="M 115 140 Q 115 170 115 195" />
        </g>

        {/* Jacket - Covers lower body */}
        <path
          d="M 35 165 Q 35 200 100 215 Q 165 200 165 165 Q 165 145 100 145 Q 35 145 35 165"
          fill="url(#jacketGradient)"
        />
        
        {/* Jacket Details */}
        <rect x="88" y="150" width="20" height="6" rx="3" fill="#4a5a6a" />
        <polygon points="100,158 95,168 105,168" fill="#c9a227" stroke="#8a7218" strokeWidth="1" />

        {/* NCT Text */}
        <text
          x="100"
          y="188"
          textAnchor="middle"
          fill="#8a9aaa"
          fontSize="13"
          fontWeight="bold"
          letterSpacing="2"
          fontFamily="Arial, sans-serif"
        >
          NCT
        </text>

        {/* Left Arm */}
        <g ref={leftArmRef}>
          <ellipse
            cx="28"
            cy="115"
            rx="20"
            ry="32"
            fill="url(#bodyGradient)"
            transform="rotate(-25 28 115)"
          />
          {/* Hand */}
          <circle cx="18" cy="142" r="16" fill="url(#bodyGradient)" />
        </g>

        {/* Right Arm - Thumb up */}
        <g ref={rightArmRef}>
          <ellipse
            cx="172"
            cy="105"
            rx="20"
            ry="32"
            fill="url(#bodyGradient)"
            transform="rotate(25 172 105)"
          />
          {/* Hand */}
          <circle cx="182" cy="132" r="16" fill="url(#bodyGradient)" />
          {/* Thumb up */}
          <ellipse cx="188" cy="115" rx="7" ry="14" fill="#5a7a9a" transform="rotate(-15 188 115)" />
          {/* Fingers */}
          <ellipse cx="192" cy="130" rx="5" ry="9" fill="#4a6a8a" transform="rotate(5 192 130)" />
          <ellipse cx="188" cy="135" rx="5" ry="8" fill="#4a6a8a" transform="rotate(10 188 135)" />
        </g>

        {/* Face Area - Upper body */}
        <ellipse
          cx="100"
          cy="80"
          rx="65"
          ry="55"
          fill="url(#bodyGradient)"
        />

        {/* Eyes - Smaller and higher */}
        <g>
          {/* Left Eye */}
          <circle cx="72" cy="65" r="13" fill="white" />
          <circle cx="75" cy="65" r="6.5" fill="#1a1a2e" />
          <circle cx="77" cy="62" r="2.5" fill="white" />
          
          {/* Right Eye */}
          <circle cx="128" cy="65" r="13" fill="white" />
          <circle cx="125" cy="65" r="6.5" fill="#1a1a2e" />
          <circle cx="123" cy="62" r="2.5" fill="white" />
        </g>

        {/* Smile - Curved up */}
        <path
          d="M 75 90 Q 100 108 125 90"
          fill="none"
          stroke="#2a4a5a"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Blush - Cute effect */}
        <ellipse cx="58" cy="82" rx="9" ry="5" fill="#ff6b6b" opacity="0.25" />
        <ellipse cx="142" cy="82" rx="9" ry="5" fill="#ff6b6b" opacity="0.25" />

        {/* Cap - Realistic shape with brim */}
        <path
          d="M 45 22 Q 100 5 155 22 L 155 38 Q 100 28 45 38 Z"
          fill="url(#capGradient)"
        />
        {/* Cap brim */}
        <path
          d="M 38 35 Q 100 20 162 35 Q 168 38 162 42 Q 100 32 38 42 Q 32 38 38 35"
          fill="#e0e0e0"
        />
        <ellipse cx="100" cy="22" rx="55" ry="10" fill="#f0f0f0" />
        
        {/* Cap Logo */}
        <circle cx="100" cy="20" r="10" fill="#4a90d9" />
        <text x="100" y="24" textAnchor="middle" fill="white" fontSize="8">✈</text>
      </svg>

      {/* Floating Coin Effect */}
      <div
        ref={coinRef}
        style={{
          position: 'absolute',
          top: '15%',
          right: '20%',
          fontSize: '30px',
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
          top: '8%',
          right: '8%',
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
