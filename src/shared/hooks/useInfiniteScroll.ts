/**
 * 무한 스크롤
 */

import { useRef, useCallback } from 'react';

interface IUseInfiniteScrollProps {
  isLoading: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

export const useInfiniteScroll = ({
  isLoading,
  hasNextPage,
  fetchNextPage,
}: IUseInfiniteScrollProps) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage, fetchNextPage]
  );

  return lastElementRef;
};
