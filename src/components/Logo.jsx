export default function Logo({ className = "", size = 40 }) {
    return (
        <div className={`app-logo ${className}`} style={{ width: size, height: size }}>
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="logoGradient" x1="0" y1="0" x2="100" y2="100">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Abstract Book/Clock Base */}
                <circle cx="50" cy="50" r="45" stroke="url(#logoGradient)" strokeWidth="8" fill="rgba(139, 92, 246, 0.1)" />

                {/* Clock Hands */}
                <line x1="50" y1="50" x2="50" y2="25" stroke="white" strokeWidth="6" strokeLinecap="round" />
                <line x1="50" y1="50" x2="70" y2="50" stroke="white" strokeWidth="6" strokeLinecap="round" />

                {/* Book Pages Hint */}
                <path d="M25 70 Q 50 80 75 70" stroke="rgba(255,255,255,0.5)" strokeWidth="4" fill="none" />
            </svg>
            <style jsx>{`
        .app-logo {
          display: inline-block;
          filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.6));
        }
      `}</style>
        </div>
    );
}
