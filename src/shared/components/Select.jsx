export function Select({ label, error, options = [], className = '', ...props }) {
  return (
    <div className={`field ${className}`}>
      {label ? <label htmlFor={props.id || props.name}>{label}</label> : null}
      <select className={`select ${error ? 'input-error' : ''}`} id={props.id || props.name} {...props}>
        <option value="">Seleccionar...</option>
        {options.map((option) => (
          <option key={option.value || option} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
      {error ? <p className="error-text">{error}</p> : null}
    </div>
  );
}
