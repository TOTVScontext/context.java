import { Edit, TrashCan, Launch } from '@carbon/icons-react';

const fmtDate = (v) => {
  const d = v ? new Date(v) : null;
  return d && !Number.isNaN(d.getTime()) ? d.toLocaleDateString('pt-BR') : '—';
};

function SkeletonRows({ rows, cols }) {
  return Array.from({ length: rows }, (_, i) => (
    <tr key={i}>
      {Array.from({ length: cols }, (_, j) => (
        <td key={j}><span className="skeleton" style={{ width: j === 1 ? '70%' : '40%' }} /></td>
      ))}
    </tr>
  ));
}

export default function NewsTable({ items, loading, onEdit, onDelete, emptyAction }) {
  const showDate = items.some((n) => n.createdAt);
  const cols = showDate ? 5 : 4;

  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th className="col-id">ID</th>
            <th>Notícia</th>
            <th>Link</th>
            {showDate && <th>Criada em</th>}
            <th className="col-actions">Ações</th>
          </tr>
        </thead>
        <tbody>
          {loading && items.length === 0 && <SkeletonRows rows={5} cols={cols} />}
          {items.map((n) => (
            <tr key={n.id}>
              <td className="col-id">{n.id}</td>
              <td>
                <div className="cell-title">{n.title}</div>
                {n.subtitle && <div className="cell-sub">{n.subtitle}</div>}
                <div className="cell-excerpt">{n.content}</div>
              </td>
              <td>
                {n.redirection ? (
                  <a className="link" href={n.redirection} target="_blank" rel="noreferrer">
                    Abrir <Launch size={14} />
                  </a>
                ) : '—'}
              </td>
              {showDate && <td>{fmtDate(n.createdAt)}</td>}
              <td className="col-actions">
                <button className="icon-btn" onClick={() => onEdit(n)} aria-label={`Editar ${n.title}`} title="Editar">
                  <Edit size={16} />
                </button>
                <button className="icon-btn icon-btn--danger" onClick={() => onDelete(n)} aria-label={`Excluir ${n.title}`} title="Excluir">
                  <TrashCan size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!loading && items.length === 0 && (
        <div className="empty">
          <p className="empty__title">Nenhuma notícia por aqui</p>
          <p>Adicione a primeira notícia ou ajuste o filtro.</p>
          {emptyAction}
        </div>
      )}
    </div>
  );
}
