import { useSyncExternalStore } from "react";

const noSubscribe = () => () => {};

export function useClientValue(getValue, serverValue, subscribe = noSubscribe) {
  return useSyncExternalStore(subscribe, getValue, () => serverValue);
}
