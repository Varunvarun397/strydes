import { useId, useState } from 'react';
import type { CSSProperties, PointerEvent } from 'react';

type ShoeProps = {
  className?: string;
  exploded?: boolean;
  interactive?: boolean;
};

const upperPath = 'M116 354c24-18 42-38 61-64 18-25 23-45 43-49 14-3 32 9 54 14 42 10 76 8 109-15l47-39c15-12 30-13 48-5l50 23c53 5 97 25 137 59 42 35 86 55 134 75 20 9 26 19 18 31-9 12-29 17-64 16l-513 1c-56-1-96-9-120-23-15-9-16-18-4-24Z';
const toeMeshPath = 'M530 244c53 9 96 30 134 61 39 31 76 48 110 64-47 8-89 2-124-15-32-16-61-32-102-34-24-1-46 6-67 17 20-30 37-62 49-93Z';

export function StrydeShoe({ className = '', exploded = false, interactive = false }: ShoeProps) {
  const id = useId().replace(/:/g, '');
  const [drag, setDrag] = useState(0);
  const [lastX, setLastX] = useState<number | null>(null);

  const touchStart = (event: PointerEvent<SVGSVGElement>) => {
    if (!interactive) return;
    setLastX(event.clientX);
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const touchMove = (event: PointerEvent<SVGSVGElement>) => {
    if (!interactive || lastX === null) return;
    setDrag((current) => current + (event.clientX - lastX) * 0.35);
    setLastX(event.clientX);
  };
  const touchEnd = () => setLastX(null);

  return (
    <svg
      className={`stryde-shoe ${className}`}
      viewBox="0 0 900 560"
      role="img"
      aria-label="Original STRYDE low-cut performance sneaker, viewed from the side"
      onPointerDown={touchStart}
      onPointerMove={touchMove}
      onPointerUp={touchEnd}
      onPointerCancel={touchEnd}
      style={{ '--shoe-rotation': `${drag}deg` } as CSSProperties}
    >
      <defs>
        <linearGradient id={`${id}-upper`} x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#f4f5f6" />
          <stop offset=".38" stopColor="#c6cad0" />
          <stop offset=".76" stopColor="#858b94" />
          <stop offset="1" stopColor="#555a62" />
        </linearGradient>
        <linearGradient id={`${id}-foam`} x1="0" x2="0" y1="0" y2="1">
          <stop stopColor="#fcfcfd" />
          <stop offset=".44" stopColor="#d2d6dc" />
          <stop offset="1" stopColor="#858b93" />
        </linearGradient>
        <linearGradient id={`${id}-rubber`} x1="0" x2="0" y1="0" y2="1">
          <stop stopColor="#373b41" />
          <stop offset="1" stopColor="#141619" />
        </linearGradient>
        <linearGradient id={`${id}-panel`} x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#e9ebee" />
          <stop offset=".52" stopColor="#9da3ab" />
          <stop offset="1" stopColor="#626871" />
        </linearGradient>
        <linearGradient id={`${id}-collar`} x1="0" x2="1">
          <stop stopColor="#16181c" />
          <stop offset=".5" stopColor="#3a3e45" />
          <stop offset="1" stopColor="#191b1f" />
        </linearGradient>
        <linearGradient id={`${id}-volt`} x1="0" x2="1">
          <stop stopColor="#e0ff7b" />
          <stop offset="1" stopColor="#a1d900" />
        </linearGradient>
        <pattern id={`${id}-mesh`} width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(32)">
          <path d="M1 0v12M6 0v12M11 0v12" stroke="#42464e" strokeWidth="1.15" opacity=".38" />
          <path d="M0 3h12M0 9h12" stroke="#fff" strokeWidth=".7" opacity=".2" />
        </pattern>
        <clipPath id={`${id}-upper-clip`}><path d={upperPath} /></clipPath>
        <clipPath id={`${id}-mesh-clip`}><path d={toeMeshPath} /></clipPath>
        <filter id={`${id}-shoeShadow`} x="-30%" y="-50%" width="160%" height="220%">
          <feGaussianBlur stdDeviation="13" />
        </filter>
      </defs>

      <ellipse cx="474" cy="447" rx="327" ry="38" fill="#aeb3bf" opacity=".24" filter={`url(#${id}-shoeShadow)`} />

      <g className={`shoe-part part-outsole ${exploded ? 'is-exploded' : ''}`}>
        <path d="M112 389c43 19 101 26 173 24l450-2c37-1 67-8 91-21 17-9 23 5 15 19-16 28-62 40-135 44l-387 4c-91 0-160-12-197-35-27-17-31-31-10-33Z" fill={`url(#${id}-rubber)`} stroke="#70757c" strokeWidth="3" />
        <path d="M122 410c44 21 112 31 205 31l366-4c54-1 95-9 123-22" fill="none" stroke="#c6ff00" strokeWidth="4" opacity=".76" />
        <path d="M157 444l18 11m23-8 18 11m23-8 18 11m23-8 18 11m390-12 19-8m19 4 19-8m19 4 17-7" fill="none" stroke="#92979f" strokeWidth="3" strokeLinecap="round" />
      </g>

      <g className={`shoe-part part-midsole ${exploded ? 'is-exploded' : ''}`}>
        <path d="M113 369c53 15 106 18 174 11 67-7 115-13 174-8 85 8 149 18 222 16 54-1 96-9 129-20 15-5 25 5 17 17-13 21-55 33-116 37l-437 9c-70 0-123-8-158-22-25-10-37-23-32-34 3-6 12-9 27-6Z" fill={`url(#${id}-foam)`} stroke="#f4f5f6" strokeWidth="3" />
        <path d="M146 393c69 13 119 14 183 8 78-8 133-12 209-5 76 7 162 12 249-6" fill="none" stroke="#737982" strokeWidth="2.5" opacity=".68" />
        <path d="M190 410c67 8 124 5 185-2m70 0c93 7 190 13 284-2" fill="none" stroke="#fff" strokeWidth="2" opacity=".55" />
      </g>

      <g className={`shoe-part part-insole ${exploded ? 'is-exploded' : ''}`}>
        <path d="M174 350c27-17 42-37 59-66 16-27 21-46 35-44 10 2 24 11 44 14 23 4 45 4 64-2l-1 17c-31 16-75 31-111 58-26 19-50 37-87 48-16 4-23-12-3-25Z" fill="#e1e4e8" opacity=".77" />
      </g>

      <g className={`shoe-part part-upper ${exploded ? 'is-exploded' : ''}`}>
        <path d={upperPath} fill={`url(#${id}-upper)`} stroke="#f1f3f5" strokeWidth="4" strokeLinejoin="round" />
        <g clipPath={`url(#${id}-upper-clip)`}>
          <path d={toeMeshPath} fill={`url(#${id}-mesh)`} opacity=".84" />
          <path d={toeMeshPath} fill="none" stroke="#eff1f4" strokeWidth="2" opacity=".72" />
          <path d="M137 365c26-20 48-47 64-72 13-21 22-38 37-37 16 1 36 13 60 17 33 6 62 1 90-15l45-37" fill="none" stroke="#fff" strokeWidth="3" opacity=".53" />
          <path d="M148 372c41 16 81 20 126 16" fill="none" stroke="#626770" strokeWidth="3" opacity=".5" />
        </g>
        <path d="M199 330c65-6 128-29 184-67 45-30 80-44 123-38-38 23-62 51-91 79-47 46-122 71-211 68-14 0-21-19-5-42Z" fill={`url(#${id}-panel)`} stroke="#f6f7f8" strokeWidth="2.5" />
        <path d="M210 347c73-4 129-26 183-69 29-23 51-36 80-43" fill="none" stroke="#727780" strokeWidth="2.5" opacity=".76" />
        <path d="M213 357c58-2 107-18 153-44 18-10 34-22 49-34" fill="none" stroke={`url(#${id}-volt)`} strokeWidth="7" strokeLinecap="round" />
        <path d="M584 270c44 22 84 54 141 79 25 11 50 18 74 22" fill="none" stroke="#fff" strokeWidth="2" opacity=".6" />
      </g>

      <g className={`shoe-part part-heel ${exploded ? 'is-exploded' : ''}`}>
        <path d="M118 354c24-20 41-40 59-64 15-20 20-36 34-35 15 1 34 13 51 18l-16 34c-14 31-20 62-24 93-47 0-82-9-103-22-15-9-16-17-1-24Z" fill={`url(#${id}-collar)`} stroke="#959ba3" strokeWidth="2.5" />
        <path d="M171 315c14 9 31 15 49 18m-67 17c20 13 43 20 70 22" fill="none" stroke="#c6cbd1" strokeWidth="2" opacity=".72" />
        <path d="M150 360c24 10 47 15 73 16" fill="none" stroke={`url(#${id}-volt)`} strokeWidth="5" strokeLinecap="round" />
        <path d="M219 252c6-11 13-20 23-24 11 1 19 7 30 13l-12 31c-17-7-29-13-41-20Z" fill="#26292f" stroke="#a8adb4" strokeWidth="2" />
      </g>

      <g className={`shoe-part part-tongue ${exploded ? 'is-exploded' : ''}`}>
        <path d="M325 271c17-34 40-68 62-88 11-10 24-12 36-4l69 45-21 71-146-24Z" fill={`url(#${id}-collar)`} stroke="#d7dade" strokeWidth="2.5" />
        <path d="M354 253c14-23 29-43 45-57 9 13 17 28 24 46l-69 36Z" fill="#777d85" opacity=".64" />
        <path d="M393 222c20 8 43 19 67 34" fill="none" stroke={`url(#${id}-volt)`} strokeWidth="4" />
        <rect x="407" y="215" width="38" height="16" rx="3" fill="#15171a" transform="rotate(22 407 215)" />
        <text x="414" y="228" fill="#f3f5f6" fontSize="8" fontFamily="Arial, sans-serif" fontWeight="700" letterSpacing="2" transform="rotate(22 414 228)">S / 01</text>
      </g>

      <g className={`shoe-part part-laces ${exploded ? 'is-exploded' : ''}`}>
        <path d="m354 274 98 32m-113-17 98 33m-112-18 97 32m-111-17 97 32" stroke="#535860" strokeWidth="13" strokeLinecap="round" fill="none" opacity=".58" />
        <path d="m350 269 98 32m-113-17 98 33m-112-18 97 32m-111-17 97 32" stroke="#f6f7f8" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="m350 267 98 32m-113-17 98 33m-112-18 97 32m-111-17 97 32" stroke="#969ba2" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <circle cx="348" cy="268" r="5" fill="#c6cad0" /><circle cx="448" cy="300" r="5" fill="#c6cad0" />
        <circle cx="333" cy="284" r="5" fill="#c6cad0" /><circle cx="433" cy="316" r="5" fill="#c6cad0" />
        <circle cx="320" cy="300" r="5" fill="#c6cad0" /><circle cx="418" cy="332" r="5" fill="#c6cad0" />
      </g>

      <g className={`shoe-part part-stitching ${exploded ? 'is-exploded' : ''}`}>
        <path d="M224 286c27 11 49 19 77 19m-95 45c57-3 106-17 154-46m170-94c39 14 68 33 96 57m-20 46c28 17 58 31 88 39" fill="none" stroke="#f6f7f8" strokeWidth="2" strokeDasharray="3 7" opacity=".86" />
      </g>
    </svg>
  );
}
