export default function Logo({ size = 32 }) {
  return (
    <div className="flex items-center space-x-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0A6836"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2a10 10 0 1 0 10 10H12V2z" fill="#0A6836" />
      </svg>
      <span className="text-green-700 font-bold text-xl">Expensia</span>
    </div>
  );
}
