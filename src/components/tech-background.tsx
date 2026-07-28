export function TechBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="tech-grid-fine absolute inset-0" />
      <div className="tech-grid-coarse absolute inset-0" />

      <svg
        className="absolute inset-0 h-full w-full opacity-[0.12]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="tech-dots"
            width="96"
            height="96"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="0" cy="0" r="1" fill="#f5f5f4" />
          </pattern>
          <pattern
            id="tech-cross"
            width="192"
            height="192"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M96 88v16M88 96h16"
              stroke="#f5f5f4"
              strokeWidth="1"
              fill="none"
            />
          </pattern>
        </defs>

        <rect width="1440" height="900" fill="url(#tech-dots)" />
        <rect width="1440" height="900" fill="url(#tech-cross)" />

        {/* Schematic PCB-style traces */}
        <g
          fill="none"
          stroke="#f5f5f4"
          strokeWidth="1.25"
          strokeLinecap="square"
        >
          <path d="M0 160 H240 V300 H480 V220 H720" opacity="0.55" />
          <path d="M1440 120 H1180 V260 H980 V380" opacity="0.45" />
          <path d="M0 620 H180 V740 H420" opacity="0.4" />
          <path d="M1440 700 H1220 V560 H980" opacity="0.4" />
          <path d="M520 0 V140 H680 V260" opacity="0.35" />
          <path d="M860 900 V760 H1040 V640" opacity="0.35" />
          <path d="M80 400 H200 V480 H360" opacity="0.3" />
          <path d="M1360 440 H1240 V520 H1080" opacity="0.3" />
        </g>

        {/* Junction nodes */}
        <g fill="#f5f5f4">
          <circle cx="240" cy="160" r="2.5" opacity="0.55" />
          <circle cx="480" cy="300" r="2.5" opacity="0.5" />
          <circle cx="720" cy="220" r="2.5" opacity="0.45" />
          <circle cx="1180" cy="120" r="2.5" opacity="0.45" />
          <circle cx="980" cy="260" r="2.5" opacity="0.4" />
          <circle cx="180" cy="620" r="2.5" opacity="0.4" />
          <circle cx="420" cy="740" r="2.5" opacity="0.4" />
          <circle cx="1220" cy="700" r="2.5" opacity="0.4" />
          <circle cx="980" cy="560" r="2.5" opacity="0.35" />
          <circle cx="680" cy="140" r="2.5" opacity="0.35" />
          <circle cx="1040" cy="760" r="2.5" opacity="0.35" />
        </g>

        {/* Corner registration marks (technical drawing) */}
        <g stroke="#f5f5f4" strokeWidth="1.25" fill="none" opacity="0.4">
          <path d="M32 64 V32 H64" />
          <path d="M1408 64 V32 H1376" />
          <path d="M32 836 V868 H64" />
          <path d="M1408 836 V868 H1376" />
        </g>
      </svg>
    </div>
  );
}
