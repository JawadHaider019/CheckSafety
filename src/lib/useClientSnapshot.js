import { useSyncExternalStore } from "react";

const noSubscribe = () => () => {};

export function useSearchString() {
  return useSyncExternalStore(noSubscribe, () => window.location.search, () => "");
}

export function useClientValue(getValue, serverValue, subscribe = noSubscribe) {
  return useSyncExternalStore(subscribe, getValue, () => serverValue);
}
