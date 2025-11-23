// app/components/FooterIcons.tsx
import React from 'react';

// Kita menggunakan style inline untuk ukuran agar konsisten tanpa Tailwind
const iconStyle = { width: '16px', height: '16px' };

type IconProps = { className?: string };

export const IconInstagram = ({ className }: IconProps) => (
  <svg className={className} style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export const IconGithub = ({ className }: IconProps) => (
  <svg className={className} style={iconStyle} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
  </svg>
);

export const IconFacebook = ({ className }: IconProps) => (
  <svg className={className} style={iconStyle} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z"></path>
  </svg>
);

export const IconYoutube = ({ className }: IconProps) => (
  <svg className={className} style={iconStyle} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.582 7.188a2.766 2.766 0 0 0-1.948-1.94C18.32 5 12 5 12 5s-6.32 0-7.634.248a2.766 2.766 0 0 0-1.948 1.94C2 8.5 2 12 2 12s0 3.5.248 4.812a2.766 2.766 0 0 0 1.948 1.94C5.68 19 12 19 12 19s6.32 0 7.634-.248a2.766 2.766 0 0 0 1.948-1.94C22 15.5 22 12 22 12s0-3.5-.418-4.812zM9.75 15.02V8.98L15.25 12 9.75 15.02z"></path>
  </svg>
);

export const IconWhatsapp = ({ className }: IconProps) => (
  <svg className={className} style={iconStyle} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.74.44 3.39 1.21 4.85L2.06 22l5.3-1.28c1.4.71 2.97 1.1 4.68 1.1h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m.01 1.67c4.55 0 8.24 3.69 8.24 8.24 0 4.55-3.69 8.24-8.24 8.24h-.01c-1.57 0-3.06-.44-4.38-1.21l-.31-.19-3.26.79.8-3.18.21-.33c-.84-1.37-1.35-2.96-1.35-4.66 0-4.55 3.69-8.24 8.24-8.24m4.53 11.24c-.25-.12-1.47-.72-1.7-.85-.23-.12-.39-.19-.56.12-.17.31-.64.85-.79 1.02-.15.17-.29.19-.54.06-.25-.12-1.07-.39-2.03-1.25-.75-.66-1.25-1.48-1.39-1.73-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.22.25-.85.83-.85 2.02 0 1.19.87 2.34 1 2.5.12.17 1.73 2.63 4.2 3.7.59.25 1.05.41 1.41.51.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.31z"></path>
  </svg>
);

export const IconPhone = ({ className }: IconProps) => (
  <svg className={className} style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
  </svg>
);

export const IconEnvelope = ({ className }: IconProps) => (
  <svg className={className} style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
  </svg>
);

export const IconMapPin = ({ className }: IconProps) => (
  <svg className={className} style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
  </svg>
);

export const IconClock = ({ className }: IconProps) => (
  <svg className={className} style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);