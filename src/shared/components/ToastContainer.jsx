import { useUI } from '../../store/UIContext.jsx';

export function ToastContainer() {
  const { toasts } = useUI();

  return (
    <div className="toast-zone" aria-live="polite">
      {toasts.map((toast) => (
        <div className={`toast ${toast.type}`} key={toast.id}>
          <p className="toast-title">{toast.title}</p>
          <p className="toast-message">{toast.message}</p>
        </div>
      ))}
    </div>
  );
}
