import { useState, useCallback, useRef, useEffect } from "react";
import type { Status } from "../core/types";

export interface UseApiState<T> {
  data: T | null;
  status: Status;
  error: string | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export interface UseApiOptions<T> {
  immediate?: boolean;
  initialData?: T | null;
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
}

export function useApi<T, A extends unknown[] = []>(
  apiFn: (...args: A) => Promise<T>,
  options: UseApiOptions<T> = {}
) {
  const { immediate = false, initialData = null, onSuccess, onError } = options;

  const [state, setState] = useState<UseApiState<T>>({
    data: initialData,
    status: "idle",
    error: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  const mountedRef = useRef(true);
  const callCountRef = useRef(0);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const execute = useCallback(
    async (...args: A): Promise<T | null> => {
      const callId = ++callCountRef.current;

      setState({
        data: state.data,
        status: "loading",
        error: null,
        isLoading: true,
        isSuccess: false,
        isError: false,
      });

      try {
        const data = await apiFn(...args);

        // Only update if this is the latest call and component is mounted
        if (mountedRef.current && callId === callCountRef.current) {
          setState({
            data,
            status: "success",
            error: null,
            isLoading: false,
            isSuccess: true,
            isError: false,
          });
          onSuccess?.(data);
        }
        return data;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "An unknown error occurred";

        if (mountedRef.current && callId === callCountRef.current) {
          setState({
            data: null,
            status: "error",
            error: message,
            isLoading: false,
            isSuccess: false,
            isError: true,
          });
          onError?.(message);
        }
        return null;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [apiFn]
  );

  const reset = useCallback(() => {
    setState({
      data: initialData,
      status: "idle",
      error: null,
      isLoading: false,
      isSuccess: false,
      isError: false,
    });
  }, [initialData]);

  useEffect(() => {
    if (immediate) {
      execute(...([] as unknown as A));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate]);

  return { ...state, execute, reset };
}
