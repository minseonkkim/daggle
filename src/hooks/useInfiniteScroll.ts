import { useRef, useCallback } from "react";

export default function useInfiniteScroll(
  callback: () => void,
  hasMore: boolean
) {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (!hasMore || !node) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) callback();
      });

      observer.current.observe(node);
    },
    [callback, hasMore]
  );

  return lastElementRef;
}
