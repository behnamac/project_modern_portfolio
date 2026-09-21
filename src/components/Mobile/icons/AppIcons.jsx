import Squircle from "./Squircle";

// The eight mobile app icons. House rules so they read as one family:
// vertical gradient (lighter on top), glyph inside the 20..80 box unless
// noted, stroke glyphs at width 7 with round caps, no specular gloss (iOS
// dropped it after 16 — adding it dates the whole UI), and no baked-in drop
// shadow (the parent applies shadow-ios-icon).

export const FilesIcon = () => (
  <Squircle from="#FFFFFF" to="#E8E8EE" title="Files">
    <defs>
      <linearGradient id="files-back" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#4DA8FF" />
        <stop offset="1" stopColor="#0A72F0" />
      </linearGradient>
      <linearGradient id="files-front" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#8FC9FF" />
        <stop offset="1" stopColor="#3D93FF" />
      </linearGradient>
    </defs>
    <path
      d="M22 34h20l6 7h30a5 5 0 0 1 5 5v25a5 5 0 0 1-5 5H27a5 5 0 0 1-5-5Z"
      fill="url(#files-back)"
    />
    <path
      d="M22 48h56a5 5 0 0 1 5 5v18a5 5 0 0 1-5 5H27a5 5 0 0 1-5-5Z"
      fill="url(#files-front)"
    />
  </Squircle>
);

export const SafariIcon = () => (
  <Squircle from="#3FB8FF" to="#0A66FF" title="Safari">
    <circle cx="50" cy="50" r="30" fill="none" stroke="#fff" strokeWidth="5" />
    <g stroke="#fff" strokeWidth="1.6" opacity="0.7" strokeLinecap="round">
      {Array.from({ length: 12 }, (_, i) => (
        <line
          key={i}
          x1="50"
          y1="24"
          x2="50"
          y2="28"
          transform={`rotate(${i * 30} 50 50)`}
        />
      ))}
    </g>
    <g transform="rotate(-20 50 50)">
      <path d="M50 50 68 32 56 56Z" fill="#FF3B30" />
      <path d="M50 50 32 68 44 44Z" fill="#FFFFFF" />
    </g>
  </Squircle>
);

export const PhotosIcon = () => (
  <Squircle from="#FFFFFF" to="#F1F1F5" title="Photos">
    {/* Eight petals rotated about the centre. multiply blending darkens the
        overlaps into the characteristic bloom without hand-picking 28 colours;
        isolation keeps it from blending with whatever sits behind the icon. */}
    <g style={{ mixBlendMode: "multiply", isolation: "isolate" }}>
      {[
        "#F5C518", "#F58220", "#EF4136", "#E6399B",
        "#A24BE0", "#3B5BE0", "#29A9E1", "#4CB749",
      ].map((fill, i) => (
        <ellipse
          key={fill}
          cx="50"
          cy="32"
          rx="9.5"
          ry="16"
          fill={fill}
          opacity="0.82"
          transform={`rotate(${i * 45} 50 50)`}
        />
      ))}
    </g>
  </Squircle>
);

export const ContactsIcon = () => (
  <Squircle from="#FFFFFF" to="#EFEFF4" title="Contacts">
    <defs>
      <linearGradient id="contacts-fill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#B8945F" />
        <stop offset="1" stopColor="#8A6A46" />
      </linearGradient>
    </defs>
    <line x1="24" y1="18" x2="24" y2="82" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" />
    {[30, 47, 64].map((y) => (
      <rect key={y} x="78" y={y} width="22" height="9" rx="4.5" fill="url(#contacts-fill)" />
    ))}
    <circle cx="46" cy="41" r="12" fill="url(#contacts-fill)" />
    <path d="M26 78a20 20 0 0 1 40 0Z" fill="url(#contacts-fill)" />
  </Squircle>
);

export const TerminalIcon = () => (
  <Squircle from="#3A3A3C" to="#141416" dark title="Terminal">
    <rect x="0" y="0" width="100" height="15" fill="rgba(255,255,255,0.07)" />
    <g stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M29 40 44 53 29 66" />
      <path d="M52 66h22" />
    </g>
  </Squircle>
);

export const NotesIcon = () => (
  // Two full-bleed bands rather than a gradient, so the shell's gradient is
  // neutralised and the paper/header split shows through the clip.
  <Squircle from="#FFFFFF" to="#FFFFFF" title="Notes">
    <defs>
      <linearGradient id="notes-head" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FCFCFA" />
        <stop offset="1" stopColor="#EFEFEA" />
      </linearGradient>
      <linearGradient id="notes-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFE45C" />
        <stop offset="1" stopColor="#FFC700" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="100" height="24" fill="url(#notes-head)" />
    <rect x="0" y="24" width="100" height="76" fill="url(#notes-body)" />
    <path d="M0 24h100" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" />
    <g stroke="rgba(0,0,0,0.13)" strokeWidth="3.5" strokeLinecap="round">
      <path d="M22 46h56M22 62h56M22 78h36" />
    </g>
  </Squircle>
);

export const ResumeIcon = () => (
  <Squircle from="#FF7A68" to="#E02B20" title="Resume">
    <path
      d="M32 24h22l16 16v36a4 4 0 0 1-4 4H36a4 4 0 0 1-4-4V28a4 4 0 0 1 4-4Z"
      fill="#FFFFFF"
    />
    <path d="M54 24v12a4 4 0 0 0 4 4h12Z" fill="rgba(0,0,0,0.12)" />
    <g stroke="#E02B20" strokeWidth="3.5" strokeLinecap="round">
      <path d="M40 54h22M40 62h22M40 70h14" />
    </g>
  </Squircle>
);

export const BinIcon = () => (
  <Squircle from="#A0A0A6" to="#5E5E63" title="Bin">
    <g stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M28 34h44" />
      <path d="M42 34v-4a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v4" />
      <path d="M33 34l3 36a6 6 0 0 0 6 5h16a6 6 0 0 0 6-5l3-36" />
      <path d="M44 46v18M56 46v18" strokeWidth="5" opacity="0.75" />
    </g>
  </Squircle>
);

export const SettingsIcon = () => (
  <Squircle from="#C8C8CE" to="#8A8A90" title="Settings">
    <g fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="50" cy="50" r="11" />
      {Array.from({ length: 8 }, (_, i) => (
        <line key={i} x1="50" y1="26" x2="50" y2="34" transform={`rotate(${i * 45} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="24" opacity="0.55" strokeWidth="4" />
    </g>
  </Squircle>
);
