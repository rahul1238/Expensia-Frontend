interface ExpensiaIconProps {
  size?: number;
  className?: string;
}

export default function ExpensiaIcon({ size = 24, className = "" }: ExpensiaIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`drop-shadow-sm ${className}`}
    >
      {/* Main Circle - Green Design */}
      <circle 
        cx="50" 
        cy="50" 
        r="45" 
        fill="#10b981" 
        stroke="#059669" 
        strokeWidth="2"
      />
      
      {/* Pie Chart Segment */}
      <path 
        d="M 50 50 L 50 5 A 45 45 0 0 1 95 50 Z" 
        fill="#065f46" 
        opacity="0.8"
      />
      
      {/* Inner White Circle */}
      <circle 
        cx="50" 
        cy="50" 
        r="25" 
        fill="#ffffff" 
        opacity="0.95"
      />
      
      {/* Dollar Sign */}
      <g transform="translate(50,50)">
        {/* Vertical lines */}
        <line x1="0" y1="-15" x2="0" y2="-10" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
        <line x1="0" y1="10" x2="0" y2="15" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
        
        {/* S curve */}
        <path 
          d="M -8,-8 Q -8,-12 -4,-12 L 4,-12 Q 8,-12 8,-8 Q 8,-4 4,-4 L -4,-4 Q -8,-4 -8,0 Q -8,4 -4,4 L 4,4 Q 8,4 8,8 Q 8,12 4,12 L -4,12" 
          stroke="#10b981" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          fill="none"
        />
      </g>
    </svg>
  );
}