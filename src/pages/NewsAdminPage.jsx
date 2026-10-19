import { useMemo, useState } from 'react';
import { Add, Renew, Search } from '@carbon/icons-react';
import { useNews } from '../hooks/useNews.js';
import { useNotifications } from '../hooks/useNotifications.js';
import NewsTable from '../components/NewsTable.jsx';
import Pagination from '../components/Pagination.jsx';
import NewsFormModal from '../components/NewsFormModal.jsx';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal.jsx';
import Notifications from '../components/Notifications.jsx';

export default function NewsAdminPage() {
  const news = useNews(10);
  const { notices, notify, dismiss } = useNotifications();
  const [editor, setEditor] = useState(null); // { news: item | null }
  const [toDelete, setToDelete] = useState(null);
  const [query, setQuery] = useState('');

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return news.items;
    return news.items.filter((n) => [n.title, n.subtitle, n.content].some((t) => t.toLowerCase().includes(q)));
  }, [news.items, query]);

  const handleSave = async (values) => {
    const editing = editor.news;
    if (editing) await news.update(editing.id, values);
    else await news.create(values);
    notify('success', editing ? 'Notícia atualizada' : 'Notícia adicionada', values.title);
    setEditor(null);
  };

  const handleDelete = async () => {
    try {
      await news.remove(toDelete.id);
      notify('success', 'Notícia excluída', toDelete.title);
    } catch (e) {
      notify('error', 'Não foi possível excluir', e.message);
    } finally {
      setToDelete(null);
    }
  };

  const addButton = (
    <button className="btn btn--primary" onClick={() => setEditor({ news: null })}>
      Adicionar notícia <Add size={20} />
    </button>
  );

  return (
    <main className="page">
      <div className="page__head">
        <h1>Notícias</h1>
        <p>Gerencie as notícias publicadas no TOTVS Context.</p>
      </div>

      <section className="panel">
        <div className="toolbar">
          <div className="search">
            <Search size={16} />
            <input
              type="search"
              placeholder="Filtrar nesta página"
              aria-label="Filtrar notícias desta página"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button className="icon-btn" onClick={news.reload} aria-label="Atualizar lista" title="Atualizar">
            <Renew size={20} />
          </button>
          {addButton}
        </div>

        {news.error && (
          <div className="banner banner--error" role="alert">
            <span>{news.error}</span>
            <button className="btn btn--ghost btn--sm" onClick={news.reload}>Tentar novamente</button>
          </div>
        )}

        <NewsTable
          items={visible}
          loading={news.loading}
          onEdit={(n) => setEditor({ news: n })}
          onDelete={setToDelete}
          emptyAction={!news.error && !query ? addButton : null}
        />

        <Pagination
          page={news.page}
          pageSize={news.pageSize}
          total={news.total}
          onPage={news.setPage}
          onPageSize={news.setPageSize}
        />
      </section>

      {editor && (
        <NewsFormModal key={editor.news?.id ?? 'new'} news={editor.news} onSave={handleSave} onClose={() => setEditor(null)} />
      )}
      {toDelete && <ConfirmDeleteModal news={toDelete} onConfirm={handleDelete} onClose={() => setToDelete(null)} />}
      <Notifications notices={notices} onDismiss={dismiss} />
    </main>
  );
}
