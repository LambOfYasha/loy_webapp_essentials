import { useState, useCallback, useMemo } from "react";

export interface UsePaginationOptions {
  initialPage?: number;
  initialLimit?: number;
  total?: number;
}

export interface UsePaginationReturn {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  offset: number;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setTotal: (total: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  firstPage: () => void;
  lastPage: () => void;
  params: { page: number; limit: number };
}

export function usePagination(
  options: UsePaginationOptions = {}
): UsePaginationReturn {
  const { initialPage = 1, initialLimit = 20, total: initialTotal = 0 } = options;

  const [page, setPageState] = useState(initialPage);
  const [limit, setLimitState] = useState(initialLimit);
  const [total, setTotal] = useState(initialTotal);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(total / limit)),
    [total, limit]
  );

  const hasNext = page < totalPages;
  const hasPrev = page > 1;
  const offset = (page - 1) * limit;

  const setPage = useCallback(
    (newPage: number) => {
      setPageState(Math.max(1, Math.min(newPage, totalPages)));
    },
    [totalPages]
  );

  const setLimit = useCallback((newLimit: number) => {
    setLimitState(Math.max(1, Math.min(100, newLimit)));
    setPageState(1);
  }, []);

  const nextPage = useCallback(() => {
    if (hasNext) setPageState((p) => p + 1);
  }, [hasNext]);

  const prevPage = useCallback(() => {
    if (hasPrev) setPageState((p) => p - 1);
  }, [hasPrev]);

  const firstPage = useCallback(() => setPageState(1), []);
  const lastPage = useCallback(() => setPageState(totalPages), [totalPages]);

  return {
    page,
    limit,
    total,
    totalPages,
    hasNext,
    hasPrev,
    offset,
    setPage,
    setLimit,
    setTotal,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    params: { page, limit },
  };
}
