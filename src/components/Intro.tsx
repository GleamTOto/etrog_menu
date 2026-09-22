import { useState, useEffect } from 'react'

const ETROG = '#EFC12B'
const CARBON = '#14110D'

function LemonIntroSVG() {
  const A = (len: number, delay: number, dur = 160): React.CSSProperties => ({
    strokeDasharray: len,
    strokeDashoffset: len,
    animation: `draw-lemon ${dur}ms ease forwards ${delay}ms`,
  })
  const segs = [0, 60, 120, 180, 240, 300].map((d) => {
    const a = (d * Math.PI) / 180
    return { x2: 30 + 19 * Math.sin(a), y2: 29 - 19 * Math.cos(a) }
  })
  return (
    <svg width="108" height="122" viewBox="0 0 60 68" fill="none">
      <circle cx="30" cy="29" r="25" stroke={ETROG} strokeWidth="1.8" style={A(157, 0, 200)} />
      <circle cx="30" cy="29" r="19" stroke={ETROG} strokeWidth="0.9" opacity="0.6" style={A(119, 130, 140)} />
      {segs.map(({ x2, y2 }, i) => (
        <line
          key={i}
          x1="30"
          y1="29"
          x2={x2}
          y2={y2}
          stroke={ETROG}
          strokeWidth="0.8"
          opacity="0.55"
          style={A(19, 225 + i * 18, 80)}
        />
      ))}
      <circle cx="30" cy="29" r="2.5" stroke={ETROG} strokeWidth="0.9" style={A(16, 355, 70)} />
      <path
        d="M30 54 C28.4 57.3 27.8 62 30 64.3 C32.2 62 31.6 57.3 30 54Z"
        stroke={ETROG}
        strokeWidth="1.5"
        strokeLinecap="round"
        style={A(23, 415, 160)}
      />
    </svg>
  )
}

export function Intro() {
  const [introOver, setIntroOver] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIntroOver(true)
      return
    }
    const t = setTimeout(() => setIntroOver(true), 800)
    return () => clearTimeout(t)
  }, [])

  if (introOver) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: CARBON,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'intro-fade 150ms ease forwards 660ms',
      }}
    >
      <LemonIntroSVG />
    </div>
  )
}
