export function Card({ children, compact = false, className = '', ...props }) {
  return <section className={`card ${compact ? 'compact' : ''} ${className}`} {...props}>{children}</section>;
}
