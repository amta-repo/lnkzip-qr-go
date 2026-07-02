import React from 'react';
import { Link } from 'react-router-dom';
import logoUrl from '/favicon.png';

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

/**
 * lnkzip brand logo. Uses the shared /favicon.png so brand,
 * favicon, and social share image stay consistent.
 */
export const Logo: React.FC<LogoProps> = ({ size = 36, showText = true, className = '' }) => {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`} aria-label="lnkzip home">
      <img
        src={logoUrl}
        alt="lnkzip logo — lightning-bolt Z symbol for the lnkzip URL shortener and QR code generator"
        width={size}
        height={size}
        className="rounded-md"
      />
      {showText && (
        <div className="leading-tight">
          <span className="block text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            lnkzip
          </span>
          <span className="block text-[10px] text-muted-foreground -mt-0.5">
            Shorten • QR • Track
          </span>
        </div>
      )}
    </Link>
  );
};
