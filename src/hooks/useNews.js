import { useCallback, useEffect, useRef, useState } from 'react';
import { newsService } from '../services/news.service.js';

/** Estado da listagem + ações de CRUD. As ações lançam ApiError para a UI decidir o feedback. */
export function useNews(initialPageSize = 10) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSizeState] = useState(initialPageSize);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const lastRequest = useRef(0);

  const load = useCallback(async () => {
    const id = ++lastRequest.current;
    setLoading(true);
    setError(null);
    try {
      const result = await newsService.list({ page, pageSize });
      if (id !== lastRequest.current) return; // resposta antiga, descarta
      setItems(result.items);
      setTotal(result.total);
    } catch (e) {
      if (id === lastRequest.current) setError(e.message);
    } finally {
      if (id === lastRequest.current) setLoading(false);
    }
  }, [page, pageSize]);

  useEffect(() => { load(); }, [load]);

  const setPageSize = (size) => { setPageSizeState(size); setPage(1); };

  const create = async (values) => { await newsService.create(values); await load(); };
  const update = async (id, values) => { await newsService.update(id, values); await load(); };
  const remove = async (id) => {
    await newsService.remove(id);
    if (items.length === 1 && page > 1) setPage(page - 1); // última da página: volta uma
    else await load();
  };

  return { items, total, page, pageSize, loading, error, setPage, setPageSize, reload: load, create, update, remove };
}
