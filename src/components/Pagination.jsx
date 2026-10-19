import { ChevronLeft, ChevronRight } from '@carbon/icons-react';

const SIZES = [5, 10, 20, 50]; // a API aceita no máximo 50 por página

export default function Pagination({ page, pageSize, total, onPage, onPageSize }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div className="pagination">
      <label className="pagination__size">
        Itens por página
        <select value={pageSize} onChange={(e) => onPageSize(Number(e.target.value))}>
          {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </label>
      <span className="pagination__range">{from}–{to} de {total} notícias</span>
      <div className="pagination__nav">
        <span>Página {page} de {pages}</span>
        <button className="icon-btn" disabled={page <= 1} onClick={() => onPage(page - 1)} aria-label="Página anterior">
          <ChevronLeft size={20} />
        </button>
        <button className="icon-btn" disabled={page >= pages} onClick={() => onPage(page + 1)} aria-label="Próxima página">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
