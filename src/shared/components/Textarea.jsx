export function Textarea({ label, error, className = '', ...props }) {
  return (
    <div className={`field ${className}`}>
      {label ? <label htmlFor={props.id || props.name}>{label}</label> : null}
      <textarea className={`textarea ${error ? 'input-error' : ''}`} id={props.id || props.name} {...props} />
      {error ? <p className="error-text">{error}</p> : null}
    </div>
  );
}
