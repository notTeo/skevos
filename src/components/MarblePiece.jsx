// Marble texture + furniture silhouette SVG renderer.
// Renders editorial-style "product photos" entirely in SVG.

export function MarbleVeins({ seed, color, highlight }) {
  const rand = (() => {
    let s = seed * 1000 + 7
    return () => {
      s = (s * 9301 + 49297) % 233280
      return s / 233280
    }
  })()

  const veins = []
  for (let i = 0; i < 6; i++) {
    const y0 = 100 + rand() * 800
    const y1 = y0 + (rand() - 0.5) * 400
    const c1x = 200 + rand() * 600
    const c1y = y0 + (rand() - 0.5) * 200
    const c2x = 200 + rand() * 600
    const c2y = y1 + (rand() - 0.5) * 200
    const w = 0.6 + rand() * 1.8
    const op = 0.18 + rand() * 0.35
    veins.push(
      <path
        key={i}
        d={`M -50 ${y0} C ${c1x} ${c1y}, ${c2x} ${c2y}, 1050 ${y1}`}
        stroke={color}
        strokeWidth={w}
        strokeOpacity={op}
        fill="none"
      />
    )
  }
  for (let i = 0; i < 3; i++) {
    const y0 = 200 + rand() * 600
    const y1 = y0 + (rand() - 0.5) * 300
    veins.push(
      <path
        key={`h${i}`}
        d={`M -50 ${y0} Q 500 ${(y0 + y1) / 2 + (rand() - 0.5) * 200} 1050 ${y1}`}
        stroke={highlight}
        strokeWidth={0.8}
        strokeOpacity={0.55}
        fill="none"
      />
    )
  }
  return <g>{veins}</g>
}

export default function MarblePiece({
  seed = 1,
  veinColor = '#7c6e5b',
  baseColor = '#efe6d6',
  highlight = '#fbf6ec',
  bg = '#e2d6c0',
  bgAccent = '#cbbda3',
  shape = 'console',
  rotate = 0,
  className = '',
  style = {},
}) {
  const fId = `f${seed}`
  const gId = `g${seed}`
  const bgId = `b${seed}`
  const sId = `s${seed}`
  const clipId = `c${seed}`

  const silhouettes = {
    console: (
      <g>
        <rect x="120" y="430" width="760" height="60" rx="8" />
        <rect x="170" y="490" width="70" height="280" />
        <rect x="760" y="490" width="70" height="280" />
      </g>
    ),
    coffee: (
      <g>
        <ellipse cx="500" cy="470" rx="380" ry="56" />
        <rect x="430" y="510" width="140" height="220" />
        <ellipse cx="500" cy="745" rx="220" ry="34" />
      </g>
    ),
    plinth: (
      <g>
        <rect x="320" y="260" width="360" height="510" rx="4" />
        <rect x="290" y="745" width="420" height="30" rx="4" />
      </g>
    ),
    side: (
      <g>
        <ellipse cx="500" cy="430" rx="240" ry="38" />
        <path d="M 410 460 Q 380 600 410 760 L 590 760 Q 620 600 590 460 Z" />
      </g>
    ),
    pillar: (
      <g>
        <rect x="430" y="180" width="140" height="36" rx="3" />
        <rect x="440" y="216" width="120" height="520" />
        <rect x="410" y="736" width="180" height="40" rx="3" />
      </g>
    ),
    dining: (
      <g>
        <ellipse cx="500" cy="420" rx="430" ry="48" />
        <path d="M 380 460 Q 340 600 400 760 L 600 760 Q 660 600 620 460 Z" />
        <ellipse cx="500" cy="770" rx="280" ry="32" />
      </g>
    ),
    bench: (
      <g>
        <rect x="140" y="450" width="720" height="80" rx="6" />
        <path d="M 190 530 Q 170 620 200 770 L 320 770 Q 350 620 330 530 Z" />
        <path d="M 670 530 Q 650 620 680 770 L 800 770 Q 830 620 810 530 Z" />
      </g>
    ),
    orb: (
      <g>
        <circle cx="500" cy="430" r="180" />
        <rect x="440" y="610" width="120" height="160" />
        <ellipse cx="500" cy="775" rx="160" ry="22" />
      </g>
    ),
  }

  const silhouette = silhouettes[shape] || silhouettes.console

  return (
    <svg
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      style={{ width: '100%', height: '100%', display: 'block', ...style }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={bgId} cx="50%" cy="42%" r="80%">
          <stop offset="0%" stopColor={bg} />
          <stop offset="55%" stopColor={bg} />
          <stop offset="100%" stopColor={bgAccent} />
        </radialGradient>
        <linearGradient id={gId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={highlight} />
          <stop offset="50%" stopColor={baseColor} />
          <stop offset="100%" stopColor={veinColor} stopOpacity="0.4" />
        </linearGradient>
        <filter id={fId} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.06"
            numOctaves="3"
            seed={seed}
            result="t"
          />
          <feColorMatrix
            in="t"
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 1.4 -0.55"
            result="vein"
          />
          <feGaussianBlur in="vein" stdDeviation="0.6" result="veinBlur" />
          <feComposite in="veinBlur" in2="SourceGraphic" operator="in" result="veined" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="veined" />
          </feMerge>
        </filter>
        <filter id={sId} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="14" />
          <feOffset dx="0" dy="18" result="off" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.35" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id={clipId}>
          <g transform={`rotate(${rotate} 500 540)`}>{silhouette}</g>
        </clipPath>
      </defs>

      <rect width="1000" height="1000" fill={`url(#${bgId})`} />
      <rect x="0" y="780" width="1000" height="220" fill={bgAccent} opacity="0.45" />
      <ellipse cx="500" cy="790" rx="320" ry="22" fill={veinColor} opacity="0.22" />

      <g filter={`url(#${sId})`}>
        <g clipPath={`url(#${clipId})`}>
          <rect width="1000" height="1000" fill={`url(#${gId})`} />
          <MarbleVeins seed={seed} color={veinColor} highlight={highlight} />
        </g>
        <g
          transform={`rotate(${rotate} 500 540)`}
          fill="none"
          stroke={highlight}
          strokeOpacity="0.35"
          strokeWidth="1.2"
        >
          {silhouette}
        </g>
      </g>

      <defs>
        <pattern id={`grain${seed}`} width="6" height="6" patternUnits="userSpaceOnUse">
          <rect width="6" height="6" fill="transparent" />
        </pattern>
      </defs>
      <rect width="1000" height="1000" fill={`url(#grain${seed})`} opacity="0.4" />
    </svg>
  )
}
