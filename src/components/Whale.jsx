import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

function Whale({ onTap, showTap }) {
  const whaleRef = useRef(null)
  const leftArmRef = useRef(null)
  const rightArmRef = useRef(null)
  const coinRef = useRef(null)
  const bubbleRefs = useRef([])
  const containerRef = useRef(null)

  // تهيئة الحركات الأساسية
  useEffect(() => {
    // حركة الطفو الهادئة
    gsap.to(whaleRef.current, {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })

    // حركة الذراع اليسرى
    gsap.to(leftArmRef.current, {
      rotation: -10,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      transformOrigin: "75% 15%"
    })

    // حركة الذراع اليمنى (الإبهام للأعلى)
    gsap.to(rightArmRef.current, {
      rotation: 8,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      transformOrigin: "25% 15%"
    })

    // حركة الفقاعات
    bubbleRefs.current.forEach((bubble, i) => {
      if (bubble) {
        gsap.to(bubble, {
          y: -50,
          x: Math.sin(i) * 20,
          opacity: 0,
          duration: 3 + i * 0.6,
          repeat: -1,
          delay: i * 0.7,
          ease: "power1.out"
        })
      }
    })
  }, [])

  // تأثير الضغط والعملة
  useEffect(() => {
    if (showTap) {
      // تأثير الضغط (Squash & Stretch)
      gsap.to(whaleRef.current, {
        scaleX: 1.05,
        scaleY: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 3,
        ease: "power2.out"
      })

      // حركة العملة
      gsap.fromTo(
        coinRef.current,
        { scale: 0.3, opacity: 1, y: 0, x: 0 },
        { scale: 1.8, opacity: 0, y: -100, x: 30, duration: 0.9, ease: "back.out(2)" }
      )
    }
  }, [showTap])

  const handleClick = () => {
    onTap()
  }

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      style={{
        width: '280px',
        height: '340px',
        position: 'relative',
        cursor: 'pointer',
        WebkitTapHighlightColor: 'transparent',
        userSelect: 'none',
        outline: 'none',
        touchAction: 'manipulation',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* الفقاعات */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`bubble-${i}`}
          ref={el => bubbleRefs.current[i] = el}
          style={{
            position: 'absolute',
            width: `${8 + i * 2.5}px`,
            height: `${8 + i * 2.5}px`,
            border: '1.5px solid rgba(255,255,255,0.5)',
            borderRadius: '50%',
            left: `${10 + i * 18}%`,
            bottom: `${8 + i * 15}%`,
            zIndex: 1,
            boxShadow: 'inset -1px -1px 2px rgba(0,0,0,0.1)'
          }}
        />
      ))}

      {/* العملات العائمة في الخلفية */}
      <div
        style={{
          position: 'absolute',
          left: '8%',
          top: '20%',
          fontSize: '26px',
          opacity: 0.4,
          animation: 'float 3.5s ease-in-out infinite',
          pointerEvents: 'none'
        }}
      >
        🪙
      </div>

      <div
        style={{
          position: 'absolute',
          right: '12%',
          bottom: '30%',
          fontSize: '20px',
          opacity: 0.35,
          animation: 'float 3s ease-in-out infinite 0.8s',
          pointerEvents: 'none'
        }}
      >
        🪙
      </div>

      {/* رسم الحوت (SVG) */}
      <svg
        ref={whaleRef}
        viewBox="0 0 200 240"
        style={{
          width: '100%',
          height: '100%',
          filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.25))',
          zIndex: 5
        }}
      >
        <defs>
          {/* تدرجات الألوان */}
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7a9aaa" />
            <stop offset="50%" stopColor="#5a7a9a" />
            <stop offset="100%" stopColor="#3a5a7a" />
          </linearGradient>

          <linearGradient id="bellyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9aaabc" />
            <stop offset="100%" stopColor="#7a8aaa" />
          </linearGradient>

          <linearGradient id="capGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#c0c0c0" />
          </linearGradient>

          <linearGradient id="jacketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6a7a8a" />
            <stop offset="100%" stopColor="#3a4a5a" />
          </linearGradient>

          <linearGradient id="coinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd700" />
            <stop offset="50%" stopColor="#ffed4e" />
            <stop offset="100%" stopColor="#daa520" />
          </linearGradient>
        </defs>

        {/* الذيل */}
        <path
          d="M 160 205 Q 200 180 225 145 Q 240 110 220 120 Q 205 130 190 155 Q 180 185 175 200"
          fill="#3a5a7a"
          stroke="#2a4a6a"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* الجسم الرئيسي */}
        <ellipse
          cx="100"
          cy="125"
          rx="78"
          ry="98"
          fill="url(#bodyGradient)"
        />

        {/* البطن */}
        <ellipse
          cx="100"
          cy="160"
          rx="62"
          ry="48"
          fill="url(#bellyGradient)"
          opacity="0.8"
        />

        {/* خطوط البطن (الأضلاع) */}
        <g opacity="0.25" stroke="#4a6a8a" strokeWidth="2.5" fill="none" strokeLinecap="round">
          <path d="M 82 145 Q 82 170 82 200" />
          <path d="M 91 142 Q 91 168 91 203" />
          <path d="M 100 140 Q 100 167 100 205" />
          <path d="M 109 142 Q 109 168 109 203" />
          <path d="M 118 145 Q 118 170 118 200" />
        </g>

        {/* السترة (الجاكيت) */}
        <path
          d="M 32 170 Q 32 210 100 220 Q 168 210 168 170 Q 168 148 100 148 Q 32 148 32 170"
          fill="url(#jacketGradient)"
          stroke="#2a3a4a"
          strokeWidth="1.5"
        />

        {/* أزرار السترة */}
        <circle cx="95" cy="158" r="2.5" fill="#c9a227" opacity="0.8" />
        <circle cx="105" cy="158" r="2.5" fill="#c9a227" opacity="0.8" />

        {/* زينة السترة */}
        <polygon points="100,162 96,172 104,172" fill="#c9a227" stroke="#8a7218" strokeWidth="1" opacity="0.9" />

        {/* نص NCT */}
        <text
          x="100"
          y="192"
          textAnchor="middle"
          fill="#7a8aaa"
          fontSize="14"
          fontWeight="bold"
          letterSpacing="2.5"
          fontFamily="Arial, sans-serif"
          opacity="0.9"
        >
          NCT
        </text>

        {/* الذراع اليسرى */}
        <g ref={leftArmRef} style={{ transformOrigin: '28px 115px' }}>
          {/* العضد */}
          <ellipse
            cx="28"
            cy="110"
            rx="18"
            ry="35"
            fill="url(#bodyGradient)"
            transform="rotate(-28 28 110)"
          />
          {/* اليد */}
          <circle cx="15" cy="145" r="18" fill="url(#bodyGradient)" stroke="#2a4a6a" strokeWidth="1" />
          {/* الأصابع */}
          <ellipse cx="8" cy="138" rx="4" ry="8" fill="#4a6a8a" transform="rotate(-20 8 138)" />
          <ellipse cx="8" cy="152" rx="4" ry="8" fill="#4a6a8a" transform="rotate(20 8 152)" />
          <ellipse cx="20" cy="158" rx="5" ry="7" fill="#3a5a7a" />
        </g>

        {/* الذراع اليمنى مع الإبهام للأعلى */}
        <g ref={rightArmRef} style={{ transformOrigin: '172px 105px' }}>
          {/* العضد */}
          <ellipse
            cx="172"
            cy="105"
            rx="18"
            ry="35"
            fill="url(#bodyGradient)"
            transform="rotate(28 172 105)"
          />
          {/* اليد */}
          <circle cx="185" cy="140" r="18" fill="url(#bodyGradient)" stroke="#2a4a6a" strokeWidth="1" />
          {/* الإبهام للأعلى */}
          <ellipse cx="195" cy="108" rx="8" ry="16" fill="#5a7a9a" transform="rotate(-20 195 108)" stroke="#2a4a6a" strokeWidth="1" />
          {/* الأصابع */}
          <ellipse cx="198" cy="135" rx="5" ry="9" fill="#4a6a8a" transform="rotate(15 198 135)" />
          <ellipse cx="192" cy="152" rx="5" ry="8" fill="#3a5a7a" transform="rotate(10 192 152)" />
        </g>

        {/* منطقة الوجه */}
        <ellipse
          cx="100"
          cy="75"
          rx="68"
          ry="58"
          fill="url(#bodyGradient)"
        />

        {/* العيون */}
        <g>
          {/* العين اليسرى */}
          <circle cx="70" cy="62" r="14" fill="white" stroke="#d0d0d0" strokeWidth="0.5" />
          <circle cx="73" cy="63" r="7" fill="#1a1a2e" />
          <circle cx="75" cy="60" r="3" fill="white" opacity="0.9" />

          {/* العين اليمنى */}
          <circle cx="130" cy="62" r="14" fill="white" stroke="#d0d0d0" strokeWidth="0.5" />
          <circle cx="127" cy="63" r="7" fill="#1a1a2e" />
          <circle cx="125" cy="60" r="3" fill="white" opacity="0.9" />
        </g>

        {/* الأنف */}
        <g>
          <ellipse cx="100" cy="85" rx="5" ry="4" fill="#4a6a8a" />
          <path d="M 100 89 L 98 93 M 100 89 L 102 93" stroke="#4a6a8a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </g>

        {/* الفم (الابتسامة) */}
        <path
          d="M 75 95 Q 100 110 125 95"
          fill="none"
          stroke="#2a4a5a"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* الخدود (للحلاوة) */}
        <ellipse cx="55" cy="78" rx="11" ry="6" fill="#ff6b6b" opacity="0.2" />
        <ellipse cx="145" cy="78" rx="11" ry="6" fill="#ff6b6b" opacity="0.2" />

        {/* القبعة */}
        <defs>
          <filter id="capShadow">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* قمة القبعة */}
        <ellipse cx="100" cy="18" rx="60" ry="15" fill="url(#capGradient)" filter="url(#capShadow)" />
        {/* جسم القبعة */}
        <path
          d="M 40 22 Q 100 8 160 22 L 158 40 Q 100 28 42 40 Z"
          fill="url(#capGradient)"
        />
        {/* حافة القبعة */}
        <path
          d="M 35 38 Q 100 18 165 38 Q 172 42 165 46 Q 100 34 35 46 Q 28 42 35 38"
          fill="#e5e5e5"
        />

        {/* شعار القبعة */}
        <circle cx="100" cy="18" r="11" fill="#4a90d9" stroke="#2a6ab0" strokeWidth="0.5" />
        <text x="100" y="22" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">✈</text>
      </svg>

      {/* تأثير العملة العائمة */}
      <div
        ref={coinRef}
        style={{
          position: 'absolute',
          top: '20%',
          right: '25%',
          fontSize: '36px',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 10,
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
        }}
      >
        🪙
      </div>

      {/* رسالة التصفيق */}
      {showTap && (
        <div
          style={{
            position: 'absolute',
            top: '5%',
            right: '5%',
            background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
            padding: '10px 18px',
            borderRadius: '25px',
            color: '#1e3a5f',
            fontWeight: 'bold',
            fontSize: '18px',
            animation: 'floatUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
            boxShadow: '0 6px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.6)',
            zIndex: 10,
            fontFamily: 'Arial, sans-serif',
            letterSpacing: '1px'
          }}
        >
          +1
        </div>
      )}

      {/* الأنماط والحركات */}
      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px); 
          }
          50% { 
            transform: translateY(-18px); 
          }
        }
        
        @keyframes floatUp {
          0% { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
          100% { 
            opacity: 0; 
            transform: translateY(-60px) scale(1.3); 
          }
        }
      `}</style>
    </div>
  )
}

export default Whale
