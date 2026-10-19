const BASE_URL = ('https://api-context-java.onrender.com').replace(/\/$/, '');

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/** Cliente HTTP único: monta a URL, serializa JSON e traduz erros da API ({ error }). */
export async function request(path, { method = 'GET', params = {}, body } = {}) {
  const url = `${BASE_URL}${path}?${new URLSearchParams(params)}`;

  let response;
  try {
    response = await fetch(url, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError('Não foi possível conectar à API. Verifique a conexão ou a configuração de CORS.', 0);
  }

  if (response.status === 204) return null;
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new ApiError(data?.error ?? `Erro ${response.status} ao chamar a API.`, response.status);
  return data;
}
