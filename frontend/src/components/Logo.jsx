// Logotipo propio: una ficha/dado con los puntos del número 5
function Logo({ className = "size-10" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect x="4" y="4" width="40" height="40" rx="11" fill="#D64531" />
      <rect x="4" y="4" width="40" height="40" rx="11" fill="none" stroke="#1C1A17" strokeWidth="2.5" />
      <g fill="#FBF5E9">
        <circle cx="15" cy="15" r="4" />
        <circle cx="33" cy="15" r="4" />
        <circle cx="24" cy="24" r="4" />
        <circle cx="15" cy="33" r="4" />
        <circle cx="33" cy="33" r="4" />
      </g>
    </svg>
  )
}

export default Logo