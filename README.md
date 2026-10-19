# TOTVS Context · Admin de Notícias

Página única de administração (CRUD) das notícias, em Vite + React + JavaScript.

```bash
npm install
npm run dev      # http://localhost:5173 (a rota /api é encaminhada para a API via proxy)
npm run build
```

## Arquitetura
```
src/
├── services/    httpClient.js (fetch + erros)  ·  news.service.js (list/get/create/update/remove + mapeamento do DTO)
├── hooks/       useNews.js (estado, paginação, CRUD)  ·  useNotifications.js
├── components/  Header, NewsTable, Pagination, Modal, NewsFormModal, ConfirmDeleteModal, Notifications
├── pages/       NewsAdminPage.jsx (composição)
└── styles/      index.css (tokens + componentes)
```
