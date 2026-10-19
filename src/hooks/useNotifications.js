import { useCallback, useState } from 'react';

export function useNotifications(timeout = 5000) {
  const [notices, setNotices] = useState([]);

  const dismiss = useCallback((id) => setNotices((list) => list.filter((n) => n.id !== id)), []);

  const notify = useCallback((kind, title, detail = '') => {
    const id = crypto.randomUUID();
    setNotices((list) => [...list, { id, kind, title, detail }]);
    setTimeout(() => dismiss(id), timeout);
  }, [dismiss, timeout]);

  return { notices, notify, dismiss };
}
