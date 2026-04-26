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
      duration: 2.5,
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
        width: '360px',
        height: '340px',
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
      }}>🐟</div>

      <div style={{
        position: 'absolute',
        right: '10%',
        bottom: '35%',
        fontSize: '18px',
        opacity: 0.4,
        animation: 'float 2.s ease-in-out infinite 0.5s'
      }}>🐠</div>

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

        

        {/* جسم الحوت */}
        <path d="M 223.281 197.229 C 219.032 205.471 210.572 216.761 180.019 216.385 C 170.731 226.11 161.515 232.566 158.237 234.526 C 116.953 252.461 82.911 225.914 61.412 193.465 C 45.608 165.973 43.895 143.989 42.278 118.64 C 41.774 105.141 46.172 65.315 60.54 50.798 C 75 38 88 32 99.783 32.555 C 125.236 30.922 155 45 163.878 70.004 C 171.053 92.934 171.841 110.491 163.058 149.57 C 157.372 172.152 158.09 172.046 147.633 198.871 C 140.632 218.61 170.464 213.22 167.847 206.629 C 159.183 194.488 164.176 174.411 179.301 170.678 C 174.526 188.824 188.918 178.702 187.471 195.151 C 196.821 186.724 202.942 189.527 209.392 189.409 C 216.08 195.941 232.335 171.603 223.525 196.709 Z"
        
          fill="url(#bodyGradient)"
        />

        {/* اللون الرمادي بطن الحوت */}
        <path
          d="M 108.176 231.372 C 119.657 235.594 143.306 238.606 155.76 232.54 C 128.055 238.892 122.375 204.611 127.893 165.857 C 131.287 144.849 134.014 132.351 126.027 127.705 C 122.123 125.102 114.163 123.727 99.583 122.842 C 76.762 122.683 69.379 123.064 62.144 129.306 C 51.476 142.065 64.55 172.131 71.089 189.298 C 79.172 205.527 82.143 219.286 107.373 230.561"
           fill="url(#bellyGradient)"
          opacity="0.7"
        />

    

        {/* اليدين */}
        <g ref={leftArmRef}>
          <path
            d="M 47.695 108.12 Q 20 120 14.966 141.535 Q 10 160 25 165 Q 36.682 159.54 41.556 145.332 Q 45 130 47.808 108.051"
            fill="#4a6a8a"
            stroke="#3a5a7a"
            strokeWidth="1"
          />
        </g>

        <g ref={rightArmRef}>
          <path
            d="M 155.765 104.998 Q 180 120 186.533 140.693 Q 190 160 175 165 Q 165.235 164.453 158.986 147 Q 152.578 116.802 155.735 104.998"
            fill="#4a6a8a"
            stroke="#3a5a7a"
            strokeWidth="1"
          />
        </g>

        {/* Face */}
        <g>
          {/* بياض العين */}
          <ellipse cx="75" cy="75" rx="14" ry="12" fill="#FFFFFF" />
          <ellipse cx="125" cy="75" rx="14" ry="12" fill="#FFFFFF" />

          {/* البؤبؤ */}
          <circle cx="75" cy="75" r="7" fill="#1a1a2e" />
          <circle cx="125" cy="75" r="7" fill="#1a1a2e" />

          {/* لمعة العينين */}
          <circle cx="77" cy="72" r="2.5" fill="#FFFFFF" />
          <circle cx="127" cy="72" r="2.5" fill="#FFFFFF" />

          {/* الخدود */}
          <ellipse cx="60" cy="92" rx="10" ry="6" fill="#ff9999" opacity="0.4" />
          <ellipse cx="140" cy="92" rx="10" ry="6" fill="#ff9999" opacity="0.4" />

          {/* خط الابتسامة */}
          <path
            d="M 85 95 Q 100 108, 115 95"
            fill="none"
            stroke="#2a3a4a"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* الفم السفلي */}
          <path
            d="M 95 102 Q 100 105, 105 102"
            fill="none"
            stroke="#2a3a4a"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>

        {/* القبعة */}
        <g>
        
          <path d="M 71.013 44.394 C 69.607 44.177 48 9.447 143.702 43.877 Q 58.654 51.176 89.392 17.819 Q 132.812 -2.462 145.122 45.605"
            
            fill="url(#capGradient)"
            stroke="#d0d0d0"
            strokeWidth="1"
          />

          

          {/* رمز المرساة */}
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
            NCT
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
