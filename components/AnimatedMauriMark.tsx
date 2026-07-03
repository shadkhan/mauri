export default function AnimatedMauriMark() {
  const growingLine =
    'mauri-grow-line [stroke-dasharray:1] [stroke-dashoffset:1]'

  return (
    <svg
      viewBox="0 0 200 320"
      role="img"
      aria-labelledby="mauri-mark-title"
      className="h-11 w-11 sm:h-12 sm:w-12"
    >
      <title id="mauri-mark-title">Mauri logo mark</title>
      <line
        className={`${growingLine} [animation-delay:0s]`}
        pathLength="1"
        x1="100"
        y1="20"
        x2="100"
        y2="272"
        stroke="#1D9E75"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        className={`${growingLine} [animation-delay:0.3s]`}
        pathLength="1"
        d="M100,52 Q148,34 162,14"
        stroke="#1D9E75"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        className={`${growingLine} [animation-delay:0.45s] opacity-[0.45]`}
        pathLength="1"
        d="M100,52 Q56,36 44,16"
        stroke="#1D9E75"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        className={`${growingLine} [animation-delay:0.65s]`}
        pathLength="1"
        d="M100,98 Q152,76 170,52"
        stroke="#1D9E75"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        className={`${growingLine} [animation-delay:0.8s] opacity-40`}
        pathLength="1"
        d="M100,98 Q50,78 34,54"
        stroke="#1D9E75"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        className={`${growingLine} [animation-delay:1.05s]`}
        pathLength="1"
        d="M100,148 Q146,128 158,108"
        stroke="#7F77DD"
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        className={`${growingLine} [animation-delay:1.2s] opacity-50`}
        pathLength="1"
        d="M100,148 Q56,130 46,110"
        stroke="#7F77DD"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        className={`${growingLine} [animation-delay:1.45s] opacity-[0.78]`}
        pathLength="1"
        d="M100,192 Q136,178 144,164"
        stroke="#7F77DD"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        className={`${growingLine} [animation-delay:1.6s] opacity-[0.42]`}
        pathLength="1"
        d="M100,192 Q66,179 60,166"
        stroke="#7F77DD"
        strokeWidth="1.3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        className={`${growingLine} [animation-delay:1.85s] opacity-[0.55]`}
        pathLength="1"
        d="M100,232 Q124,222 128,212"
        stroke="#7F77DD"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        className={`${growingLine} [animation-delay:2.1s] opacity-[0.72]`}
        pathLength="1"
        d="M100,256 Q116,249 118,240"
        stroke="#EF9F27"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        className={`${growingLine} [animation-delay:2.25s] opacity-[0.42]`}
        pathLength="1"
        d="M100,256 Q86,250 84,242"
        stroke="#EF9F27"
        strokeWidth="1.1"
        fill="none"
        strokeLinecap="round"
      />
      <circle
        className="mauri-root-pulse [animation-delay:2.45s]"
        cx="100"
        cy="284"
        r="18"
        fill="#1D9E75"
      />
      <circle cx="100" cy="284" r="10" fill="white" />
    </svg>
  )
}
