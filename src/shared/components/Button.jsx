export function Button({ children, variant = 'primary', full = false, className = '', ...props }) {
  return (
    <button className={`btn btn-${variant} ${full ? 'btn-full' : ''} ${className}`} {...props}>
      {children}
    </button>
  );
}
