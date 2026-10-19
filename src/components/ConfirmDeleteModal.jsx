import { useState } from 'react';
import Modal from './Modal.jsx';

export default function ConfirmDeleteModal({ news, onConfirm, onClose }) {
  const [busy, setBusy] = useState(false);

  return (
    <Modal title="Excluir notícia" onClose={onClose}>
      <p className="confirm-text">
        Você vai excluir <strong>{news.title}</strong>. Essa ação não pode ser desfeita.
      </p>
      <div className="modal__actions">
        <button className="btn btn--ghost" onClick={onClose} disabled={busy}>Cancelar</button>
        <button className="btn btn--danger" disabled={busy} onClick={() => { setBusy(true); onConfirm(); }}>
          {busy ? 'Excluindo…' : 'Excluir notícia'}
        </button>
      </div>
    </Modal>
  );
}
