export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export function buildPaginationParams(
  page: number = 1,
  limit: number = 20
): PaginationParams {
  return {
    page: Math.max(1, Math.floor(page)),
    limit: Math.min(100, Math.max(1, Math.floor(limit))),
  };
}

export function buildPaginatedResponse<T>(
  data: T[],
  total: number,
  page: number,
  limit: number
): PaginatedResponse<T> {
  const totalPages = Math.ceil(total / limit);
  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
}

export function getOffset(page: number, limit: number): number {
  return (Math.max(1, page) - 1) * limit;
}
