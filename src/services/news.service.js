import { request } from './httpClient.js';

const PATH = '/api/news';

/** Mapeia o DTO da API para o modelo usado na UI. Ajuste aqui se os nomes dos campos mudarem. */
const toNews = (n) => ({
  id: n.id,
  title: n.title ?? '',
  subtitle: n.subtitle ?? '',
  content: n.content ?? '',
  redirection: n.redirection ?? '',
  createdAt: n.created_at ?? n.createdAt ?? null,
});

const toPayload = (v) => ({
  title: v.title.trim(),
  subtitle: v.subtitle.trim(),
  content: v.content.trim(),
  redirection: v.redirection.trim(),
});

export const newsService = {
  async list({ page = 1, pageSize = 10 } = {}) {
    const data = await request(PATH, { params: { action: 'list', page, page_size: pageSize } });
    const rows = Array.isArray(data) ? data : data.items ?? data.content ?? data.data ?? data.news ?? [];
    const items = rows.map(toNews);
    const total = data.total ?? data.totalItems ?? data.total_items ?? data.totalElements ?? items.length;
    return { items, total };
  },

  async get(id) {
    return toNews(await request(PATH, { params: { action: 'get', id } }));
  },

  async create(values) {
    return request(PATH, { method: 'POST', params: { action: 'create' }, body: toPayload(values) });
  },

  async update(id, values) {
    return request(PATH, { method: 'PUT', params: { action: 'update', id }, body: toPayload(values) });
  },

  async remove(id) {
    return request(PATH, { method: 'DELETE', params: { action: 'delete', id } });
  },
};
