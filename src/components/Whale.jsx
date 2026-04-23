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

        {/* Tail - Connected to body, curved and natural */}
        <path
          d="M 165 170 
             C 185 185, 195 155, 200 140
             C 205 125, 200 115, 190 120
             C 180 125, 175 135, 170 145
             C 168 155, 166 165, 165 170"
          fill="#3a5a7a"
          stroke="#2a4a6a"
          strokeWidth="1"
        />

        {/* Tail lower fluke */}
        <path
          d="M 165 185
             C 185 195, 199 195, 200 205
             C 208 212, 205 220, 195 218
             C 185 216, 175 208, 168 200
             C 166 195, 265 190, 165 185"
          fill="#3a5a7a"
          stroke="#2a4a6a"
          strokeWidth="1"
        />

        {/* Body - Natural whale shape, connected to tail */}
        <path
          d="M 100 30
             C 130 30, 155 45, 165 70
             C 172 90, 172 110, 168 130
             C 165 150, 160 170, 155 185
             C 148 200, 135 210, 115 215
             C 95 220, 75 218, 60 210
             C 45 200, 35 185, 32 165
             C 28 145, 28 125, 32 105
             C 36 85, 45 65, 60 50
             C 75 38, 88 32, 100 40"
          fill="url(#bodyGradient)"
        />

        {/* Belly - Lighter area on bottom */}
        <path
          d="M 60 210
             C 75 218, 95 220, 115 215
             C 135 210, 148 200, 155 185
             C 150 175, 140 168, 125 165
             C 110 162, 95 162, 80 165
             C 65 168, 55 175, 50 185
             C 52 195, 55 205, 60 210"
          fill="url(#bellyGradient)"
          opacity="0.7"
        />

        {/* Belly vertical lines (ribs) */}
        <g opacity="0.3" stroke="#4a6a8a" strokeWidth="1.5" fill="none">
          <path d="M 75 175 Q 75 195 78 210" />
          <path d="M 88 172 Q 88 192 90 212" />
          <path d="M 100 170 Q 100 190 100 213" />
          <path d="M 112 172 Q 112 192 110 212" />
          <path d="M 125 175 Q 125 195 122 210" />
        </g>

        {/* Jacket - Covers lower body */}
        <path
          d="M 45 165
             Q 45 185 60 195
             Q 80 205 100 205
             Q 120 205 140 195
             Q 155 185 155 165
             Q 155 150 140 145
             Q 120 140 100 140
             Q 80 140 60 145
             Q 45 150 45 165"
          fill="url(#jacketGradient)"
        />

        {/* Jacket collar */}
        <path
          d="M 60 145 Q 80 155 100 155 Q 120 155 140 145"
          fill="none"
          stroke="#2a3a4a"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Jacket buttons */}
        <circle cx="100" cy="160" r="3" fill="#ffd700" />
        <circle cx="100" cy="172" r="3" fill="#ffd700" />
        <circle cx="100" cy="184" r="3" fill="#ffd700" />

        {/* NCT Logo on Jacket */}
        <text
          x="100"
          y="190"
          textAnchor="middle"
          fill="#ffd700"
          fontSize="12"
          fontWeight="bold"
          fontFamily="Arial, sans-serif"
        >
          NCT
        </text>

        {/* Arms/Flippers */}
        <g ref={leftArmRef}>
          <path
            d="M 45 110
               Q 20 120, 15 140
               Q 10 160, 25 165
               Q 35 160, 40 145
               Q 45 130, 45 110"
            fill="#4a6a8a"
            stroke="#3a5a7a"
            strokeWidth="1"
          />
        </g>

        <g ref={rightArmRef}>
          <path
            d="M 155 110
               Q 180 120, 185 140
               Q 190 160, 175 165
               Q 165 160, 160 145
               Q 155 130, 155 110"
            fill="#4a6a8a"
            stroke="#3a5a7a"
            strokeWidth="1"
          />
        </g>

        {/* Face */}
        <g>
          {/* Eyes - White sclera */}
          <ellipse cx="75" cy="75" rx="14" ry="16" fill="#FFFFFF" />
          <ellipse cx="125" cy="75" rx="14" ry="16" fill="#FFFFFF" />

          {/* Pupils */}
          <circle cx="75" cy="75" r="7" fill="#1a1a2e" />
          <circle cx="125" cy="75" r="7" fill="#1a1a2e" />

          {/* Eye highlights */}
          <circle cx="77" cy="72" r="2.5" fill="#FFFFFF" />
          <circle cx="127" cy="72" r="2.5" fill="#FFFFFF" />

          {/* Cheeks - Pink blush */}
          <ellipse cx="60" cy="92" rx="10" ry="6" fill="#ff9999" opacity="0.4" />
          <ellipse cx="140" cy="92" rx="10" ry="6" fill="#ff9999" opacity="0.4" />

          {/* Smile */}
          <path
            d="M 85 95 Q 100 108, 115 95"
            fill="none"
            stroke="#2a3a4a"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Small mouth line */}
          <path
            d="M 95 102 Q 100 105, 105 102"
            fill="none"
            stroke="#2a3a4a"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>

        {/* Captain Hat */}
        <g>
          {/* Hat brim */}
          <ellipse cx="100" cy="42" rx="55" ry="10" fill="#f5f5f5" stroke="#d0d0d0" strokeWidth="1" />

          {/* Hat top */}
          <path
            d="M 55 42
               Q 55 15, 100 12
               Q 145 15, 145 42"
            fill="url(#capGradient)"
            stroke="#d0d0d0"
            strokeWidth="1"
          />

          {/* Hat band */}
          <path
            d="M 58 38 Q 100 42, 142 38"
            fill="none"
            stroke="#4a90e2"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Anchor badge */}
          <circle cx="100" cy="25" r="8" fill="#4a90e2" />
          <text
            x="100"
            y="28"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="10"
            fontWeight="bold"
          >
            ⚓
          </text>
        </g>

        {/* Coin that pops up on tap */}
        <g ref={coinRef} style={{ opacity: 0 }}>
          <circle cx="100" cy="50" r="14" fill="url(#coinGradient)" stroke="#daa520" strokeWidth="1" />
          <text
            x="100"
            y="54"
            textAnchor="middle"
            fill="#8B4513"
            fontSize="10"
            fontWeight="bold"
          >
            $
          </text>
        </g>
      </svg>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  )
}

export default Whale
