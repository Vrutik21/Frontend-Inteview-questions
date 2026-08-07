/* eslint-disable react-hooks/refs */

import { useRef, type DependencyList, type EffectCallback } from "react";

export const useCustomEffect = (
  effect: EffectCallback,
  deps?: DependencyList,
): void | (() => void) => {
  const isFirstRender = useRef<boolean>(true);
  const prevDeps = useRef<DependencyList>([]);

  // First Render
  if (isFirstRender.current) {
    isFirstRender.current = false;
    const cleanup = effect();
    return () => {
      if (cleanup && typeof cleanup === "function") {
        cleanup();
      }
    };
  }

  // Deps changed or no deps array
  const depsChanged = deps
    ? JSON.stringify(deps) !== JSON.stringify(prevDeps.current)
    : true;

  if (depsChanged) {
    const cleanup = effect();
    if (cleanup && typeof cleanup === "function" && deps) {
      cleanup();
    }
  }

  //   Cleanup
  prevDeps.current = deps || [];
};
