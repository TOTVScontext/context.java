import { useState } from 'react';
import Modal from './Modal.jsx';

const EMPTY = { title: '', subtitle: '', content: '', redirection: '' };

function validate(v) {
  const errors = {};
  if (!v.title.trim()) errors.title = 'Informe o título.';
  if (!v.content.trim()) errors.content = 'Informe o conteúdo.';
  if (v.redirection.trim()) {
    try { new URL(v.redirection.trim()); } catch { errors.redirection = 'Use uma URL completa, como https://totvs.com/noticia.'; }
  }
  return errors;
}

export default function NewsFormModal({ news, onSave, onClose }) {
  const [values, setValues] = useState(news ? { ...EMPTY, ...news } : EMPTY);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [saving, setSaving] = useState(false);

  const bind = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: (e) => setValues((v) => ({ ...v, [name]: e.target.value })),
    'aria-invalid': Boolean(errors[name]),
  });

  const submit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;
    setSaving(true);
    setApiError('');
    try {
      await onSave(values);
    } catch (err) {
      setApiError(err.message);
      setSaving(false);
    }
  };

  return (
    <Modal title={news ? 'Editar notícia' : 'Adicionar notícia'} onClose={onClose}>
      <form onSubmit={submit} noValidate>
        {apiError && <div className="banner banner--error" role="alert">{apiError}</div>}

        <div className="field">
          <label htmlFor="title">Título *</label>
          <input {...bind('title')} autoFocus />
          {errors.title && <span className="field__error">{errors.title}</span>}
        </div>
        <div className="field">
          <label htmlFor="subtitle">Subtítulo</label>
          <input {...bind('subtitle')} />
        </div>
        <div className="field">
          <label htmlFor="content">Conteúdo *</label>
          <textarea {...bind('content')} rows={6} />
          {errors.content && <span className="field__error">{errors.content}</span>}
        </div>
        <div className="field">
          <label htmlFor="redirection">Link de redirecionamento</label>
          <input {...bind('redirection')} type="url" placeholder="https://" />
          {errors.redirection && <span className="field__error">{errors.redirection}</span>}
        </div>

        <div className="modal__actions">
          <button type="button" className="btn btn--ghost" onClick={onClose} disabled={saving}>Cancelar</button>
          <button type="submit" className="btn btn--primary" disabled={saving}>
            {saving ? 'Salvando…' : news ? 'Salvar alterações' : 'Adicionar notícia'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
