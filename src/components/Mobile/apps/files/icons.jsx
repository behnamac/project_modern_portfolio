// Document shapes used inside Files. These are NOT squircles — they are page
// and folder glyphs, so they get their own viewBox and no app-icon chrome.

export const BlueFolder = () => (
  <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
    <defs>
      <linearGradient id="ff-back" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#4DA8FF" />
        <stop offset="1" stopColor="#0A72F0" />
      </linearGradient>
      <linearGradient id="ff-front" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#8FC9FF" />
        <stop offset="1" stopColor="#3D93FF" />
      </linearGradient>
    </defs>
    <path d="M4 14h18l5 6h33a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4Z" fill="url(#ff-back)" />
    <path d="M4 26h56a4 4 0 0 1 4 4v22a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4Z" fill="url(#ff-front)" />
  </svg>
);

const Page = ({ badge, badgeColor, lines = true }) => (
  <svg viewBox="0 0 52 64" className="h-full w-full" aria-hidden="true">
    <path
      d="M6 2h26l14 14v44a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"
      fill="#FFFFFF"
      stroke="rgba(0,0,0,0.14)"
      strokeWidth="1.5"
    />
    <path d="M32 2v12a2 2 0 0 0 2 2h12Z" fill="rgba(0,0,0,0.10)" />
    {lines && (
      <g stroke="#C7C7CC" strokeWidth="2.5" strokeLinecap="round">
        <path d="M12 28h28M12 36h28M12 44h18" />
      </g>
    )}
    <rect x="4" y="44" width="30" height="14" rx="3" fill={badgeColor} />
    <text
      x="19"
      y="54"
      textAnchor="middle"
      fontSize="9"
      fontWeight="700"
      fill="#FFFFFF"
      fontFamily="system-ui, sans-serif"
    >
      {badge}
    </text>
  </svg>
);

export const PdfFile = () => <Page badge="PDF" badgeColor="#E02B20" />;
export const TxtFile = () => <Page badge="TXT" badgeColor="#8E8E93" />;
