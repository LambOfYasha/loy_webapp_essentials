import { useState, useEffect, useRef, useCallback } from "react";

export type SocketStatus = "connecting" | "connected" | "disconnected" | "error";

export interface UseSocketOptions {
  url: string;
  protocols?: string | string[];
  autoConnect?: boolean;
  reconnect?: boolean;
  reconnectAttempts?: number;
  reconnectInterval?: number;
  onOpen?: (event: Event) => void;
  onClose?: (event: CloseEvent) => void;
  onError?: (event: Event) => void;
  onMessage?: (event: MessageEvent) => void;
}

export interface UseSocketReturn {
  status: SocketStatus;
  lastMessage: MessageEvent | null;
  sendMessage: (data: string | ArrayBuffer | Blob) => void;
  sendJson: (data: unknown) => void;
  connect: () => void;
  disconnect: (code?: number, reason?: string) => void;
}

export function useSocket(options: UseSocketOptions): UseSocketReturn {
  const {
    url,
    protocols,
    autoConnect = true,
    reconnect = true,
    reconnectAttempts = 5,
    reconnectInterval = 3000,
    onOpen,
    onClose,
    onError,
    onMessage,
  } = options;

  const [status, setStatus] = useState<SocketStatus>("disconnected");
  const [lastMessage, setLastMessage] = useState<MessageEvent | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectCountRef = useRef(0);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(true);

  const cleanup = useCallback(() => {
    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = null;
    }
  }, []);

  const connect = useCallback(() => {
    cleanup();

    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    try {
      setStatus("connecting");
      const ws = new WebSocket(url, protocols);

      ws.onopen = (event) => {
        if (!mountedRef.current) return;
        setStatus("connected");
        reconnectCountRef.current = 0;
        onOpen?.(event);
      };

      ws.onclose = (event) => {
        if (!mountedRef.current) return;
        setStatus("disconnected");
        onClose?.(event);

        if (
          reconnect &&
          reconnectCountRef.current < reconnectAttempts &&
          !event.wasClean
        ) {
          reconnectCountRef.current++;
          reconnectTimerRef.current = setTimeout(connect, reconnectInterval);
        }
      };

      ws.onerror = (event) => {
        if (!mountedRef.current) return;
        setStatus("error");
        onError?.(event);
      };

      ws.onmessage = (event) => {
        if (!mountedRef.current) return;
        setLastMessage(event);
        onMessage?.(event);
      };

      wsRef.current = ws;
    } catch {
      setStatus("error");
    }
  }, [url, protocols, reconnect, reconnectAttempts, reconnectInterval, onOpen, onClose, onError, onMessage, cleanup]);

  const disconnect = useCallback(
    (code?: number, reason?: string) => {
      cleanup();
      reconnectCountRef.current = reconnectAttempts; // prevent reconnect
      if (wsRef.current) {
        wsRef.current.close(code, reason);
        wsRef.current = null;
      }
    },
    [cleanup, reconnectAttempts]
  );

  const sendMessage = useCallback((data: string | ArrayBuffer | Blob) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(data);
    }
  }, []);

  const sendJson = useCallback(
    (data: unknown) => {
      sendMessage(JSON.stringify(data));
    },
    [sendMessage]
  );

  useEffect(() => {
    mountedRef.current = true;
    if (autoConnect) connect();

    return () => {
      mountedRef.current = false;
      cleanup();
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { status, lastMessage, sendMessage, sendJson, connect, disconnect };
}
