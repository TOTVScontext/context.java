import { Close, CheckmarkFilled, ErrorFilled } from '@carbon/icons-react';

export default function Notifications({ notices, onDismiss }) {
  return (
    <div className="toasts" role="status" aria-live="polite">
      {notices.map((n) => (
        <div key={n.id} className={`toast toast--${n.kind}`}>
          {n.kind === 'error' ? <ErrorFilled size={20} /> : <CheckmarkFilled size={20} />}
          <div className="toast__text">
            <strong>{n.title}</strong>
            {n.detail && <span>{n.detail}</span>}
          </div>
          <button className="icon-btn" onClick={() => onDismiss(n.id)} aria-label="Fechar notificação">
            <Close size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
